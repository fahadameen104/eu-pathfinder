# EuPathFinder.Agency — coding-agent instructions

This file guides AI coding agents (Codex, VS Code agents, and Linear's cloud coding agent) working in this repository. It is not a command to deploy, modify external accounts, or bypass approvals.

## Project
- Static site served from `public/`, with HTML/CSS/vanilla JavaScript.
- `public/script.js` contains destination, worker-market, guide, and publication route data and rendered page content.
- `public/index.html` is the shared page template; `public/styles.css` handles styling.
- `build-seo.mjs` prerenders static route pages, metadata, and the sitemap.
- `functions/api/enquiry.js` is the Cloudflare Pages Function for email enquiries via Resend.
- Cloudflare Pages builds with `node build-seo.mjs`, outputs `public`, and deploys `main` automatically. The live domain is `eupathfinder.agency`.

## Working practices
1. Read the relevant code and this file before editing. Prefer small, explainable changes, not sweeping rewrites.
2. For tasks from Linear, follow the issue's acceptance criteria and include the Linear issue identifier in the branch or pull request description when known.
3. Work in a separate branch and open a PR for human review. Never push to `main`, merge, change Cloudflare settings, or deploy production without explicit approval.
4. After modifying route data, the page template, scripts or styles, run `node build-seo.mjs`. Report results honestly; do not claim browser or live-site tests unless performed.
5. Verify internal links, responsive layouts, navigation, canonical URLs, sitemap output, metadata, and accessible labels for page-facing changes. Use actual checks instead of assumptions.
6. If a task requires access to a service, credential or personal computer, ask for the corresponding permission instead of fabricating access.

## Content, trust, and safety
- The site explains European work/relocation routes; do **not** claim guaranteed jobs, visa approvals, embassy appointments, legal status, or official government affiliation.
- Do not fabricate company registration information, licenses, legal representation, office addresses, testimonials, fees, policy text, or partnerships. Request verified facts for public-facing claims.
- Keep details on fees, official charges, eligibility, work permits and country rules accurate and appropriately qualified. Do not publish new prices or change a pricing policy unless specifically authorized.
- Maintain clear contact and privacy disclosures. Where the requested UI label is **Contact us**, it may open the approved WhatsApp link; don't relabel it "WhatsApp us" without a specific request.
- Handle enquiry data carefully (name, email, nationality, topic and message). Avoid logging or committing personal submissions.
- Do not expose API keys, `.env` contents, session tokens, or other secrets in commits, logs, PR descriptions or generated public assets.
- In particular, keep `RESEND_API_KEY` only in Cloudflare Pages encrypted secrets, never in `public/` or browser JavaScript.

## Review checklist
- Summarize files changed, observed behavior, test commands and results.
- Call out any unverified assumptions, external dependencies or deployment steps.
- Include screenshots only when actually captured; avoid fake claims of visual verification.
- Prefer a draft PR for first-pass agent work, with a concise test plan and easy rollback.
