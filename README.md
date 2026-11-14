# EU Pathfinder

A responsive website for EU Pathfinder with European destination guides and worker-market landing pages for applicants in Pakistan, India, Bangladesh and Nepal, plus South Asian and African workers in Saudi Arabia, the UAE, Oman, Qatar, Kuwait and Bahrain. It includes work-route guidance, document checklists, support services, pricing information, FAQs, email contact, and an enquiry form. Visitors can email EU Pathfinder to ask about current vacancies for each destination.

Destination, worker-market and guide content live in `public\script.js`; `build-seo.mjs` prerenders the homepage and all routes into HTML with page-specific titles, descriptions, canonical URLs, and social metadata. It also generates the sitemap. Destination photos are from Wikipedia and Wikimedia Commons and are credited in the site footer; flag artwork supplies a fallback for destinations without a thumbnail. The original travel illustrations use fictional, non-official documents.

The enquiry form posts to a Cloudflare Pages Function at `functions\api\enquiry.js`. The function validates submissions and uses the Resend email API to deliver them to `info@eupathfinder.agency`. Before enabling the form in Cloudflare Pages:

1. Verify a sender domain in Resend.
2. Add `RESEND_API_KEY` as an encrypted Pages secret.
3. Add `RESEND_FROM_EMAIL` as a Pages environment variable using an address on the verified sender domain, for example `EU Pathfinder <no-reply@eupathfinder.agency>`.
4. Configure both production and preview environments as needed, then deploy and test the form.

Never put the Resend API key in `public\` files or client-side code. Enquiry submissions contain the visitor's name, email, nationality, topic and optional message; they pass through Cloudflare Pages and Resend before delivery to the team inbox.

## Run locally

Run `node build-seo.mjs` to generate the static destination pages, then serve the `public` folder with any static file server. Opening `public\index.html` directly still works for the homepage.

## Deploy with Cloudflare Pages

The GitHub repository is connected to Cloudflare Pages. The production branch is `main`, and new commits deploy automatically.

Build settings:

- **Framework preset:** `None`
- **Build command:** `node build-seo.mjs`
- **Build output directory:** `public`

The custom domain `eupathfinder.agency` is managed from the Cloudflare Pages project's **Custom domains** tab.

The shared page template includes the Google AdSense Auto ads loader, so Google selects ad placements across generated content pages. Before serving ads to visitors in the EEA, UK or Switzerland, configure a Google-certified consent management platform in AdSense; this site does not currently have a cookie-consent flow.
