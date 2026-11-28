import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const root = new URL(".", import.meta.url);
const publicDir = new URL("public/", root);
const script = (await Promise.all(["editorial-content.js", "editorial-renderers.js", "script.js"].map(file => readFile(new URL(file, publicDir), "utf8")))).join("\n").replace(/\r\n/g, "\n");
const stylesheet = (await readFile(new URL("styles.css", publicDir), "utf8")).replace(/\r\n/g, "\n");
const analytics = (await readFile(new URL("analytics.js", publicDir), "utf8")).replace(/\r\n/g, "\n");
const globe = (await readFile(new URL("globe.js", publicDir), "utf8")).replace(/\r\n/g, "\n");
const advertising = (await readFile(new URL("advertising.js", publicDir), "utf8")).replace(/\r\n/g, "\n");
const template = await readFile(new URL("index.html", publicDir), "utf8");
const assetVersion = createHash("sha256")
  .update(script)
  .update(stylesheet)
  .update(analytics)
  .update(advertising)
  .update(globe)
  .digest("hex")
  .slice(0, 12);
const countryData = script.match(/^const countries = \[([\s\S]*?)^\];/m)?.[1];
const workerMarketData = script.match(/^const workerMarkets = \[([\s\S]*?)^\];/m)?.[1];
const guideData = script.match(/^const guides = \[([\s\S]*?)^\];/m)?.[1];
const publicationData = script.match(/^const publicationPages = \[([\s\S]*?)^\];/m)?.[1];
if (!countryData || !workerMarketData || !guideData || publicationData === undefined) {
  throw new Error("Could not find country, worker-market, guide or publication routes in script.js.");
}
const countrySlugs = [...countryData.matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const workerMarketSlugs = [...workerMarketData.matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const guideSlugs = [...guideData.matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const publicationSlugs = [...publicationData.matchAll(/\{\s*slug:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const routeSlugs = [...countrySlugs, ...workerMarketSlugs, ...guideSlugs, ...publicationSlugs];
if (!countrySlugs.length || !workerMarketSlugs.length || !guideSlugs.length || new Set(routeSlugs).size !== routeSlugs.length) {
  throw new Error("Country, worker-market, guide or publication slugs are missing or duplicated.");
}
const paths = [
  "/",
  "/privacy",
  ...countrySlugs.map((slug) => `/${slug}`),
  ...workerMarketSlugs.map((slug) => `/${slug}`),
  ...guideSlugs.map((slug) => `/guides/${slug}`),
  ...publicationSlugs.map((slug) => `/${slug}`)
];

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
    addEventListener() {},
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
  const mainPattern = /<main id="main" tabindex="-1"(?: data-prerendered="true")?>[\s\S]*?<\/main>/;
  const html = template
    .replace(/<link\s+rel="stylesheet"\s+href="\/?styles\.css(?:\?v=[^"]*)?"[^>]*>/, `<link rel="stylesheet" href="/styles.css?v=${assetVersion}">`)
    .replace(/<script\s+src="\/?script\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/script.js?v=${assetVersion}" defer></script>`)
    .replace(/<script\s+src="\/?analytics\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/analytics.js?v=${assetVersion}" defer></script>`)
    .replace(/<script\s+src="\/?editorial-content\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/editorial-content.js?v=${assetVersion}" defer></script>`)
    .replace(/<script\s+src="\/?editorial-renderers\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/editorial-renderers.js?v=${assetVersion}" defer></script>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?>/, `<meta name="description" content="${description}">`)
    .replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}">`);
  if (!mainPattern.test(html)) {
    throw new Error(`Could not replace the main content for ${pathname}`);
  }
  const countryNames = pathname.includes("from-africa")
    ? ["Nigeria", "Ghana", "Kenya", "Uganda", "Tanzania", "Ethiopia", "Egypt", "South Africa"]
    : pathname.includes("from-gulf")
      ? ["Saudi Arabia", "United Arab Emirates", "Qatar", "Oman", "Kuwait", "Bahrain"]
      : [];
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${page.canonical}#webpage`,
        url: page.canonical, name: page.title, description: page.description,
        inLanguage: "en", isPartOf: { "@id": "https://eupathfinder.agency/#website" },
        ...(countryNames.length ? { about: countryNames.map(name => ({ "@type": "Country", name })) } : {})
      },
      ...(pathname === "/" ? [] : [{
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://eupathfinder.agency/" },
          { "@type": "ListItem", position: 2, name: page.title.replace(/ \| EU PathFinder Agency$/, ""), item: page.canonical }
        ]
      }])
    ]
  };
  const schemaMarkup = `<script type="application/ld+json" id="page-schema">${JSON.stringify(pageSchema).replaceAll("<", "\\u003c")}</script>`;
  const cleanHtml = html.replace(/\s*<script type="application\/ld\+json" id="page-schema">[\s\S]*?<\/script>/g, "");
  const prerenderedHtml = cleanHtml
    .replace("</head>", `${schemaMarkup}\n  </head>`)
    .replace(/<script\s+src="\/?advertising\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/advertising.js?v=${assetVersion}" defer></script>`)
    .replace(/<script\s+src="\/?globe\.js(?:\?v=[^"]*)?"\s+defer><\/script>/, `<script src="/globe.js?v=${assetVersion}" defer></script>`)
    .replace(mainPattern, `<main id="main" tabindex="-1" data-prerendered="true">${page.html}</main>`);
  const normalizedHtml = prerenderedHtml.replace(/[ \t]+$/gm, "");
  return pathname === "/"
    ? normalizedHtml
    : normalizedHtml
        .replace(/^[ \t]*<meta name="algolia-site-verification"[^>]*>\r?\n/m, "")
        .replace('<body class="home-page">', "<body>");
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
${paths.map((pathname) => `  <url><loc>https://eupathfinder.agency${pathname === "/" ? "/" : `${pathname}/`}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("sitemap.xml", publicDir), sitemap, "utf8");

if ([...sitemap.matchAll(/<loc>[^<]+<\/loc>/g)].length !== paths.length) {
  throw new Error("Generated sitemap does not include every static page.");
}

console.log(`Prerendered ${paths.length} SEO pages.`);
