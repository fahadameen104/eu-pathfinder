# EU Pathfinder

A static, responsive website for EU Pathfinder with the destination-led homepage, 35 country pages, work-route guidance, hiring sectors, document checklists, the seven-stage process, support services, pricing information, FAQs, and WhatsApp and email contact.

Destination content and page rendering live in `public\script.js`; the site has no build dependencies or server-side form handling. Country photos are from Wikipedia and Wikimedia Commons and are credited in the site footer; flag artwork supplies a fallback for destinations without a thumbnail.

## Run locally

Open `public\index.html` in a browser. For local server-style route testing, serve the `public` folder with any static file server; Cloudflare Pages serves the country paths through its single-page-app fallback.

## Deploy with Cloudflare Pages

The GitHub repository is connected to Cloudflare Pages. The production branch is `main`, and new commits deploy automatically.

Build settings:

- **Framework preset:** `None`
- **Build command:** `exit 0`
- **Build output directory:** `public`

The custom domain `eupathfinder.agency` is managed from the Cloudflare Pages project's **Custom domains** tab.
