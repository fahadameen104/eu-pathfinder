import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
const source = await readFile(new URL("../public/advertising.js", import.meta.url), "utf8");
function setup(saved, hostname = "eupathfinder.agency", hasSlot = true) {
  const buttons = new Map(), frames = [], status = {}, settings = { focus() {} };
  let reloads = 0, stored = saved, observer;
  const button = key => {
    if (!buttons.has(key)) buttons.set(key, { focus() {}, addEventListener(_type, fn) { this.click = fn; } });
    return buttons.get(key);
  };
  const panel = { hidden:true, setAttribute() {}, addEventListener() {}, querySelector:button };
  const slot = { querySelector() { return status; }, append(frame) { frames.push(frame); } };
  const document = {
    querySelector() { return hasSlot ? slot : null; },
    querySelectorAll() { settings.addEventListener = (_type, fn) => settings.click = fn; return [settings]; },
    body: { append() {} },
    createElement(type) { return type === "section" ? panel : { attributes:{}, setAttribute(k,v) { this.attributes[k]=v; } }; }
  };
  class Observer { constructor(fn) { this.fn=fn; observer=this; } observe() {} disconnect() {} }
  runInNewContext(source, { document, window:{IntersectionObserver:Observer}, IntersectionObserver:Observer,
    location:{hostname,reload(){reloads++;}}, localStorage:{getItem(){return stored;},setItem(_k,v){stored=v;}}, Date });
  return { frames,panel,status,settings,buttons,reloads:()=>reloads,
    visible(){observer?.fn([{isIntersecting:true}]);}, click(key){button(key).click();} };
}
const fresh = setup();
fresh.visible(); assert.equal(fresh.frames.length,0);
fresh.settings.click(); assert.equal(fresh.panel.hidden,false);
fresh.click("[data-ad-reject]"); fresh.visible(); assert.equal(fresh.frames.length,0);
fresh.click("[data-ad-accept]"); assert.equal(fresh.frames.length,0);
fresh.visible(); assert.equal(fresh.frames.length,1);
assert.match(fresh.frames[0].srcdoc,/68ae835ab078cbe5e6ff5fc70ed08248/);
assert.equal(fresh.frames[0].attributes.sandbox,"allow-scripts allow-popups allow-popups-to-escape-sandbox");
assert.equal(fresh.frames[0].width,"300");
fresh.visible(); assert.equal(fresh.frames.length,1);
fresh.click("[data-ad-reject]"); assert.equal(fresh.reloads(),1);
const accepted = JSON.stringify({choice:"accepted",time:Date.now()});
for (const app of [setup(accepted,"localhost"),setup(accepted,"eupathfinder.agency",false),setup("bad"),setup(JSON.stringify({choice:"accepted",time:1})),setup(JSON.stringify({choice:"accepted",time:Date.now()+86400000}))]) {
  app.visible(); assert.equal(app.frames.length,0);
}
const saved = setup(accepted); saved.visible(); assert.equal(saved.frames.length,1);
console.log("Advertising checks passed: separate explicit consent, lazy loading, single banner, sandbox, withdrawal, expiry and preview/privacy exclusion.");

