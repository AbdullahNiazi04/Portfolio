import { Link } from 'react-router-dom';
import type { Accent, Project, ProjectStatus } from '@/data/projects';

/** Static class maps — Tailwind cannot see dynamically built class strings. */
const ACCENT_BG: Record<Accent, string> = {
  blue: 'bg-blue',
  pink: 'bg-pink',
  yellow: 'bg-yellow',
  mint: 'bg-mint',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  deployed: 'Deployed',
  delivered: 'Delivered',
  prototype: 'Prototype',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <article className="relative mt-14 border-[2.5px] border-ink">
      {/* folder tab, overlapping the top border */}
      <span
        className="label-type num absolute -top-[19px] left-1/2 -translate-x-1/2 bg-ink px-5 py-1.5 text-[0.66rem] tracking-[0.08em] text-paper [clip-path:polygon(6%_0,94%_0,100%_100%,0_100%)]"
        aria-hidden="true"
      >
        Project {String(index + 1).padStart(2, '0')}
      </span>

      {/*
        Explicit grid order rather than `direction: rtl`. The reference used rtl
        to flip columns, which corrupts punctuation and text selection.
      */}
      <div className="grid lg:grid-cols-2">
        <div
          className={`${ACCENT_BG[project.accent]} flex h-[120px] items-start justify-end p-4 lg:h-auto lg:min-h-[380px] ${
            reversed ? 'lg:order-2' : 'lg:order-1'
          } [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.14)_0_10px,transparent_10px_20px)]`}
        >
          <span className="label-type num bg-on-accent-surface px-2 py-1 text-[0.6rem] text-on-accent">
            {project.period}
          </span>
        </div>

        <div
          className={`flex flex-col justify-center gap-4 p-6 sm:p-9 ${
            reversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="label-type border-[1.5px] border-line-strong px-2.5 py-1 text-[0.62rem]">
              {STATUS_LABEL[project.status]}
            </span>
            <span className="text-[0.72rem] text-muted">{project.statusNote}</span>
          </div>

          <div>
            <h3 className="pixel text-[clamp(1.5rem,3.4vw,2.1rem)]">{project.title}</h3>
            <p className="label-type mt-2 text-[0.68rem] text-muted">{project.subtitle}</p>
          </div>

          <p className="max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">
            {project.oneLiner}
          </p>

          <dl className="mt-1 grid grid-cols-3 gap-3 border-t-2 border-dashed border-line pt-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="label-type text-[0.58rem] text-muted">{m.label}</dt>
                <dd className="num mt-1 text-[1.05rem] font-bold">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
            {project.stack.slice(0, 5).map((t) => (
              <li
                key={t}
                className="label-type border-[1.5px] border-line-strong px-2 py-0.5 text-[0.6rem]"
              >
                {t}
              </li>
            ))}
          </ul>

          <Link
            to={`/work/${project.slug}`}
            className="label-type mt-1 inline-flex w-fit items-center gap-2 border-b-2 border-line-strong pb-0.5 text-[0.78rem] transition-colors hover:border-pink hover:text-pink"
          >
            Read the case study
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
