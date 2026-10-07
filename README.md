# VMarket Digital — homepage

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript. Statically
prerendered, zero runtime dependencies beyond React.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (Turbopack)
npm start       # serve the build
```

## How this is organised

| Path | Purpose |
| --- | --- |
| `src/lib/content.ts` | **Single source of truth.** Services, regions, FAQs, AEO answers, process, NAP. |
| `src/lib/schema.ts` | JSON-LD `@graph`, derived entirely from `content.ts`. |
| `src/components/ledger/` | Homepage sections, header/footer, motion (InkField, RevenuePath, Kinetic). |
| `src/app/` | Layout metadata, `sitemap.ts`, `robots.ts`, generated `opengraph-image`. |
| `public/llms.txt` | Plain-language entity summary for LLM answer engines. |

The important rule: **copy lives in `content.ts`, not in components.** The page,
the JSON-LD, and `llms.txt` all read from it, so structured data can never
drift from what a visitor actually sees.

## Lead capture

`LeadForm` posts JSON to `NEXT_PUBLIC_LEAD_ENDPOINT`. Point this at the
existing LeadConnector / GoHighLevel inbound webhook so submissions land in
the same pipeline as the current site:

```bash
# .env.local
NEXT_PUBLIC_LEAD_ENDPOINT="https://services.leadconnectorhq.com/hooks/…"
```

With no endpoint configured the form degrades to a prefilled `mailto:` draft
rather than silently dropping the enquiry.

## Design and motion notes

"Growth Ledger" — a light, editorial system: warm paper (`paper-*`), near-black
ink (`ink-*`), brand steel blue as the structural accent, ember as a rare
conversion accent. Components live in `src/components/ledger/`.

- **Hero ink drawing** (`InkField.tsx`) is Canvas 2D, not WebGL: particles
  trace a flow field as fine steel-blue strokes. It caps DPR at 2, scales
  particle count to area, pauses off-screen and on hidden tabs, draws one
  static frame under `prefers-reduced-motion`, and rejects zero-size layout
  reads (committing a 0-wide backing store would leave it permanently blank).
  The radial mask on its container is what stops it ending in a hard edge.
- **Revenue path** (`RevenuePath.tsx`) is sticky on desktop so the line
  finishes drawing while still on screen. Scroll progress writes straight to
  DOM attributes — no React state per frame.
- **Kinetic type / Rise** are visible by default; JS opts elements into the
  hidden state only once it is observing, so copy never depends on hydration.
- **Coverage clocks** render after hydration only, to avoid a server/client
  time mismatch. IANA zones live on each region in `content.ts`.
- **Colour contrast** is tuned against the darkest paper tone in use
  (`paper-200`): `ink-500` ≈ 5.2:1, `ink-400` ≈ 4.6:1. `ink-300`/`ink-200` are
  decorative only. `ember-500` is a fill, never text (2.6:1) — use `ember-700`
  for text. Primary buttons are `ink-900` on paper.

## Extending to service and location pages

`content.ts` already carries the data these pages need — `services[].slug` and
`regions[].priorityMarkets` exist for exactly this.

**Service pages** — `/services/[slug]`

1. `generateStaticParams()` from `services`.
2. Reuse `Section`, `Answers`, `Faq`; add service-specific proof and pricing.
3. Emit a `Service` JSON-LD node with `provider: { '@id': ORG_ID }` so it
   attaches to the same organisation entity the homepage establishes.
4. Add the route to `sitemap.ts`.

**Location pages** — `/[country]/[city]` (e.g. `/uk/london`, `/ae/dubai`)

Build these in tiers rather than all at once — thin, templated city pages are
a ranking liability:

1. **Tier 1 — country hubs** (6 pages). Genuine local content: currency,
   business hours, regulatory notes, regional case studies. Add
   `areaServed` and, once real reviews exist, `AggregateRating`.
2. **Tier 2 — priority cities** (~25 pages, from `regions[].priorityMarkets`).
   Only publish where there is real local proof: a client, a case study, or
   market-specific research. Each needs content that could not be
   copy-pasted to another city.
3. **Tier 3 — service × city** (e.g. `/uk/london/seo`). Only for combinations
   with demonstrated search volume, and only after tiers 1 and 2 rank.

Add `hreflang` alternates once regional variants exist, and set
`alternates.canonical` per page. Keep the homepage as the entity anchor —
every location page should link back to it and reuse the same `@id`.

**Also worth adding:** case study pages (`CaseStudy` + `Review` schema) — the
single biggest missing trust signal on this site today.
