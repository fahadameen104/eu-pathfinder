import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
const source=await readFile(new URL("../public/globe.js",import.meta.url),"utf8");
async function setup({gpu=true,reducedMotion=false,mapOk=true}={}) {
  const events={},canvasEvents={},docEvents={},classes=new Set(),jobs=new Map(),calls=[];
  let id=0,stored,initialization;
  const gl=new Proxy({}, {get(_target,name){
    if(name==="getShaderParameter"||name==="getProgramParameter")return()=>true;
    if(name==="getUniformLocation"||name==="getAttribLocation")return(_p,key)=>key;
    if(String(name).startsWith("create"))return()=>({});
    if(name==="drawElements")return(...args)=>calls.push(args);
    if(name==="bufferData")return(_kind,data)=>{assert.ok(data.length>0);};
    return /^[A-Z_]+$/.test(name)?1:()=>{};
  }});
  const canvas={className:"",dataset:{},setAttribute(){},getContext(){return gpu?gl:null;},addEventListener(k,fn){canvasEvents[k]=fn;},remove(){}};
  const ctx=new Proxy({}, {get(){return()=>{};},set(){return true;}});
  const host={classList:{add(k){classes.add(k);},remove(k){classes.delete(k);}},append(){},getBoundingClientRect(){return{width:600,height:800};}};
  const toggle={hidden:true,setAttribute(k,v){this[k]=v;},addEventListener(_k,fn){this.click=fn;}};
  const media={matches:reducedMotion,addEventListener(_k,fn){this.change=fn;}};
  const document={hidden:false,querySelector(k){return k==="[data-globe-host]"?host:toggle;},addEventListener(k,fn){docEvents[k]=fn;},createElement(){return canvas.className?{getContext(){return ctx;}}:canvas;}};
  const window={addEventListener(k,fn){events[k]=fn;}};
  class Observer {observe(){}disconnect(){}}
  runInNewContext(source,{document,window,matchMedia:()=>media,localStorage:{getItem(){return stored;},setItem(_k,v){stored=v;}},
    requestAnimationFrame(fn){jobs.set(++id,fn);return id;},cancelAnimationFrame(k){jobs.delete(k);},setTimeout(fn){initialization=fn();return 1;},
    fetch:async()=>({ok:mapOk,json:async()=>[[[[0,0],[1,1],[2,0]]]]}),ResizeObserver:Observer,AbortController,devicePixelRatio:3,Float32Array,Uint16Array});
  events.load(); await initialization;
  return{canvas,classes,toggle,media,document,events,docEvents,canvasEvents,jobs,calls,step(time){const pending=[...jobs.values()];jobs.clear();pending.forEach(fn=>fn(time));}};
}
const app=await setup();
assert.ok(app.classes.has("globe-ready"));assert.equal(app.toggle.hidden,false);
assert.ok(app.canvas.width<=900&&app.canvas.height<=900);
app.step(40);app.step(80);const rotating=app.canvas.dataset.rotation;
app.step(120);assert.notEqual(app.canvas.dataset.rotation,rotating);
app.toggle.click();const paused=app.canvas.dataset.rotation;assert.equal(app.jobs.size,0);
app.step(160);assert.equal(app.canvas.dataset.rotation,paused);assert.equal(app.toggle['aria-pressed'],'true');
app.toggle.click();assert.equal(app.jobs.size,1);
app.document.hidden=true;app.docEvents.visibilitychange();assert.equal(app.jobs.size,0);
app.document.hidden=false;app.docEvents.visibilitychange();assert.equal(app.jobs.size,1);
app.media.matches=true;app.media.change();assert.equal(app.jobs.size,0);assert.equal(app.toggle.disabled,true);
app.canvasEvents.webglcontextlost({preventDefault(){}});assert.ok(!app.classes.has("globe-ready"));assert.equal(app.toggle.hidden,true);
for(const options of [{gpu:false},{mapOk:false}]){const failed=await setup(options);assert.ok(!failed.classes.has("globe-ready"));assert.equal(failed.jobs.size,0);}
const still=await setup({reducedMotion:true});assert.ok(still.classes.has("globe-ready"));assert.equal(still.jobs.size,0);
const leave=await setup();leave.events.pagehide({persisted:false});assert.equal(leave.jobs.size,0);assert.ok(!leave.classes.has("globe-ready"));
console.log("Globe checks passed: mesh render, bounded resolution, rotation, pause/resume, visibility, reduced motion, map/GPU failure, context loss and cleanup.");
