import { Container } from './Container';
import { SectionHeading } from './SectionHeading';
import { alsoBuilt, type MinorProject } from '@/data/projects';

function Item({ project }: { project: MinorProject }) {
  return (
    <li className="border-[1.5px] border-line-strong p-5">
      <div className="flex items-baseline justify-between gap-3">
        {/* Space Grotesk, not Silkscreen — the footnote tier never uses the
            display face, and never at this size. */}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="label-type text-[0.95rem] underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            {project.title}
          </a>
        ) : (
          /* No repo link: plain text. A dead or '#' link is worse than none. */
          <span className="label-type text-[0.95rem]">{project.title}</span>
        )}
        <span className="num text-[0.72rem] text-muted">{project.year}</span>
      </div>

      <p className="mt-2.5 text-[0.9rem] leading-[1.55] text-muted">
        {project.blurb}
      </p>

      {project.detail ? (
        <p className="mt-2.5 border-l-2 border-line pl-3 text-[0.82rem] leading-[1.5] text-muted">
          {project.detail}
        </p>
      ) : null}

      <p className="label-type mt-3.5 text-[0.62rem] text-muted">
        {project.tech.join(' · ')}
      </p>
    </li>
  );
}

export function AlsoBuilt() {
  // Wired but invisible until populated: no heading, no dangling divider.
  if (alsoBuilt.length === 0) return null;

  return (
    <section
      id="also-built"
      aria-labelledby="also-built-heading"
      className="border-t-2 border-dashed border-line py-16"
    >
      <Container>
        <SectionHeading id="also-built-heading">Also built</SectionHeading>
        <p className="mt-3 max-w-[52ch] text-[0.9rem] text-muted">
          Smaller things, listed for completeness.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {alsoBuilt.map((p) => (
            <Item key={p.title} project={p} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
