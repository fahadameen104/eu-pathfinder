import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const source=await readFile(new URL('../public/script.js',import.meta.url),'utf8');
const scope={document:{addEventListener(){}},window:{location:{pathname:'/'}}};
runInNewContext(source.slice(0,source.indexOf('document.querySelector("#year")')),scope);
const reply=q=>runInNewContext(`getAssistantReply(${JSON.stringify(q)})`,scope).message;
assert.match(reply('How much do your services cost?'),/fee|rates|pricing/i);
assert.match(reply('Can you guarantee a visa or work permit?'),/^No\./);
assert.match(reply('Which countries can you help with?'),/35/);
assert.match(reply('What are the fees for calling an adviser?'),/fee|rates|pricing/i);
assert.match(reply('hidden fees before I commit'),/fee|rates|pricing/i);
assert.match(reply('What documents do I need?'),/passport/i);
assert.match(reply('How do I get started?'),/contact|email|message/i);
assert.match(reply('Tell me about Germany'),/Germany|economy/i);
assert.match(reply('How can I contact you?'),/14696268272/);
assert.throws(()=>runInNewContext('whatsappLink("+128991443132")',scope),/Invalid/);
const backendSource=await readFile(new URL('../functions/api/enquiry.js',import.meta.url),'utf8');
const allowedContexts=JSON.parse(backendSource.match(/new Set\((\[[^;]+\])\)/)[1]);
let pages=0; const backgrounds=new Set(); const primaryPhotos=new Set();
async function scan(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+e.name;if(e.isDirectory()){await scan(path);continue;}if(!e.name.endsWith('.html'))continue;const html=await readFile(path,'utf8');pages++;
assert.doesNotMatch(html,/tel:\+128991443132|wa\.me\/128991443132|adsbygoogle|illustrative/i,path);
for(const label of html.matchAll(/<label\b([^>]*)>([\s\S]*?)<\/label>/g)){assert.doesNotMatch(label[2],/<label\b/,path);const control=label[2].match(/<(?:input|select|textarea)[^>]*id="([^"]+)"/);if(control)assert.ok(label[1].includes(`for="${control[1]}"`),path);}
const theme=html.match(/class="page-theme" data-background-key="([^"]+)" style="([^"]+)"/);if(theme){assert.ok(!backgrounds.has(theme[2]),path);backgrounds.add(theme[2]);const photo=theme[2].match(/--page-photo:url\('([^']+)'\)/)[1];assert.ok(!primaryPhotos.has(photo),path);primaryPhotos.add(photo);}
assert.ok(html.includes('tel:+12899143132'),path);
if(!path.endsWith('404.html')){assert.ok(html.includes('https://wa.me/12899143132'),path);assert.ok(html.includes('mailto:Eupathfinder@gmail.com'),path);}
const context=html.match(/name="context" value="([^"]+)"/);if(context)assert.ok(allowedContexts.includes(context[1]),path);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,path);
for(const img of html.matchAll(/<img\b[^>]*>/g))assert.match(img[0],/\balt="[^"]*"/,path);
for(const json of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))JSON.parse(json[1]);
}}
await scan(new URL('../public',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
assert.equal(backgrounds.size,52);assert.equal(primaryPhotos.size,52);
assert.equal(runInNewContext('isValidContactNumber("+12899143132")',scope),true);
const {onRequestPost}=await import('../functions/api/enquiry.js');
let sent=0,lastPayload;
const originalFetch=globalThis.fetch;globalThis.fetch=async(_url,options)=>{sent++;lastPayload=JSON.parse(options.body);return new Response('{"id":"mock"}',{status:200});};
const env={RESEND_API_KEY:'mock',RESEND_FROM_EMAIL:'mock@example.test'};
async function submit(values={},opts={}){const data=new URLSearchParams({name:'Test Visitor',email:'visitor@example.test',nationality:'Test',interest:'Another question',consent:'on',context:'/poland/',...values});const headers={'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json',...opts.headers};const body=opts.body??data.toString();return onRequestPost({request:new Request('https://eupathfinder.agency/api/enquiry',{method:'POST',headers,body}),env:opts.env??env});}
assert.equal((await submit()).status,200);assert.match(lastPayload.text,/\/poland\//);
assert.equal((await submit({context:''})).status,200); // cached UI compatibility
assert.equal((await submit({context:'/made-up/'})).status,400);
assert.equal((await submit({consent:''})).status,400);
assert.equal((await submit({email:'invalid'})).status,400);
assert.equal((await submit({}, {headers:{Origin:'https://other.test'}})).status,403);
assert.equal((await submit({}, {body:'message='+ 'x'.repeat(20000)})).status,413);
assert.equal((await submit({}, {headers:{'Content-Length':'1'},body:'x'.repeat(9000)})).status,413);
assert.equal((await submit({}, {env:{}})).status,503);
assert.equal((await submit({context:"/guides/europe-hospitality-jobs/"})).status,200);
assert.equal(sent,3);globalThis.fetch=originalFetch;
console.log(`Passed assistant routing, contact guard, ${pages} HTML pages, and 10 mocked enquiry cases; no real delivery.`);
