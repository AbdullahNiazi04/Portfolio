# TODO — outstanding information

Every item below is information I do not have and must not invent. Each has a
`TODO(abdullah):` marker at the point of use in the code.

## Blocking for launch

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Vercel subdomain** | `src/lib/site.ts` → `SITE_URL` | Currently `https://abdullah-niazi.vercel.app` as a placeholder. Every canonical URL, the sitemap and the OG image URL derive from this one constant. |
| 2 | **GitHub profile URL** | `src/lib/site.ts` → `person.github` | Currently `null`; the link is not rendered while null rather than pointing at `#`. |
| 3 | **LinkedIn profile URL** | `src/lib/site.ts` → `person.linkedin` | Same treatment as above. |

## Content — needed for Phase 2

| # | Item | Notes |
|---|------|-------|
| 4 | **Agentic AI course: provider, exact title, status** | Renders as `{Course Title} — {Provider} · {In progress \| Completed MM YYYY}` in the *Currently* band. Stays out of Education until complete. No credential ID, no badge. |
| 5 | **Confirm TensorFlow on the Stack list** | On the CV but in none of the audited repos. Drop it, or move it to a "familiar with" line. |
| 6 | **Confirm C++ on the Stack list** | Same question. |

## Content — needed for Phase 3 (case studies)

| # | Item | Notes |
|---|------|-------|
| 7 | **Hearing Care: is the site publicly live?** | If yes, live URL. If not, omit the link. |
| 8 | **Hearing Care: client naming permission** | If not granted, the case study is titled "Hearing clinic — client work" and the client is not named. |
| 9 | **Hearing Care: repo URL, or mark private** | Omit the field entirely if private — never a dead link. |
| 10 | **FilmCeption repo URL** (optional) | Second tier. Omit if private. |
| 11 | **RentKaro repo URL** (optional) | Second tier. Omit if private. |

## Assets — needed for Phase 4

| # | Item | Notes |
|---|------|-------|
| 12 | **OG image, 1200×630** | Must be a real rendered image, not a placeholder. |
| 13 | **Resume PDF** | Only if the `/resume` route is built. |

## Resolved

- ~~Experience date overlaps~~ — confirmed concurrent; the timeline will label them
  explicitly so the overlap reads as deliberate rather than as padding.
- ~~FilmCeption in or out~~ — demoted to the second tier per Addendum 2, one honest
  line, no case study page.
- ~~Deploy target~~ — Vercel (exact subdomain still needed, item 1).
