# TODO — outstanding information

Every item below is information I do not have and must not invent. Each has a
`TODO(abdullah):` marker at the point of use in the code.

## Open

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Rotate the Resend API key** | resend.com dashboard | The key was shared in plain text in a chat transcript. It is not in this repo and never was, but a key that has been pasted anywhere should be treated as exposed. Revoke it, issue a new one, and update `RESEND_API_KEY` in Vercel. |
| 2 | **Move the course to Education on completion** | `src/components/sections/EducationSection.tsx` | Expected September 2026. Nothing renders for it under Education until then. |
| 3 | **GoFeast employment details** | `src/data/content.ts` | The period shown, Sep–Oct 2026, is my *commit range* (2026-09-08 to 2026-10-27), not confirmed employment dates, and `location` is omitted because nothing in the repo records it. Supply the real dates, the official title, the city or Remote, and whether the role is still open. |
| 4 | **Naming and NDA** | case study, Experience | The case study names GoFeast and UniKe, and credits Umer Akhtar for the app interface. Confirm all three are cleared, and that you have permission to publish his UI screenshots. If not, the project can be anonymised. |
| 5 | **Store listing** | `src/data/projects.ts` | `statusNote` says the app reached the client as an Android test build with no public listing, which is what the repo shows: the Android `release` target still signs with the debug config. Update it if the app has since been published. |
| 6 | **Screenshot refresh** | `public/img/` | The four published shots were captured 11–19 Sep 2026 and show a nav tab the app no longer has. None shows a finished generated video, the reels feed, the library or search — the parts closest to the backend. New captures would serve the case study better. |
| 7 | **Unverified in the case study** | `src/data/case-studies/unike.ts` | Elasticsearch is described as serving search, which is what the code does; whether its production cluster is live was not verified (the API starts without it). Confirm, or soften the line. |

## Optional / later

| # | Item | Notes |
|---|------|-------|
| 3 | **Resume PDF** | Only if the `/resume` route is built. Not started. |
| 4 | **Optional NestJS backend** | Phase 5 in the brief, and only on your say-so. The contact form already delivers, so this buys nothing today; it would mostly be a demonstration piece. |

## Resolved

- ~~UniKe case study~~ — published at `/work/unike` from the repo audit of 2026-11-02:
  65 endpoints over 16 controllers, 28 Prisma models, 25 socket event types. Four
  portrait screenshots, an architecture diagram, and the backend credited as mine
  with the Flutter app credited to Umer Akhtar.
- ~~Portrait screenshot layout~~ — `src/components/PhoneShots.tsx`, two staggered
  shots on the card and a captioned grid on the case study. The landscape
  `Screenshot` type is unchanged and still used by the other three projects.
- ~~Draft scaffolding~~ — removed with the content landing. `src/data/drafts.ts` and
  the dev-only route are gone; `assertNoPlaceholders()` stays as the guard against a
  TODO marker reaching `featured`.

- ~~Deploy URL~~ — `https://portfolio-site-seven-murex-68.vercel.app`, verified live.
- ~~GitHub~~ — `AbdullahNiazi04` is the main account and the one the site links to.
- ~~LinkedIn~~ — `https://www.linkedin.com/in/abdullahniazi1/`.
- ~~C++~~ — moved off the main Languages list to a "Familiar with" line, attributed
  to university coursework (OOP, DSA), so the main list stays a claim about
  production experience.
- ~~Course identity and date~~ — Generative AI, Cohort 3, by Pak Angels & HEC.
  In progress, completing September 2026, so it sits in *Currently* until then.
- ~~Experience date overlaps~~ — concurrent; the timeline says so explicitly.
- ~~FilmCeption tier and copy~~ — second tier, one line, no case study page.
  `PyTorch Mobile` and `TorchScript` removed from its tech list so nothing on the
  card implies the fine-tuned model did the predicting.
- ~~FilmCeption repo~~ — none; the client holds it. `repoUrl` omitted, so the title
  renders as plain text rather than a dead link.
- ~~RentKaro repo~~ — `https://github.com/abdullahkniazi04/Rent-Karo`.
- ~~Hearing Care live URL / repo~~ — neither exists. Client-side repo, and the client
  has closed, so nothing is online. The status note says so rather than claiming a
  deployment a reader cannot check.
- ~~Portrait~~ — supplied and optimised (593 KB → 15.6 KB at 1x WebP).
- ~~Hearing Care client name~~ — *Hearing Care Services*, used throughout.
- ~~Known limitations framing~~ — replaced by `solved: {problem, fix}[]`. The case
  study model has no field an open item could live in.
- ~~Education course placeholder~~ — removed. The course shows in *Currently* only,
  and nothing is rendered under Education until it completes.
- ~~Case study bundle weight~~ — prose split into per-route modules; first-load JS
  back to 128.3 KB gzipped.
- ~~TensorFlow~~ — moved to the AI/ML "Familiar with" line, same as C++.
- ~~Course outline~~ — six topics supplied and rendered in the Currently band.
- ~~Contact delivery~~ — `RESEND_API_KEY` is set in Vercel and the live endpoint
  returned 202 on a real send. The form delivers.
- ~~OG image~~ — generated at 1200×630 from your portrait, in the site's own
  visual language. No separate asset needed.
- ~~robots.txt / sitemap.xml~~ — generated from `SITE_URL` by `scripts/gen-seo.mjs`
  on every build, so they cannot drift from the deployed domain.
- ~~JSON-LD Person schema~~ — on the home page, with `alumniOf`, `knowsAbout`,
  `email` and both profile links.
- ~~Lighthouse targets~~ — Performance 97, Accessibility 100, Best Practices 100,
  SEO 100 on the mobile profile. All four clear the ≥95 bar.
- ~~Fonts~~ — self-hosted, latin subset, 94 KB across five files. The three
  faces used above the fold are preloaded.
