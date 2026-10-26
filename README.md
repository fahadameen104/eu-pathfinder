# EU Pathfinder

An original, static landing page for EU Pathfinder, designed as a practical starting point for legal professionals exploring work across European borders. It does not reproduce the wording, layout, or assets of another website.

## Run locally

Open `public\index.html` in a browser. The page uses plain HTML, CSS, and JavaScript; it has no build step or third-party dependencies.

## Deploy with Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
3. Select the repository and use these build settings:
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** `exit 0`
   - **Build output directory:** `public`
4. Save and deploy. Cloudflare Pages will publish new deployments when commits are pushed to the connected branch.

The research-note form runs entirely in the visitor's browser. It does not send or store form entries.
