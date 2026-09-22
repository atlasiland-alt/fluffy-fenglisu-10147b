# iLands Store — Deskwork

Marketing and intake site for iLands Store, a human-friendly deskwork service:
research, digging, organizing, writing, finding things, building things. A
customer describes what they're trying to accomplish in plain language, and the
site collects that request so it can be reviewed, scoped, priced, and routed.

Central message: **Bring us the messy thing. We'll figure out the deskwork.**

## Pages

| Route | What it covers |
|-------|----------------|
| `/` | Hero, what we do overview, real request examples, "ask anyway", the seven statuses, iLanders preview |
| `/what-we-do` | All five services in full, including sources and the boundaries we hold to |
| `/how-it-works` | The seven steps, what to write in a request, the request-status track |
| `/scope` | The eight parts of a project scope and the scope summary table |
| `/turnaround` | Turnaround bands, custom projects, and the timeline commitment |
| `/ilanders` | The iLander roster and how work is routed |
| `/request` | The request form, with validation, sending/success/failure states |

## Tech

- **TanStack Start** (React 19, TanStack Router file-based routing)
- **Vite 7** build, **Tailwind CSS 4** (design tokens in `src/styles.css`)
- **Netlify Forms** for request intake (submissions appear in the Netlify UI)
- **Netlify Image CDN** for serving illustrations as sized WebP
- TypeScript, strict mode, `@/*` alias for `src/*`

## Run locally

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

To exercise form handling the way production does, run through the Netlify CLI:

```bash
netlify dev --port 8889
```

Note that Netlify Forms submissions only record on a real deploy or deploy
preview, not in local dev.

## Illustrations

The four illustrations in `public/img/` were generated, not photographed, and
are labelled that way everywhere they appear — consistent with the service's own
transparency rule. `scripts/gen-images.mjs` regenerates them through the Netlify
AI Gateway if the art direction ever changes.

## Possible next steps

The public site and request intake are complete. Natural follow-ons, none of
them required for the site to work:

1. Customer-facing status lookup, so a customer can check which of the seven
   statuses their request sits in.
2. An internal queue for reviewing requests and composing the scope document.
3. Scope approval and payment, turning the approval step into a real action.
