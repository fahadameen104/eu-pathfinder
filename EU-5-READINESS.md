# EU-5 deployment readiness

Implemented on `codex/eu-5-audit-fixes`, based on remote main `2257c845bdb38cce766a3f55da17041955d1bcab` after merged PR #7 (`4122a14`). The existing `C:/Users/aminf/eu-pathfinder` checkout had the same tracked HEAD and only untracked `.vscode/` and `.playwright-mcp/`; it was not edited. Work is isolated in this repository directory.

The live homepage returned HTTP 200 before editing and referenced `script.js?v=3aa15252846e`, with the newer branding and both supplied contact numbers. GitHub returned no commit-status records; that is not evidence of a successful or failed Pages deployment. Cloudflare project/account state and deployed backend revision were not accessible through the available connector.

## Ready in this change

- F02: preserve named FAQ lookup from latest main, improve intent precedence, regression-test quick prompts, fees/contact overlap, documents, start, country and fallback contact behavior.
- F03/F14/S01: explicit single labels, privacy description, visible and hidden page context; server validates known contexts and includes them in email. Older cached forms without context remain accepted. PR #7's email-only form remains; no new mandatory phone field.
- S02: enforce 8192 bytes actually read before form parsing, including absent/misleading Content-Length. S03 is obsolete because PR #7 removed the visitor WhatsApp field.
- Contacts: +14696268272 passes +1 numbering structure. +128991443132 has eleven digits after +1 and is invalid; no tel/wa.me link or structured telephone claim is published for it. No digits guessed. Account ownership and WhatsApp registration are not established by format validation.
- F04: remove all advertising initialization. Persistent Privacy & advertising settings link explains disabled state. No pretend consent acceptance UI; advertising cannot be enabled through this site until an appropriate certified CMP/account integration is configured.
- F05/F06: add factual privacy/data-flow/contact information, state retention details remain unpublished, and direct visitors to request written terms before paying. This is not a complete owner-reviewed jurisdiction-specific notice or service agreement.
- F07: destination cards use 330/960px responsive thumbnails with dimensions/lazy loading; raw Spain/Luxembourg originals are replaced with thumbnails. Smaller mobile section and hero backgrounds; remove mobile watermark. Existing alt text retained, fictional art described truthfully. No visible illustrative-photo disclaimers remain.
- F08: Pages `_headers` adds framing/capability protections and a report-only CSP compatible with listed assets. Report-only CSP does not block requests. HSTS/subdomain decisions remain with the account owner.
- F11/F12/R01/R03: UK/Britain search aliases and exact short-code matching; contact icon/target consistency; preserve latest favicon/social/Organization logo assets; add compact wrapping section navigation.
- R02: preserve noindex error document and canonical guide links. Host redirect changes remain an account task.

## Validation

- `node build-seo.mjs`: 50 unique SEO routes (49 existing plus privacy).
- `node tests/audit.mjs`: all 51 HTML files including 404 checked for invalid contact links, ad loaders, illustrative wording, nested/mismatched labels, duplicate IDs, missing alt attributes, JSON-LD validity and known form contexts. Assistant routes and 10 mocked enquiry cases passed; no email delivered.
- `node --check public/script.js` and `node --check functions/api/enquiry.js` passed.
- All 70 destination thumbnail URL variants returned HTTP 200 to HEAD at verification time; no permanent availability guarantee.
- Browser: homepage at 1440x900, Poland at 390x844 and privacy page; no root horizontal overflow in the two measured layouts, no nested labels. UK search returned United Kingdom only. All three assistant quick prompts gave the intended answers. Existing form labels were inspected through the accessibility tree. This is not a full screen-reader or WCAG certification.

## Open items / blockers to full audit closure

- Correct calls/WhatsApp number needed from owner. The supplied invalid value is withheld; this does not block deploying the valid WhatsApp/email flow.
- F01/S04: Cloudflare security events, human false-positive investigation and actual rate limits require account access. No blanket security weakening or unbacked in-memory limiter added.
- F05/F06: owner must substantiate retention, applicable processing/legal details and actual service/refund/complaint terms. Owner name, registration country and address deliberately not invented or added.
- F09: destination-specific official authority trail and content review dates require genuine content verification. No invented reviewer, review timestamp, vacancy, salary, eligibility or guarantee.
- F10: `docs/image-attribution-review.csv` lists all 35 original Wikimedia file-page references for owner verification. Creator/licence fields remain blank rather than invented; Commons metadata access failed DNS in this environment. Existing generic credit is retained and is not represented as complete licence compliance.
- F13: exact authorized ads.txt records and certified CMP must come from the advertising account before ads are restored. No guessed seller records. Ads remain disabled.
- R02: verify apex/www redirect and production headers at Cloudflare after deployment. HSTS requires intended host/subdomain review.
- Real enquiry delivery, Resend secrets/domain verification, SMS, calls, WhatsApp account reachability, payment, authenticated/admin areas, stress/security exploitation, native Safari/iOS/Android and field performance remain untested. No real message or payment was sent; Telnyx inbound handler was left unchanged.
- Preserve PR #7 exclusions: no EURES/external job-board links, no obsolete Adsterra test page, no owner/registered business details, no mandatory visitor WhatsApp field, no outcome guarantees.

## Deployment

Deploy `public/` and `functions/` together through the existing Cloudflare Pages project (main branch auto-deploy, build `node build-seo.mjs`, output `public`). This branch is build-ready for that coordinated deployment with advertising disabled. It is not represented as deployed until Pages reports success and the production asset version/headers are checked. Do not treat a Git push or absent GitHub status as deployment verification. Google favicon recrawl and display timing remain Google's decision.
