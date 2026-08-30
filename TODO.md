# TODO — outstanding information

Every item below is information I do not have and must not invent. Each has a
`TODO(abdullah):` marker at the point of use in the code.

## Open

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Confirm TensorFlow on the Stack list** | `src/data/content.ts` → `stackGroups` | On the CV but in none of the audited repos. Drop it, or move it to the `familiar` line the way C++ was. This is the last unverified claim on the site. |
| 2 | **Generative AI course — syllabus topics** | `src/data/content.ts` → `currently` | Optional. Course, provider, status and completion date are all set. The old copy named agent architectures, tool use, orchestration and evaluation — that described an *Agentic* AI course, not this one, so it was removed rather than guessed at. Supply the real topics if you want them named. |
| 3 | **Move the course to Education on completion** | `src/components/sections/EducationSection.tsx` | Expected September 2026. Currently a visible placeholder; swap it for a real entry once done. |

## Assets — Phase 4

| # | Item | Notes |
|---|------|-------|
| 5 | **`RESEND_API_KEY` in Vercel** | Needed for the form to deliver mail **server-side**. Create a free key at resend.com and add it in Project → Settings → Environment Variables. `CONTACT_TO` defaults to `abdullahkniazi04@gmail.com`, so no other variable is required. Until it is set, the form falls back to a pre-filled `mailto:` addressed to you, so messages still reach you — the visitor sends from their own email client instead. |
| 6 | **OG image, 1200×630** | Must be a real rendered image, not a placeholder. |
| 7 | **`robots.txt` and `sitemap.xml`** | Missing today; this is the entire reason Lighthouse SEO scores 92 rather than 100. |
| 8 | **Resume PDF** | Only if the `/resume` route is built. |

## Resolved

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
