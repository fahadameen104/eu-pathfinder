# EU Pathfinder

A responsive website for EU Pathfinder with 35 European destination guides, 11 worker-market landing pages for South Asia and the Gulf, and practical hospitality and entry-level work guides. It includes work-route guidance, document checklists, support services, pricing information, FAQs, WhatsApp and email contact, and an enquiry form.

Destination, worker-market and guide content live in `public\script.js`; `build-seo.mjs` prerenders the homepage and all routes into HTML with page-specific titles, descriptions, canonical URLs, and social metadata. It also generates the sitemap. Destination photos are from Wikipedia and Wikimedia Commons and are credited in the site footer; flag artwork supplies a fallback for destinations without a thumbnail. The original travel illustrations use fictional, non-official documents.

The enquiry form posts to a Cloudflare Pages Function at `functions\api\enquiry.js`. The function validates submissions and uses the Resend email API to deliver them to `info@eupathfinder.agency`. Before enabling the form in Cloudflare Pages:

1. Verify a sender domain in Resend.
2. Add `RESEND_API_KEY` as an encrypted Pages secret.
3. Add `RESEND_FROM_EMAIL` as a Pages environment variable using an address on the verified sender domain, for example `EU Pathfinder <no-reply@eupathfinder.agency>`.
4. Configure both production and preview environments as needed, then deploy and test the form.

Never put the Resend API key in `public\` files or client-side code. Form submissions contain the visitor's name, email, nationality, WhatsApp number and optional message; they pass through Cloudflare Pages and Resend before delivery to the business inbox.

## Run locally

Run `node build-seo.mjs` to generate the static destination pages, then serve the `public` folder with any static file server. Opening `public\index.html` directly still works for the homepage.

## Deploy with Cloudflare Pages

The GitHub repository is connected to Cloudflare Pages. The production branch is `main`, and new commits deploy automatically.

Build settings:

- **Framework preset:** `None`
- **Build command:** `node build-seo.mjs`
- **Build output directory:** `public`

The custom domain `eupathfinder.agency` is managed from the Cloudflare Pages project's **Custom domains** tab.
