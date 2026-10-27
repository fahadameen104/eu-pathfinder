# EU Pathfinder

A static, responsive website for EU Pathfinder with 35 European destination guides and 11 worker-market landing pages for South Asia and the Gulf, plus work-route guidance, document checklists, support services, pricing information, FAQs, and WhatsApp and email contact.

Destination and worker-market content live in `public\script.js`; `build-seo.mjs` prerenders the homepage and all routes into static HTML with page-specific titles, descriptions, canonical URLs, and social metadata. It also generates the sitemap from those routes. The site has no package dependencies or server-side form handling. Country photos are from Wikipedia and Wikimedia Commons and are credited in the site footer; flag artwork supplies a fallback for destinations without a thumbnail.

## Run locally

Run `node build-seo.mjs` to generate the static destination pages, then serve the `public` folder with any static file server. Opening `public\index.html` directly still works for the homepage.

## Deploy with Cloudflare Pages

The GitHub repository is connected to Cloudflare Pages. The production branch is `main`, and new commits deploy automatically.

Build settings:

- **Framework preset:** `None`
- **Build command:** `node build-seo.mjs`
- **Build output directory:** `public`

The custom domain `eupathfinder.agency` is managed from the Cloudflare Pages project's **Custom domains** tab.
