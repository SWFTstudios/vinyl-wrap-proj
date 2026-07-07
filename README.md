# Apex Skin Studio

A cinematic, dark-mode website for a motorcycle vinyl-wrap **media brand +
boutique wrap studio**. Documents the build/wrap journey of a 2002 Honda
CBR600 F4i and converts riders into wrap inquiries.

> "I'm building a life I don't need a vacation from."

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, origin story, latest episode, the 5-step format, before/after, why-wraps, services preview, founder, CTA |
| `watch.html` | Watch — featured series, episodes grid, BTS clips, build journal, newsletter |
| `services.html` | Wrap Services — packages, process, what's included/not, pricing ranges, FAQ |
| `apply.html` | Apply — interactive 7-step wrap-inquiry wizard with progress indicator + review/confirmation |
| `about.html` | About — the personal story and mission |

## Tech

- **Vanilla only** — HTML, CSS, and JavaScript. No frameworks, no build step.
- Mobile-first and fully responsive.
- Smooth scroll, `IntersectionObserver` scroll-reveal, accordion FAQ, and a
  multi-step form wizard — all in `script.js`.
- Fonts: Anton (display) + Inter (body) via Google Fonts, with system fallbacks.

## Placeholders to replace before launch

- **Brand name:** "Apex Skin Studio" is a placeholder. Search the `.html`
  files for `Apex Skin Studio` and update the `.brand` block + footer + `<title>`s.
- **Media:** Lifestyle images live in `public/images/` (hero, garage scenes, before/after wraps, episode thumbnails, BTS clips). Swap any file in place to update visuals.
- **Links:** Social links (`href="#"`) and "Watch on YouTube" buttons need real URLs.
- **Forms:** The apply wizard and newsletter fake-submit client-side. Wire a real
  endpoint/email service in `script.js` (see the `NOTE:` comments).

## Theming

All accent colors and type live in the `:root` block of `styles.css`
(metallic green, chrome/silver, graphite). Change them in one place.

## Run locally

Static files live in `public/`. Preview with the Cloudflare Workers dev server:

```bash
npm install
npm run dev
```

Or serve the folder directly:

```bash
python3 -m http.server 8000 --directory public
```

## Deploy (Cloudflare Workers)

This site deploys as a [Cloudflare Worker with static assets](https://developers.cloudflare.com/workers/static-assets/).
Deployment is handled by **Cloudflare's GitHub integration (Workers Builds)** —
every push to `main` triggers a Cloudflare build and deploy automatically. There
is no GitHub Actions workflow and no API token stored in GitHub; Cloudflare uses
its own managed authorization once the repo is connected.

### One-time connection (Cloudflare dashboard)

1. Go to **Cloudflare dashboard → Workers & Pages → Create → Import a repository**.
2. Authorize GitHub and select **`SWFTstudios/vinyl-wrap-proj`**.
3. Confirm the build settings (Cloudflare reads `wrangler.jsonc`):
   - **Production branch:** `main`
   - **Deploy command:** `npx wrangler deploy` (default)
   - **Build command:** leave empty — this is a static site with no build step
   - **Root directory:** `/`
4. Click **Deploy**. Cloudflare builds and publishes the Worker.

After the first deploy, the live URL is
**`https://vinyl-wrap-proj.<your-subdomain>.workers.dev`**. From then on, every
push to `main` redeploys automatically. Attach a custom domain under
**Workers & Pages → vinyl-wrap-proj → Settings → Domains & Routes**.

### Manual / local deploy (optional)

```bash
npm install
npx wrangler login   # first time only
npm run deploy
```
