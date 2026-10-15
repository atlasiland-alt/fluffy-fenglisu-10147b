# DeskWorkz — Deskwork

Marketing and intake site for DeskWorkz, a human-friendly deskwork service:
research, digging, organizing, writing, finding things, building things. A
customer describes what they're trying to accomplish in plain language, and the
site collects that request so it can be reviewed, scoped, priced, and routed.

Central message: **Bring us the messy thing. We'll figure out the deskwork.**

## Pages

| Route | What it covers |
|-------|----------------|
| `/` | Hero, what we do overview, real request examples, "ask anyway", the seven statuses, Ilanders preview |
| `/what-we-do` | All five services in full, including sources and the boundaries we hold to |
| `/how-it-works` | The seven steps, what to write in a request, the request-status track |
| `/scope` | The eight parts of a project scope and the scope summary table |
| `/turnaround` | Turnaround bands, custom projects, and the timeline commitment |
| `/ilanders` | The Ilander directory and how work is manually assigned |
| `/request` | The request form, with validation, sending/success/failure states |

The homepage and directory show the roster in an order that rotates daily.
Incoming requests do not ask customers to choose an Ilander: they are personally
reviewed and assigned manually based on the request and the roster.

## Tech

- **TanStack Start** (React 19, TanStack Router file-based routing)
- **Vite 7** build, **Tailwind CSS 4** (design tokens in `src/styles.css`)
- **Cloudflare Workers** via the Cloudflare Vite plugin and Wrangler
- **Resend** server-side email for client request intake
- Illustrations served directly from `public/img/`
- TypeScript, strict mode, `@/*` alias for `src/*`

## Run locally

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

The client request form sends email through the server-side Resend integration.
Set `RESEND_API_KEY`, `RESEND_TO`, and `RESEND_FROM` in the Cloudflare Worker
environment to enable intake through `/api/request`.

## Illustrations

The four illustrations in `public/img/` were generated, not photographed, and
are labelled that way everywhere they appear — consistent with the service's own
transparency rule.

## Possible next steps

The public site and request intake are complete. Natural follow-ons, none of
them required for the site to work:

1. Customer-facing status lookup, so a customer can check which of the seven
   statuses their request sits in.
2. An internal queue for reviewing requests and composing the scope document.
3. Scope approval and payment, turning the approval step into a real action.
