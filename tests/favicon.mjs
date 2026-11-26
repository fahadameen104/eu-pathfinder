import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const root = new URL("../public/", import.meta.url);
const png = await readFile(new URL("favicon-96x96.png", root));
assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
assert.equal(png.readUInt32BE(16), 96);
assert.equal(png.readUInt32BE(20), 96);
const sitemap = await readFile(new URL("sitemap.xml", root), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
for (const url of urls) {
  const path = new URL(url).pathname.replace(/^\//, "");
  const html = await readFile(new URL(`${path}index.html`, root), "utf8");
  const icons = html.match(/<link\s+rel="icon"[^>]*>/g) || [];
  assert.equal(icons.length, 1, url);
  assert.match(icons[0], /type="image\/png" href="\/favicon-96x96.png" sizes="96x96"/);
}
const robots = await readFile(new URL("robots.txt", root), "utf8");
assert.doesNotMatch(robots, /Disallow:\s*\/(?:\s|favicon)/i);
console.log(`Favicon checks passed: valid square 96px PNG, one stable primary icon on ${urls.length} pages, crawling allowed.`);
