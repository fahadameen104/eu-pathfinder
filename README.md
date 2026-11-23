# EU PathFinder Agency 

A responsive website for EU Pathfinder with European destination guides and worker-market landing pages for applicants in Pakistan, India, Bangladesh and Nepal, plus South Asian and African workers in Saudi Arabia, the UAE, Oman, Qatar, Kuwait and Bahrain. It includes work-route guidance, document checklists, support services, pricing information, FAQs, phone and WhatsApp contacts, email, and an enquiry form. WhatsApp: `+14696268272`. Calls and WhatsApp: `+12899143132` (corrected by owner, format-valid). CEO contact: `Eupathfinder@gmail.com`. Format validation does not verify account registration or ownership.

Destination, worker-market and guide content live in `public\script.js`; `build-seo.mjs` prerenders the homepage and all routes into HTML with page-specific titles, descriptions, canonical URLs, and social metadata. It also generates the sitemap. Destination photos are from Wikipedia and Wikimedia Commons and are credited in the site footer; flag artwork supplies a fallback for destinations without a thumbnail. The original travel illustrations use fictional, non-official documents.

The shared template declares stable ICO/PNG/SVG favicons, an Apple touch icon, social logo metadata and an Organization logo. Brand assets are served from `public/`; robots.txt allows crawling them. Google controls when its search results pick up favicon changes after recrawling.

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

Advertising initialization is disabled. The persistent Privacy & advertising settings link explains this state. Do not restore ad scripts until the owner configures and verifies the appropriate Google-certified consent management platform and actual ads.txt account records. No optional ad storage is enabled by this build. See EU-5-READINESS.md for owner/account blockers and verification limits.

## Verification

Run `node build-seo.mjs` and `node tests/audit.mjs`. Backend cases mock email delivery and do not send real enquiries. Deploy the generated public files and Pages Functions together; old forms without page context remain accepted.

## Optional GA4 measurement

GA4 property 564401731, web stream 16343592666, measurement ID `G-672X9VRT2X` are configured under the owner's account. `public/analytics.js` loads the Google tag only after analytics acceptance, remembers the choice for 180 days and exposes a footer/notice preference control. Rejecting prevents loading; withdrawing disables collection, clears first-party GA cookies and reloads. Advertising consent remains denied; Signals and ad personalization are disabled. Automatic form, site-search and video events are disabled in the stream. Successful form responses emit only `generate_lead` with `method: enquiry_form`; no submitted fields are used. Page/referrer URLs omit query strings and fragments. Consent changes browser coverage: GA4 counts consenting visitors, not all site requests.

Run `node tests/analytics.mjs`, `node tests/audit.mjs` and `node tests/seo.mjs` before deployment. Localhost never loads GA4. `?ga_debug=1` on production enables debug mode for an explicit test after consent, while the reported page URL excludes that query. Real lead delivery must not be fabricated for testing. Analytics cannot recover past unmeasured sessions.
