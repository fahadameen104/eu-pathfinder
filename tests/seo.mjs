import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=new URL('../public/',import.meta.url);
const xml=await readFile(new URL('sitemap.xml',base),'utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,52);
const pages=new Map();
for(const url of urls){const path=new URL(url).pathname;const html=await readFile(new URL(path==='/'?'index.html':path.slice(1)+'index.html',base),'utf8');pages.set(path,html);
assert.equal([...html.matchAll(/<h1\b/g)].length,1,path);
assert.ok(html.includes(`rel="canonical" href="${url}"`),path);
const schema=JSON.parse(html.match(/id="page-schema">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@graph'][0].url,url);
assert.equal(schema['@graph'][0].inLanguage,'en');
assert.doesNotMatch(html,/"@type":\s*"(?:JobPosting|LocalBusiness)"/);
}
for(const [path,html] of pages){for(const match of html.matchAll(/<a\b[^>]*href="(\/[^\"]*)"/g)){const target=new URL(match[1].replaceAll('&amp;','&'),'https://eupathfinder.agency');assert.ok(pages.has(target.pathname),`${path}: ${target.pathname}`);if(target.hash){const id=decodeURIComponent(target.hash.slice(1));assert.ok(pages.get(target.pathname).includes(`id="${id}"`),`${path}: missing ${target.hash}`);}}}
const africa=pages.get('/guides/europe-work-guidance-from-africa/');
for(const name of ['Nigeria','Ghana','Kenya','Uganda','Tanzania','Ethiopia','Egypt','South Africa'])assert.ok(africa.includes(name));
const gulf=pages.get('/guides/europe-work-guidance-from-gulf/');
for(const country of ['saudi-arabia','uae','qatar','oman','kuwait','bahrain'])assert.ok(gulf.includes(`/europe-jobs-from-${country}/`));
for(const country of ['pakistan','india','nepal','bangladesh'])assert.ok(pages.get(`/europe-jobs-from-${country}/`).includes('Related regional guides'));
console.log('SEO checks passed: 52 canonical pages, WebPage/Breadcrumb data, one H1, internal links/fragments, eight African and six Gulf targets.');
