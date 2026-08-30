# Abdullah Khan Niazi — portfolio

Personal portfolio for a full-stack / AI engineer. Built with the same stack used
professionally, on the basis that the site is itself a work sample.

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 6 |
| Styling | Tailwind CSS v4, driven entirely by design tokens |
| Routing | React Router 7, route-level code splitting for case studies |
| Metadata | React 19 native `<title>`/`<meta>` hoisting — no helmet library |
| Deploy | Vercel (static SPA) |

### Why no `react-helmet-async`

It declares peer dependencies on React 16–18 and needs a forced override on React
19. React 19 hoists document metadata from any component, which covers every case
this site has, with less JavaScript on first load.

## Local development

```bash
npm install
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server on :5173 |
| `npm run build` | `tsc --noEmit` then a production build |
| `npm run typecheck` | Types only |
| `npm run lint` | ESLint |

## Design tokens

All colour lives in `src/index.css`. The rules that matter:

- **Every colour is defined on bare `:root` first.** Nothing gets its only
  definition inside a media query.
- **Dark values are declared once** as `--d-*` on `:root`, then assigned by two
  selectors — `:root[data-theme="dark"]` and
  `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`. That
  keeps the explicit and system paths from drifting apart.
- **Three theme states** are genuinely distinct: explicit light, explicit dark,
  and system. `system` writes no attribute at all and leaves the media query in
  charge.
- **Use the registered theme utilities** (`text-muted`, `bg-paper`,
  `border-line-strong`), not arbitrary `text-[var(--muted)]` classes.

### Colour rules that are not negotiable

- `--yellow` and `--mint` are **background-only**. They are too light to carry
  text on paper. Text on an accent block is always `--on-accent` (ink).
- Muted text uses the `--muted` token, never `opacity`. The reference design used
  `opacity: 0.4` and `0.55`, both of which failed WCAG AA.
- Measured: **6.92:1** minimum in light, **7.59:1** minimum in dark, across 61
  text nodes.

### Typography

`Silkscreen` is display-only — the hero name and `h2` section headings, never
below 20px. The `pixel` utility enforces the floor with
`font-size: max(1.25rem, 1em)`. Everything else is Space Grotesk (labels),
Manrope (body) or JetBrains Mono (numbers, tabular figures).

## Environment variables

Set these in the Vercel dashboard (Project → Settings → Environment Variables).

| Name | Required | Used for |
|---|---|---|
| `RESEND_API_KEY` | **Yes, to receive messages** | API key from [resend.com](https://resend.com). Without it `/api/contact` returns 503 and the form falls back to showing the email address. |
| `CONTACT_TO` | No | Destination address. Defaults to `abdullahkniazi04@gmail.com`. |
| `CONTACT_FROM` | No | Verified sender. Defaults to `onboarding@resend.dev`, which works with no custom domain but only delivers to your own verified address. |
| `VITE_API_URL` | No | Overrides the contact endpoint. Defaults to `/api/contact`. Repoint this at the NestJS service if the optional backend is built. |

### Where contact form messages go

`POST /api/contact` (`api/contact.ts`, Vercel Edge) validates the submission,
checks the honeypot, applies best-effort per-IP rate limiting, then sends the
message through Resend to `CONTACT_TO`, with the sender's address as `reply_to`
so a reply goes straight back to them.

**Until `RESEND_API_KEY` is set, no message is delivered.** The endpoint returns
503 and the form tells the visitor to email directly — it never reports a
success it did not achieve. The client also requires a JSON body with
`{ ok: true }`, so an SPA rewrite serving `index.html` at 200 cannot be mistaken
for a delivered message.

## Deploying to Vercel

The repo is not yet a git repository. To deploy:

```bash
git init && git add -A && git commit -m "Initial commit"
```

Then either push to GitHub and import the repo in the Vercel dashboard, or run
`npx vercel` from this directory. `vercel.json` already contains the SPA rewrite
(excluding `/api/`) and immutable caching for hashed assets.

Once the domain is known, update `SITE_URL` in `src/lib/site.ts` — see `TODO.md`.

## Content model

`src/data/projects.ts` holds two deliberately separate types:

- **`Project`** — the featured tier. Gets a `/work/:slug` case study page with a
  mandatory `limitations` field. Currently: PharmaERP, FedGuard, Hearing Care.
- **`MinorProject`** — the "Also built" footnote tier. No detail page, no route,
  no accent colour. `blurb` is capped at 20 words, checked at runtime in dev.
  `repoUrl` is omitted entirely when private, never rendered as a dead link.

They do not share a base type. They never share a rendering path, and a common
ancestor would only invite featured-tier fields to leak into the footnote tier.
