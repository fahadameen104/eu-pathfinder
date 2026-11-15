/* Optional GA4 measurement. No Google tag is loaded before analytics consent. */
(() => {
  "use strict";
  const measurementId = "G-672X9VRT2X";
  const preferenceKey = "eu-pathfinder-analytics-v1";
  const maxAge = 180 * 24 * 60 * 60 * 1000;
  const production = /^(www\.)?eupathfinder\.agency$/.test(location.hostname);
  let accepted = false;
  let started = false;
  let returnFocus;
  let stored;
  try { stored = JSON.parse(localStorage.getItem(preferenceKey)); } catch { /* No saved choice. */ }
  if (!stored || !["accepted", "rejected"].includes(stored.choice) ||
      !Number.isFinite(stored.time) || Date.now() - stored.time > maxAge) stored = null;

  window.dataLayer = window.dataLayer || [];
  const gtag = function () { window.dataLayer.push(arguments); };
  window.gtag = gtag;
  gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied"
  });

  function cleanUrl(value) {
    try { const url = new URL(value); return url.origin + url.pathname; } catch { return ""; }
  }

  function start() {
    accepted = true;
    window[`ga-disable-${measurementId}`] = false;
    if (!production || started) return;
    started = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: cleanUrl(location.href),
      page_referrer: cleanUrl(document.referrer),
      cookie_expires: 180 * 24 * 60 * 60,
      debug_mode: new URLSearchParams(location.search).get("ga_debug") === "1"
    });
    const tag = document.createElement("script");
    tag.async = true;
    tag.id = "eu-google-analytics";
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(tag);
  }

  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) continue;
      for (const domain of ["", location.hostname, ".eupathfinder.agency"]) {
        document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax; Secure`;
      }
    }
  }

  const panel = document.createElement("section");
  panel.className = "analytics-choice";
  panel.id = "analytics-choice";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "analytics-choice-title");
  panel.setAttribute("aria-describedby", "analytics-choice-description");
  panel.innerHTML = `<h2 id="analytics-choice-title">Optional website analytics</h2>
    <p id="analytics-choice-description">May we use Google Analytics cookies to understand visits and improve this website? Your choice does not affect enquiries. Advertising stays off.</p>
    <div class="analytics-choice-actions"><button type="button" data-analytics-accept>Accept analytics</button><button type="button" data-analytics-reject>Reject analytics</button></div>
    <p><a href="/privacy/">Privacy information</a> · <button type="button" data-analytics-close hidden>Close settings</button></p>`;
  document.body.append(panel);

  function save(choice) {
    try { localStorage.setItem(preferenceKey, JSON.stringify({ choice, time: Date.now() })); } catch { /* Choice remains effective for this page. */ }
    stored = { choice, time: Date.now() };
    panel.hidden = true;
    if (choice === "accepted") {
      start();
    } else {
      accepted = false;
      window[`ga-disable-${measurementId}`] = true;
      clearAnalyticsCookies();
      if (started) {
        // A reload removes the already-loaded Google library and stops further collection.
        location.reload();
        return;
      }
    }
    returnFocus?.focus();
  }

  panel.querySelector("[data-analytics-accept]").addEventListener("click", () => save("accepted"));
  panel.querySelector("[data-analytics-reject]").addEventListener("click", () => save("rejected"));
  panel.querySelector("[data-analytics-close]").addEventListener("click", () => {
    panel.hidden = true;
    returnFocus?.focus();
  });
  document.querySelectorAll("[data-analytics-settings]").forEach(button => {
    button.setAttribute("aria-controls", panel.id);
    button.addEventListener("click", () => {
      returnFocus = button;
      panel.hidden = false;
      panel.querySelector("[data-analytics-close]").hidden = !stored;
      panel.querySelector("[data-analytics-accept]").focus();
    });
  });
  panel.hidden = Boolean(stored);
  if (stored?.choice === "accepted") start();
  else window[`ga-disable-${measurementId}`] = true;

  // Measure contact intent without transmitting numbers, link text or WhatsApp messages.
  document.addEventListener("click", (event) => {
    if (!accepted || !production) return;
    const link = event.target?.closest?.("a[href]");
    if (!link) return;
    let url;
    try { url = new URL(link.href); } catch { return; }
    const method = url.protocol === "tel:" ? "call" :
      url.protocol === "https:" && url.hostname === "wa.me" ? "whatsapp" : null;
    if (method) gtag("event", `${method}_click`, { contact_method: method, transport_type: "beacon" });
  });
  // Only a successful server response triggers generate_lead. No field values are used.
  window.euAnalytics = {
    recordEnquirySuccess() {
      if (accepted && production) gtag("event", "generate_lead", { method: "enquiry_form" });
    }
  };
})();
