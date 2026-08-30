# TODO — outstanding information

Every item below is information I do not have and must not invent. Each has a
`TODO(abdullah):` marker at the point of use in the code.

## Open

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Which GitHub account should the site link to?** | `src/lib/site.ts` → `person.github` | Two accounts exist and both resolve: `AbdullahNiazi04` (holds this portfolio repo) and `abdullahkniazi04` (holds Rent-Karo, and matches your email address). Currently set to `AbdullahNiazi04`. One line to change. |
| 2 | **LinkedIn profile URL** | `src/lib/site.ts` → `person.linkedin` | `null` today, so the link is omitted entirely rather than pointed at `#`. |
| 3 | **Generative AI course — syllabus topics** | `src/data/content.ts` → `currently` | Optional. The course, provider and status are set. The old copy named agent architectures, tool use, orchestration and evaluation — that described an *Agentic* AI course, not this one, so it was removed rather than guessed at. Supply the real topics if you want them named. |
| 4 | **Confirm C++ on the Stack list** | `src/data/content.ts` → `stackGroups` | On the CV but in none of the audited repos. Drop it, or move it to a "familiar with" line. |
| 5 | **Confirm TensorFlow on the Stack list** | `src/data/content.ts` → `stackGroups` | Same question as C++. |
| 6 | **Hearing Care — client naming** | `src/data/projects.ts` | You named the client as *Hearing Care Studio*; the project is titled *Hearing Care Service*. Confirm which name should appear, and confirm you are content to name a client whose business has closed. |
| 7 | **Course completion date** | `src/components/sections/EducationSection.tsx` | On completion, the course moves from *Currently* to *Education* with a date. |

## Assets — Phase 4

| # | Item | Notes |
|---|------|-------|
| 8 | **OG image, 1200×630** | Must be a real rendered image, not a placeholder. |
| 9 | **`robots.txt` and `sitemap.xml`** | Missing today; this is the entire reason Lighthouse SEO scores 92 rather than 100. |
| 10 | **Resume PDF** | Only if the `/resume` route is built. |

## Resolved

- ~~Deploy URL~~ — `https://portfolio-site-seven-murex-68.vercel.app`, verified live.
- ~~Experience date overlaps~~ — concurrent; the timeline says so explicitly.
- ~~FilmCeption tier~~ — second tier, one line, no case study page. `PyTorch Mobile`
  and `TorchScript` removed from its tech list so nothing on the card implies the
  model did the predicting.
- ~~FilmCeption repo~~ — none; the client holds it. `repoUrl` omitted, so the title
  renders as plain text rather than a dead link.
- ~~RentKaro repo~~ — `https://github.com/abdullahkniazi04/Rent-Karo`.
- ~~Hearing Care live URL / repo~~ — neither exists. Client-side repo, and the client
  has closed, so nothing is online. The status note says so rather than claiming a
  deployment a reader cannot check.
- ~~Agentic AI course identity~~ — it is the Generative AI course, Cohort 3, by
  Pak Angels & HEC. In progress, so it sits in *Currently*, not *Education*.
- ~~Portrait~~ — supplied and optimised (593 KB → 15.6 KB at 1x WebP).
