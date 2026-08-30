import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import { Seo } from '@/components/Seo';

export function NotFound() {
  return (
    <>
      <Seo
        title="404 — Page not found"
        description="That route does not exist on this site."
        path="/404"
      />
      <section aria-labelledby="nf-heading" className="py-24">
        <Container>
          <p className="label-type num text-[0.72rem] text-muted">
            HTTP 404
          </p>
          <h1 id="nf-heading" className="pixel mt-4 text-[clamp(1.9rem,7vw,3.4rem)]">
            No route here
          </h1>
          <p className="mt-5 max-w-[44ch] text-muted">
            The path you asked for is not one this app defines. Nothing broke — it
            simply was never mapped.
          </p>
          <Link
            to="/"
            className="label-type mt-8 inline-flex border-2 border-ink bg-ink px-6 py-3.5 text-[0.8rem] text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Back home
          </Link>
        </Container>
      </section>
    </>
  );
}
