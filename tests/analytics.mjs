import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
const source = await readFile(new URL("../public/analytics.js", import.meta.url), "utf8");
function setup(saved, hostname = "eupathfinder.agency") {
  const scripts = [], buttons = new Map(), cookies = [], settings = { focus() {} };
  let reloads = 0, stored = saved;
  function button(key) {
    if (!buttons.has(key)) buttons.set(key, { addEventListener(_type, handler) { this.click = handler; }, focus() {}, hidden: true });
    return buttons.get(key);
  }
  const panel = { setAttribute() {}, querySelector: button, hidden: false };
  const document = {
    referrer: "https://www.google.com/search?q=private-query",
    createElement(type) { return type === "section" ? panel : {}; },
    head: { append(tag) { scripts.push(tag); } }, body: { append() {} },
    querySelectorAll() { settings.addEventListener = (_type, handler) => settings.click = handler; settings.setAttribute = () => {}; return [settings]; },
    get cookie() { return "_ga=sample; _ga_672X9VRT2X=sample; unrelated=keep"; },
    set cookie(value) { cookies.push(value); }
  };
  const window = {};
  runInNewContext(source, {
    window, document,
    location: { hostname, href: `https://${hostname}/poland/?email=private@example.test`, search: "?email=private@example.test", reload() { reloads++; } },
    localStorage: { getItem() { return stored; }, setItem(_key, value) { stored = value; } },
    URL, URLSearchParams, Date
  });
  return { window, panel, scripts, cookies, settings, buttons, reloads: () => reloads, stored: () => JSON.parse(stored), click: key => button(key).click() };
}
const fresh = setup();
assert.equal(fresh.scripts.length, 0);
assert.equal(fresh.panel.hidden, false);
fresh.window.euAnalytics.recordEnquirySuccess();
assert.equal(fresh.window.dataLayer.filter(e => e[0] === "event").length, 0);
fresh.click("[data-analytics-reject]");
assert.equal(fresh.scripts.length, 0);
assert.equal(fresh.stored().choice, "rejected");
assert.ok(fresh.cookies.every(c => !c.startsWith("unrelated=")));
fresh.settings.click();
assert.equal(fresh.panel.hidden, false);
fresh.click("[data-analytics-accept]");
assert.equal(fresh.scripts.length, 1);
assert.match(fresh.scripts[0].src, /id=G-672X9VRT2X$/);
const config = fresh.window.dataLayer.find(e => e[0] === "config")[2];
assert.equal(config.page_location, "https://eupathfinder.agency/poland/");
assert.equal(config.page_referrer, "https://www.google.com/search");
assert.equal(config.allow_google_signals, false);
fresh.window.euAnalytics.recordEnquirySuccess();
const event = fresh.window.dataLayer.find(e => e[0] === "event");
assert.equal(event[1], "generate_lead");
assert.equal(JSON.stringify(event[2]), '{"method":"enquiry_form"}');
fresh.click("[data-analytics-accept]");
assert.equal(fresh.scripts.length, 1);
fresh.click("[data-analytics-reject]");
assert.equal(fresh.window["ga-disable-G-672X9VRT2X"], true);
assert.equal(fresh.reloads(), 1);
assert.equal(setup(JSON.stringify({ choice: "accepted", time: Date.now() })).scripts.length, 1);
assert.equal(setup(JSON.stringify({ choice: "rejected", time: Date.now() })).scripts.length, 0);
assert.equal(setup(JSON.stringify({ choice: "accepted", time: 1 })).scripts.length, 0);
assert.equal(setup("not-json").scripts.length, 0);
assert.equal(setup(JSON.stringify({ choice: "accepted", time: Date.now() }), "localhost").scripts.length, 0);
console.log("Analytics checks passed: consent gating, reject/withdrawal, single initialization, sanitized URLs, expiry, production host and field-free lead event.");
