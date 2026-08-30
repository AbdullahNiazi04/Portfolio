import { Link } from 'react-router-dom';
import { Container } from './Container';
import { Seo } from './Seo';
import { SectionHeading } from './SectionHeading';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Reveal } from '@/lib/motion';
import type { Accent, CaseStudy, Project, ProjectStatus } from '@/data/projects';

const ACCENT_BG: Record<Accent, string> = {
  blue: 'bg-blue',
  pink: 'bg-pink',
  yellow: 'bg-yellow',
  mint: 'bg-mint',
};

const ACCENT_BORDER: Record<Accent, string> = {
  blue: 'border-l-blue',
  pink: 'border-l-pink',
  yellow: 'border-l-yellow',
  mint: 'border-l-mint',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  deployed: 'Deployed',
  delivered: 'Delivered',
  prototype: 'Prototype',
};

/** Section shell inside a case study. Headings stay short so the pixel face works. */
function Block({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="border-t-2 border-dashed border-line py-12 sm:py-14"
    >
      <Reveal>
        <SectionHeading id={id}>{heading}</SectionHeading>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[68ch] leading-[1.75] text-muted">{children}</p>;
}

export function CaseStudyPage({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  return (
    <>
      <Seo
        title={`${project.title} — ${project.subtitle} | Abdullah Khan Niazi`}
        description={project.oneLiner}
        path={`/work/${project.slug}`}
      />

      <article className="pb-8">
        <Container>
          {/* ---------------- header ---------------- */}
          <header className="py-12 sm:py-16">
            <Link
              to={{ pathname: '/', hash: '#work' }}
              className="label-type text-[0.7rem] text-muted transition-colors hover:text-ink"
            >
              ← Selected work
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <span
                className={`label-type border-[1.5px] border-ink px-2.5 py-1 text-[0.62rem] text-on-accent ${ACCENT_BG[project.accent]}`}
              >
                {STATUS_LABEL[project.status]}
              </span>
              <span className="text-[0.75rem] text-muted">{project.statusNote}</span>
            </div>

            <h1 className="pixel mt-5 text-[clamp(1.9rem,6.5vw,3.4rem)] leading-[1.1]">
              {project.title}
            </h1>
            <p className="font-label mt-4 max-w-[46ch] text-[clamp(1rem,2vw,1.3rem)] leading-[1.4] font-semibold">
              {project.subtitle}
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="label-type text-[0.58rem] text-muted">Role</dt>
                <dd className="mt-1 max-w-[34ch] text-[0.88rem]">{project.role}</dd>
              </div>
              <div>
                <dt className="label-type text-[0.58rem] text-muted">Period</dt>
                <dd className="num mt-1 text-[0.88rem]">{project.period}</dd>
              </div>
            </dl>

            <dl className="mt-9 grid grid-cols-2 gap-5 border-t-2 border-dashed border-line pt-6 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="label-type text-[0.58rem] text-muted">{m.label}</dt>
                  <dd className="num mt-1.5 text-[1.35rem] font-bold">{m.value}</dd>
                  {m.note ? (
                    <p className="mt-1 text-[0.7rem] leading-snug text-muted">{m.note}</p>
                  ) : null}
                </div>
              ))}
            </dl>

            <ul
              className="mt-7 flex flex-wrap gap-1.5"
              aria-label={`${project.title} technologies`}
            >
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="label-type border-[1.5px] border-line-strong px-2 py-0.5 text-[0.6rem]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </header>

          {/* ---------------- the problem ---------------- */}
          <Block id="cs-problem" heading="The problem">
            <Reveal>
              <Prose>{caseStudy.problem}</Prose>
            </Reveal>
          </Block>

          {/* ---------------- architecture ---------------- */}
          <Block id="cs-architecture" heading="Architecture">
            <Reveal>
              <Prose>{caseStudy.architecture}</Prose>
              <ArchitectureDiagram slug={project.slug} />
            </Reveal>
          </Block>

          {/* ---------------- decisions ---------------- */}
          <Block id="cs-decisions" heading="Decisions">
            <ul className="border-t-2 border-dashed border-line">
              {caseStudy.decisions.map((d, i) => (
                <li
                  key={d.title}
                  className={`border-b-2 border-dashed border-line border-l-4 py-7 pl-5 ${
                    ACCENT_BORDER[project.accent]
                  }`}
                >
                  <Reveal delay={i * 0.04}>
                    <h3 className="label-type text-[0.95rem] font-bold">
                      <span className="num mr-2.5 text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {d.title}
                    </h3>
                    <p className="mt-2.5 max-w-[66ch] leading-relaxed text-muted">{d.body}</p>
                    <p className="mt-3 max-w-[66ch] bg-paper-deep p-3.5 text-[0.88rem] leading-relaxed">
                      <span className="label-type text-[0.58rem] text-muted">Trade-off</span>
                      <br />
                      {d.tradeoff}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Block>

          {/* ---------------- hardest bug ---------------- */}
          {caseStudy.hardestBug ? (
            <Block id="cs-bug" heading="The hardest bug">
              <Reveal>
                <div className="border-[2.5px] border-ink p-5 sm:p-7">
                  <h3 className="label-type text-[1rem] font-bold">
                    {caseStudy.hardestBug.title}
                  </h3>
                  <p className="mt-3 max-w-[66ch] leading-[1.75] text-muted">
                    {caseStudy.hardestBug.body}
                  </p>
                  <p
                    className={`mt-5 border-l-4 py-1 pl-4 text-[0.95rem] leading-relaxed ${
                      ACCENT_BORDER[project.accent]
                    }`}
                  >
                    <span className="label-type block text-[0.58rem] text-muted">Lesson</span>
                    {caseStudy.hardestBug.lesson}
                  </p>
                </div>
              </Reveal>
            </Block>
          ) : null}

          {/* ---------------- problems solved ---------------- */}
          <Block id="cs-solved" heading="Problems solved">
            <ul className="grid gap-4">
              {caseStudy.solved.map((s, i) => (
                <li
                  key={s.problem.slice(0, 40)}
                  className="border-[1.5px] border-line-strong p-5"
                >
                  <Reveal delay={i * 0.03}>
                    <p className="label-type text-[0.58rem] text-muted">Came up</p>
                    <p className="mt-1.5 max-w-[66ch] text-[0.92rem] leading-relaxed">
                      {s.problem}
                    </p>
                    <p className="label-type mt-4 text-[0.58rem] text-muted">Resolved</p>
                    <p className="mt-1.5 max-w-[66ch] text-[0.92rem] leading-relaxed text-muted">
                      {s.fix}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Block>

          {/* ---------------- results ---------------- */}
          <Block id="cs-results" heading="Where it landed">
            <Reveal>
              <Prose>{caseStudy.results}</Prose>
            </Reveal>
          </Block>

          {/* ---------------- footer nav ---------------- */}
          <div className="flex flex-wrap gap-4 border-t-2 border-dashed border-line py-10">
            <Link
              to={{ pathname: '/', hash: '#work' }}
              className="label-type inline-flex border-2 border-ink bg-ink px-6 py-3.5 text-[0.78rem] text-paper transition-colors hover:bg-transparent hover:text-ink"
            >
              ← All work
            </Link>
            <Link
              to={{ pathname: '/', hash: '#contact' }}
              className="label-type inline-flex items-center border-b-2 border-line-strong pb-0.5 text-[0.78rem] transition-colors hover:border-pink hover:text-pink"
            >
              Get in touch
            </Link>
          </div>
        </Container>
      </article>
    </>
  );
}
