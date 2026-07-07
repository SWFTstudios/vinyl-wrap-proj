# Longbow-Style Redesign Plan

**Goal:** Rework the current site (Apex Skin Studio, placeholder name) so it looks and
feels like [db-longbow.webflow.io](https://db-longbow.webflow.io/) — the site for
**Longbow Motors**, the British hand-built "featherweight" electric sports car brand —
while reusing the content, pages, and copy the site already has.

This is a plan document, not the redesign itself. It's written so each phase can be
executed as its own PR.

---

## 1. What the Longbow site actually is, and why it works

db-longbow.webflow.io isn't a generic template — it's a real luxury automotive brand
site (production domain: longbowmotors.com). That matters, because what makes it feel
expensive is not a widget or a layout trick. It's a set of disciplined choices:

| # | Longbow signature | What it looks like in practice |
|---|---|---|
| 1 | **Photography carries the site** | Full-bleed, cinematic hero media. Cars shot at golden hour, on empty roads, in moody studio light. Almost no illustration or decoration — the product *is* the design. |
| 2 | **Radical restraint in copy** | Short declarative headlines ("Less is more." "Hand-built in England."). One idea per section. Lots of air between sections. |
| 3 | **The product as hero, presented like editions** | Two named vehicles (Speedster, Roadster), each with its own page, its own price ("From £84,995"), and an explicit limited run ("Limited to 150 cars"). Scarcity is stated as fact, not hype. |
| 4 | **Spec strips** | Rows of big numbers with small labels — weight, range, 0–62 time. Numbers do the persuading. |
| 5 | **Heritage / philosophy storytelling** | A manifesto section: spiritual successor to the Lotus Elise and Jaguar E-Type, "celebration of lightweighting." The founder's *why* is productized into a brand ethos. |
| 6 | **One CTA, repeated: "Reserve"** | Not "contact us," not "get a quote." Reserve your build slot. Reservation holders join **The Guild**, the owner community. The CTA is an invitation into something limited. |
| 7 | **Quiet, slow motion design** | Subtle fade/rise reveals on scroll, slow zooms on media, sticky minimal nav that recedes behind the imagery. Nothing bounces, nothing glows. |

**Site map of the reference** (confirmed pages): Home · Speedster · Roadster ·
Longbow Technologies · About · Ownership (The Guild) · Reserve · Community ·
Privacy / Terms.

**The single biggest gap between our site and theirs:** Longbow is ~90% photography
and ~10% UI. Our current site is 100% UI (CSS placeholder blocks) and 0% photography.
No amount of CSS gets us the Longbow feel without real cinematic images of the bike —
which is fine, because the content roadmap (fairings arriving, garage install, dawn
rides, wrap reveals) produces exactly those images. Section 6 turns that filming
schedule into a shot list.

---

## 2. Brand translation: featherweight sports cars → sportbike wraps

We don't copy Longbow's content; we translate its *moves*:

| Longbow move | Our translation |
|---|---|
| Two hand-built cars (Speedster / Roadster) | **The F4i as the flagship "product,"** plus each wrap colorway treated as a named, numbered release: *Skin 001 — Metallic Green*, *Skin 002 — …* |
| "Hand-built in England" heritage | **"Wrapped by hand in the garage. Ridden at dawn."** Craft + ritual as provenance. NJ/NYC as the home turf the way Britain is theirs. |
| "Celebration of lightweighting" manifesto | **A manifesto about transformation and discipline** — old plastics get a second life; the builder earns the ride before sunrise. |
| Limited to 150 / 100 cars | **Limited build slots** — honest scarcity: one documented build every 1–2 weeks means only ~2–4 client bikes a month. Say so: "4 build slots per month." |
| "Reserve" + The Guild | **"Reserve a build slot"** (replaces "Apply for a wrap") + a followers/owners circle — the newsletter and past clients become **The Grid** (or similar name TBD) who get first pick of slots and see reveals first. |
| Spec strips (kg, miles, 0–62) | **Build strips:** panels wrapped, hours of prep, film used (m²), episode number, before/after. |

### The founder's story — how it's used (and not used)

Per the owner's direction, the origin story (the storage-unit morning runs, the F1
track-walk ritual, dawn rides when traffic is low, the discipline stack) is **not
published verbatim anywhere on the site.** It is the *lens* for every copy decision:

- **Tone:** disciplined, early-morning, earned — never hustle-bro, never loud.
- **Recurring motifs in copy and imagery:** dawn / first light, ritual, repetition,
  the walk-around before the ride (the F1 track-walk idea becomes the "walk the bike"
  step in every build video and the before-photography convention).
- **Brand pillars** (internal, drive all copy): **Ritual · Craft · Transformation.**
- The existing About page keeps its three-chapter structure but gets rewritten
  tighter and more Longbow-spare — chapters become short manifesto beats, not
  autobiography.

---

## 3. Design system overhaul (`styles.css` tokens)

Keep the site dark and cinematic — that part already matches. Change the *character*:
today it reads "gaming/street" (neon green `#4ade80`, Anton condensed display, glow
shadows). Longbow reads "quiet luxury." Concrete token changes:

### 3.1 Color

| Token | Current | New | Why |
|---|---|---|---|
| `--bg` | `#0a0b0a` near-black | Keep, or warm slightly to `#0b0b09` | Already right |
| `--green` (primary accent) | `#4ade80` neon | **British Racing Green family: `#1d3a2a` surfaces / `#3f6b52` accents**, with off-white as the real "accent" | This is the key move — it keeps the green identity the brand already has, but shifts it from neon to heritage. It also quietly nods to the same British motorsport lineage Longbow claims. |
| `--shadow-green` glow | green glow | **Delete.** No colored glows anywhere | Glow = gamer; shadow = luxury |
| `--text` | `#f2f4f1` | Keep; introduce `--cream: #ece9e2` for hero headlines on imagery | Warmth over imagery |
| Buttons | filled green pills | **Outlined or off-white filled, squared (radius 2–4px), uppercase, letter-spaced** | Longbow CTAs are quiet |

### 3.2 Typography

| Role | Current | New |
|---|---|---|
| Display | Anton (heavy condensed, all-impact) | A refined grotesque at **light/regular weight, very large, tight leading** — from Google Fonts: **"Familjen Grotesk"** or **"Space Grotesk"** (pick one in Phase 1). Sentence case or elegant caps — no more shouty condensed. |
| Eyebrow labels | Inter caps | Keep caps but wider tracking (`letter-spacing:.35em`), smaller, `--text-faint`, optionally mono (**"IBM Plex Mono"**) for a technical spec-sheet feel |
| Body | Inter | Keep Inter — it's right — but reduce weight usage (400/500 only) |
| Numbers (spec strips) | — | Display font, thin, very large (`clamp(2.5rem,6vw,5rem)`) |

### 3.3 Space, radius, layout

- Section padding roughly **doubles** (`clamp(96px, 14vh, 200px)`). Longbow's luxury
  is mostly whitespace.
- `--radius: 16px → 4px` (or 0). Rounded cards read friendly; square reads precision.
- Max 2 cards per row on desktop for anything important (currently 3-up grids
  everywhere). Grids of 5–6 small cards get consolidated (see per-page plans).
- Full-bleed media sections between content sections — image bands that go edge to
  edge with a single line of caption text, used as "breathers."

### 3.4 Motion

- Keep the existing `IntersectionObserver` reveal system (it's the right mechanism) but
  slow it down: longer duration (~900ms), smaller travel (12–16px), ease-out, and add a
  **slow Ken-Burns zoom** class for media (`transform: scale(1.06→1)` over ~8s).
- Nav: transparent over the hero, gains the dark background + hairline border on
  scroll (partially exists via `data-nav` — refine).
- No hover glows; hover states become underlines and small image scale-ups.

---

## 4. Page-by-page plan (mapping existing content → Longbow structure)

The five existing pages all survive. Two get renamed. Every section below names the
existing content block it reuses.

### 4.0 Navigation (all pages)

- Links: **The Bike** (watch.html, renamed) · **Wraps** (services.html) · **Story**
  (about.html) · right-aligned CTA button: **Reserve a slot** (apply.html).
- Style: uppercase, tracked, small; logo becomes a plain wordmark (drop the chevron
  SVG mark or reduce it to a tiny monogram). Transparent → solid on scroll.

### 4.1 Home (`index.html`)

| Order | New section (Longbow-style) | Built from existing |
|---|---|---|
| 1 | **Full-screen hero:** one full-bleed photo/video of the F4i at dawn. Copy: eyebrow `NEW JERSEY / NEW YORK`, one headline ("One bike. Many lives." — or keep "Turning my first sportbike into a rolling story," shortened), one CTA **Reserve a slot**, one ghost link **Watch the build**. Delete the 3-stat hero meta row and badge. | Current hero, stripped down. `hero__media-grid`/`silhouette` placeholders replaced by real photo (Phase 4) |
| 2 | **Manifesto strip:** short centered statement, big thin type — distilled from the origin section ("It started with one bike and a 6am alarm" survives as the lead line; the rest cut to ~3 sentences). | Current `#story` section, heavily condensed |
| 3 | **The flagship — the F4i:** Longbow's "Speedster card" treatment. Full-bleed image, name, one-line description, **build strip** (Year 2002 · Panels 9 · Skin 001 · Episode 07), link → The Bike page. | Current `#latest` episode feature, reframed around the bike, not the video |
| 4 | **The Skins (editions):** the before/after grid becomes a horizontal row of numbered releases: *Skin 001 — Metallic Green*, *Skin 002 — Gloss Black*, *Skin 003 — Race Livery*. Each: image, number, name, "Watch the film" link. | Current `#transformations` 3 cards, re-skinned |
| 5 | **The Process:** keep the 5-step format (it's the strongest existing content — it's our "Technologies" section) but restyle: numbered `01–05` in thin display type, one line each, alternating with process photography. | Current `#format` steps, restyled |
| 6 | **Why wraps → philosophy:** keep the big statement ("Riders don't want a color change…") — already very Longbow. Restyle the 3 columns to 3 spare lines. | Current `#why` statement section, nearly as-is |
| 7 | **Commission band:** replaces both the services-preview grid *and* the CTA band. One full-bleed image, headline "Your bike, next." + "4 build slots per month." + **Reserve a slot**. The 6-card service grid moves entirely to the Wraps page. | Current `#services-preview` (moved) + `#founder` (moved to Story) + CTA band (merged) |
| 8 | **Footer:** slimmer — wordmark, one-line ethos, nav links, social, legal. | Current footer, simplified |

Net effect: home page goes from 8 busy sections to 7 spare ones, and every removed
block has a home elsewhere.

### 4.2 Watch → **The Bike** (`watch.html`)

Reframe from "content channel page" to **the product page for the F4i** — the way
Longbow gives the Speedster its own page — with the films embedded in the timeline.

- Hero: the bike, profile shot, name plate style: `HONDA CBR600 F4i · 2002 · PROJECT 001`.
- **Spec/build strip** (new, cheap to build): year, engine, panels, current skin,
  episodes filmed.
- **The build timeline:** existing episodes grid becomes a vertical numbered timeline
  (Ep 01 fairings arrive → install → first ride → first wrap → …), each entry a video
  embed + 2 lines. This maps 1:1 to the planned content cadence (Section 6).
- Keep: featured "now playing" player, build journal notes, newsletter signup —
  newsletter rebranded as the early-access circle ("get each reveal first, and first
  claim on build slots").
- Cut or fold: the separate Shorts/BTS grid folds into the timeline entries.

### 4.3 Services → **Wraps** (`services.html`)

Longbow-ize the commerce page:

- Hero: full-bleed detail shot (squeegee on panel), headline "Commission a wrap."
- **Packages as editions:** the 6 service cards consolidate to **3 tiers**, presented
  like model pages, each full-width with image, not small cards:
  1. **Full Transformation** (full sportbike wrap — from $900)
  2. **Fairing Set** (from $600)
  3. **Single Panel / Details** (tank·tail·fender·helmet — from $150)
  — with **"Filmed build" as a toggle/add-on** on any tier (the content package),
  framed as the desirable option: "your bike becomes an episode."
- Keep, restyled: the process section (mirrors home's 5 steps, more detail), the
  what's-included/excluded fine print (Longbow-style plain honesty — keep the copy,
  it's good), pricing ranges table, FAQ accordion.
- Every CTA on this page: **Reserve a slot**, with the scarcity line ("4 slots/month").

### 4.4 Apply → **Reserve** (`apply.html`)

The existing 7-step wizard is genuinely good and *more* polished than a typical
Webflow form — keep the mechanics, change the frame:

- Rename everywhere: "Apply for a wrap" → **"Reserve a build slot."**
- Restyle inputs to the new system (squared, hairline borders, generous spacing,
  uppercase labels).
- Step copy stays; final confirmation adds the Guild-style line: "You're in the queue.
  You'll hear from me directly within 48 hours, and you now get every reveal first."
- (Later, non-design) wire the fake submit to a real endpoint — Cloudflare Worker
  `fetch` handler in `src/index.ts` forwarding to email is the natural fit since the
  Worker already exists.

### 4.5 About → **Story** (`about.html`)

- Keep the three-chapter structure but compress each chapter to a Longbow-length beat
  (eyebrow + 1 short headline + ≤3 sentences + one photo).
- The mission statement section stays nearly as-is — it's already the right shape.
- Add one motif image slot: running shoes / helmet / keys at dawn — the ritual,
  implied, never explained. (This is how the origin story shows up without being
  published.)
- Founder block moves here from the home page (portrait + the "builder who films the
  work" quote).

---

## 5. Asset plan — the photography IS the redesign

Longbow's look cannot be faked with CSS. Until real photos exist, Phase 1–3 ship with
**dark, desaturated placeholder frames** (current `.media-ph` upgraded: film-grain
gradient + centered caption like `SKIN 001 — FILM PENDING`), which reads intentional
rather than unfinished.

**Shot list mapped to the already-planned filming schedule** (each video shoot yields
site assets — capture these specific frames as stills):

| Milestone (planned content) | Site assets to capture |
|---|---|
| Fairings arrive + garage install with friend | Hero-quality: parts laid out flat-lay (dark floor); hands on bolts; bike naked without plastics → **Process section + Bike page timeline Ep 01** |
| Learning to ride / first rides at dawn | Low-traffic dawn streets, long shadows, single headlight → **Home hero candidates**, Story page motif |
| Scenic-spot photo session (base black bike) | 3/4 front profile on empty road at golden hour → **Home hero, Bike page hero** |
| First vinyl wrap (e.g. Vinyl Frog film) | Squeegee close-up, heat gun, edge tuck macro → **Wraps page hero, 5-step section**; before/after pair from a locked tripod angle → **Skins cards** |
| Every subsequent skin (weekly/bi-weekly) | Repeat the *same* before/after tripod angle + same scenic reveal spot → consistent Skins grid, one new "edition" per release |

Rules for the Longbow look: shoot 16:9 and 4:5 crops of everything; golden hour or
garage tungsten only; desaturate slightly in grade; empty backgrounds (no clutter, no
people except hands/silhouette).

Technical: export WebP/AVIF ≤ 300KB for section images; hero can be an `<video muted
autoplay loop playsinline>` MP4 ≤ 4MB or a still + slow CSS zoom. Films stay on
YouTube (embeds) — the site is the showroom, YouTube is the archive.

---

## 6. Implementation phases (each = one PR)

**Phase 1 — Design system swap** (`styles.css`, fonts, buttons, nav, footer)
New tokens (§3), font swap, button/radius/spacing overhaul, nav rename + CTA rename
site-wide, slim footer. The site should already *feel* 60% Longbow after this phase
with zero structural change. ~1 session of work.

**Phase 2 — Home page restructure** (`index.html`)
Reorder/merge sections per §4.1, write the condensed manifesto + commission-band copy,
build the build-strip and Skins-row components. Placeholder frames upgraded.

**Phase 3 — Interior pages** (`watch.html` → Bike, `services.html` → Wraps,
`about.html` → Story, `apply.html` → Reserve)
Per §4.2–4.5. Wizard restyle only (no logic change).

**Phase 4 — Real media integration**
As shots from §5 land: hero video/stills, Skins before/afters, process photography.
Add `loading="lazy"`, `srcset`, preload for hero. This phase repeats per content drop.

**Phase 5 — Function & launch polish**
Reserve form → real endpoint via the existing Worker; newsletter hookup; OG images
from the new photography; favicon/wordmark; Lighthouse pass (target 95+ perf on
mobile); final brand-name decision (replace "Apex Skin Studio" placeholder — one
search-and-replace, already documented in README).

**Out of scope / unchanged:** Cloudflare Workers deploy flow, vanilla
HTML/CSS/JS-only constraint (no framework needed for any of the above), the five-page
information architecture.

---

## 7. Success criteria

1. Side-by-side squint test: home page hero, section rhythm, and CTA style read as
   the same *genre* as db-longbow.webflow.io (luxury automotive), not the same site.
2. Every piece of current copy either appears (possibly edited) or has an explicit
   new home — nothing invented wholesale except the manifesto condensations.
3. The origin story is never published, but "Ritual · Craft · Transformation" is
   traceable in every page's copy and imagery choices.
4. One CTA verb everywhere: **Reserve.**
5. The site improves automatically as each planned video is filmed — no redesign
   needed to absorb new skins/episodes, just new timeline entries and Skins cards.
