# AGENTS.md

Guidance for developers and AI agents working on the iLands Store — Deskwork
site. See `README.md` for what the product is and how to run it.

## Architecture

TanStack Start (React 19) with file-based routing, built by Vite, deployed to
Netlify. Every page is a static-feeling SSR page; the only server-side behaviour
is Netlify Forms handling the request intake. There is no database, no auth, and
no AI inference at runtime.

```
src/
├── components/ui.tsx   # Shared primitives: Reveal, PageHeader, SectionLabel,
│                       # Pull, TickList, Illustration, cdn()
├── data/site.ts        # ALL customer-facing copy: services, examples, steps,
│                       # statuses, turnarounds, scope sections, iLanders
├── routes/
│   ├── __root.tsx      # Document shell, fonts, header nav, footer, 404
│   ├── index.tsx       # Home
│   ├── what-we-do.tsx  # Services in full
│   ├── how-it-works.tsx# Seven steps + status track
│   ├── scope.tsx       # Scope contents + summary table
│   ├── turnaround.tsx  # Turnaround bands
│   ├── ilanders.tsx    # Roster + routing
│   └── request.tsx     # Request form
└── styles.css          # Design tokens and component classes
public/
├── __forms.html        # Static skeleton so Netlify registers the form
└── img/*.png           # Generated illustrations (full resolution originals)
scripts/gen-images.mjs  # One-off illustration generation
```

## Copy conventions — these matter more than the code

This is a service that sells trust, so the copy has hard rules baked into it:

- **Edit copy in `src/data/site.ts`, not in the route files.** Routes are layout;
  `site.ts` is the wording, kept in one reviewable place.
- **Never invent a service, source, or capability.** The five services and the
  iLander capability lists are the complete, established set. `ilanders` lists
  only capabilities we have established; iLanders are not interchangeable, and
  gaps are stated rather than filled.
- **Keep the boundaries visible.** We do not enter buildings, do not trespass,
  do not promise access we do not have, do not claim photographs we did not
  take, and do not guarantee unverifiable information. These appear on the
  service pages, the request page sidebar, and the footer. Don't quietly trim
  them to tighten a layout.
- **Label generated imagery as generated.** `Illustration` prints that caption by
  default; keep it. Never describe a generated image as a photograph.
- **No AI-futuristic framing.** The customer should never need to know or care
  which worker or technology handled the job. Avoid "agent", "prompt", "model"
  in customer-facing text.

## Design system

Archival deskwork: warm paper, ink linework, oxide-red stamps, manila gold,
archival green. Tokens live in `@theme` in `src/styles.css`; use the token
utilities (`bg-paper`, `text-ink-2`, `border-stamp`, `bg-archive`) rather than
raw hex or stock Tailwind palette colors.

Component classes in `styles.css`: `.display` / `.headline` / `.label` for type,
`.card` + `.card-lift` for paper surfaces, `.btn` / `.btn-ghost`, `.stamp`,
`.grain` (fixed grain overlay on `body`), `.ruled` / `.gridpaper` backgrounds,
`.marquee` ticker, `.taped` artwork corners, `.reveal` for scroll-in. All motion
is disabled under `prefers-reduced-motion`.

Type: Bricolage Grotesque (display), Newsreader (body), IBM Plex Mono (labels),
loaded from Google Fonts in `__root.tsx`.

## Non-obvious decisions

- **`public/__forms.html` is load-bearing.** Netlify detects forms by scanning
  static HTML at build time and cannot see React-rendered forms. The form posts
  to `/__forms.html` — not `/`, which the SSR handler would intercept. Any new
  field must be added to that skeleton as well as the React form, or Netlify
  rejects the submission. `.netlify/features/netlify-forms` activates the
  feature on deploy; leave it in place.
- **Illustrations are always served through the Image CDN.** Use `Illustration`
  or `cdn()` from `components/ui.tsx`; the originals in `public/img/` are ~2 MB
  each and should never be referenced directly in markup.
- **`Reveal` hides content until it intersects.** A `<noscript>` style in
  `__root.tsx` forces `.reveal` visible when JavaScript is unavailable, so the
  copy is never lost.
- **Content arrays in `site.ts` carry explicit types** (`Step`, `ScopeSection`,
  `Service`) because optional fields would otherwise break under
  `noUnusedLocals`/strict union inference.
