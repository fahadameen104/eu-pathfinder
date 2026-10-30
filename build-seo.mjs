import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const root = new URL(".", import.meta.url);
const publicDir = new URL("public/", root);
const script = await readFile(new URL("script.js", publicDir), "utf8");
const stylesheet = await readFile(new URL("styles.css", publicDir), "utf8");
const template = await readFile(new URL("index.html", publicDir), "utf8");
const assetVersion = createHash("sha256")
  .update(script)
  .update(stylesheet)
  .digest("hex")
  .slice(0, 12);
const countryData = script.match(/^const countries = \[([\s\S]*?)^\];/m)?.[1];
const workerMarketData = script.match(/^const workerMarkets = \[([\s\S]*?)^\];/m)?.[1];
if (!countryData || !workerMarketData) {
  throw new Error("Could not find country or worker-market routes in script.js.");
}
const countrySlugs = [...countryData.matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const workerMarketSlugs = [...workerMarketData.matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const routeSlugs = [...countrySlugs, ...workerMarketSlugs];
if (!countrySlugs.length || !workerMarketSlugs.length || new Set(routeSlugs).size !== routeSlugs.length) {
  throw new Error("Country or worker-market slugs are missing or duplicated.");
}
const paths = ["/", ...routeSlugs.map((slug) => `/${slug}`)];

function createElement() {
  return {
    addEventListener() {},
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute() { return "false"; },
    classList: { toggle() {}, remove() {} },
    style: { setProperty() {} },
    dataset: {},
    value: "",
    hidden: false,
    textContent: "",
    innerHTML: ""
  };
}

function renderPage(pathname) {
  const elements = new Map();
  const description = createElement();
  const canonical = createElement();
  const main = createElement();
  const document = {
    querySelector(selector) {
      if (selector === 'meta[name="description"]') return description;
      if (selector === 'link[rel="canonical"]') return canonical;
      if (selector === "#main") return main;
      if (!elements.has(selector)) elements.set(selector, createElement());
      return elements.get(selector);
    },
    querySelectorAll() { return []; }
  };

  runInNewContext(script, {
    document,
    window: { location: { pathname, protocol: "https:" } }
  }, { timeout: 5000 });

  return {
    html: main.innerHTML,
    title: document.title,
    description: description.attributes.content,
    canonical: canonical.attributes.href
  };
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function prerender(pathname) {
  const page = renderPage(pathname);
  if (!page.html || !page.title || !page.description || !page.canonical) {
    throw new Error(`Could not render SEO content for ${pathname}`);
  }

  const description = escapeAttribute(page.description);
  const title = escapeAttribute(page.title);
  const canonical = escapeAttribute(page.canonical);
  const html = template
    .replace(/<link\s+rel="stylesheet"\s+href="\/styles\.css(?:\?v=[^"]*)?"[^>]*>/, `<link rel="stylesheet" href="/styles.css?v=${assetVersion}">`)
    .replace(/<script\s+src="\/script\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/script.js?v=${assetVersion}" defer></script>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/, `<meta name="description" content="${description}">`)
    .replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}">`)
    .replace(/<main id="main" tabindex="-1">[\s\S]*?<\/main>/, `<main id="main" tabindex="-1">${page.html}</main>`);
  return html.replace(/[ \t]+$/gm, "");
}

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

for (const pathname of paths) {
  const relativePath = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
  const output = fileURLToPath(new URL(relativePath, publicDir));
  const html = prerender(pathname);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!title || !description || !canonical || titles.has(title) || descriptions.has(description) || canonicals.has(canonical)) {
    throw new Error(`Missing or duplicate SEO metadata for ${pathname}`);
  }
  titles.add(title);
  descriptions.add(description);
  canonicals.add(canonical);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((pathname) => `  <url><loc>https://eupathfinder.agency${pathname === "/" ? "/" : pathname}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("sitemap.xml", publicDir), sitemap, "utf8");

if ([...sitemap.matchAll(/<loc>[^<]+<\/loc>/g)].length !== paths.length) {
  throw new Error("Generated sitemap does not include every static page.");
}

console.log(`Prerendered ${paths.length} SEO pages.`);
