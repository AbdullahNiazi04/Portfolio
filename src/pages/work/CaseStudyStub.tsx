import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import { Seo } from '@/components/Seo';

/** Placeholder until Phase 3. Structure is real; the content is not written yet. */
export function CaseStudyStub({
  title,
  subtitle,
  path,
}: {
  title: string;
  subtitle: string;
  path: string;
}) {
  return (
    <>
      <Seo title={`${title} — Abdullah Khan Niazi`} description={subtitle} path={path} />
      <article className="py-16 sm:py-24">
        <Container>
          <Link to="/#work" className="label-type text-[0.72rem] text-muted">
            ← Selected work
          </Link>
          <h1 className="pixel mt-6 text-[clamp(1.9rem,6vw,3.2rem)]">{title}</h1>
          <p className="mt-4 max-w-[52ch] text-muted">{subtitle}</p>
          <p className="mt-10 border-l-4 border-yellow bg-paper-deep p-5 text-muted">
            Case study copy lands in Phase 3.
          </p>
        </Container>
      </article>
    </>
  );
}
