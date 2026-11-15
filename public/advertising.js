/* Advertising consent is independent of optional analytics consent. */
(() => {
  "use strict";
  // Delivery paused after the live browser failed during banner verification.
  const servingEnabled = false;
  const preferenceKey = "eu-pathfinder-advertising-v1";
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const production = /^(www\.)?eupathfinder\.agency$/.test(location.hostname);
  const slot = document.querySelector("#adsterra-slot");
  let choice, loaded = false, returnFocus;
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey));
    if (["accepted", "rejected"].includes(saved?.choice) && Number.isFinite(saved.time) &&
        saved.time <= Date.now() && Date.now() - saved.time < lifetime) choice = saved.choice;
  } catch { /* Advertising remains off without a valid choice. */ }

  function loadBanner() {
    if (!servingEnabled || !production || choice !== "accepted" || !slot || loaded) return;
    loaded = true;
    slot.querySelector("[data-ad-status]").textContent = "Advertisement provided by Adsterra.";
    const frame = document.createElement("iframe");
    frame.title = "Adsterra advertisement";
    frame.width = "300";
    frame.height = "250";
    frame.setAttribute("sandbox", "allow-scripts allow-popups allow-popups-to-escape-sandbox");
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    // The exact approved 300x250 publisher code runs in its own frame.
    frame.srcdoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width"><style>body{margin:0}</style></head><body><script>atOptions = {'key':'68ae835ab078cbe5e6ff5fc70ed08248','format':'iframe','height':250,'width':300,'params':{}};<\/script><script src="https://bauval.org/22/68ae835ab078cbe5e6ff5fc70ed08248"><\/script></body></html>`;
    slot.append(frame);
  }
  function scheduleBanner() {
    if (!slot || choice !== "accepted") return;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          loadBanner();
        }
      }, { rootMargin: "200px" });
      observer.observe(slot);
    } else loadBanner();
  }
  const panel = document.createElement("section");
  panel.className = "advertising-choice analytics-choice";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "advertising-choice-title");
  panel.innerHTML = `<h2 id="advertising-choice-title">Optional advertising</h2><p>May Adsterra and its advertising partners use cookies or similar identifiers and receive your IP address and device information to deliver and measure ads? This choice is separate from analytics and does not affect enquiries.</p><p><a href="/privacy/">Privacy information</a></p><div class="analytics-choice-actions"><button type="button" data-ad-accept>Accept advertising</button><button type="button" data-ad-reject>Reject advertising</button></div><button type="button" data-ad-close>Close settings</button>`;
  document.body.append(panel);
  function save(value) {
    choice = value;
    try { localStorage.setItem(preferenceKey, JSON.stringify({ choice, time: Date.now() })); } catch { /* Page-only choice. */ }
    panel.hidden = true;
    if (value === "accepted") scheduleBanner();
    else if (loaded) { location.reload(); return; }
    if (slot && value === "rejected") slot.querySelector("[data-ad-status]").textContent = "Advertising is off.";
    returnFocus?.focus();
  }
  panel.querySelector("[data-ad-accept]").addEventListener("click", () => save("accepted"));
  panel.querySelector("[data-ad-reject]").addEventListener("click", () => save("rejected"));
  panel.querySelector("[data-ad-close]").addEventListener("click", () => { panel.hidden = true; returnFocus?.focus(); });
  panel.addEventListener("keydown", event => {
    if (event.key === "Escape") { panel.hidden = true; returnFocus?.focus(); }
  });
  document.querySelectorAll("[data-ad-settings]").forEach(button => button.addEventListener("click", () => {
    returnFocus = button;
    panel.hidden = false;
    panel.querySelector("[data-ad-accept]").focus();
  }));
  if (slot && choice === "rejected") slot.querySelector("[data-ad-status]").textContent = "Advertising is off.";
  if (slot && !servingEnabled) slot.querySelector("[data-ad-status]").textContent = "Advertising is currently unavailable.";
  scheduleBanner();
})();
