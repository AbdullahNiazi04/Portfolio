import { Container } from '@/components/Container';
import { Marquee } from '@/components/Marquee';
import { SectionHeading } from '@/components/SectionHeading';
import { Seo } from '@/components/Seo';
import { AlsoBuilt } from '@/components/AlsoBuilt';
import { person, positioning } from '@/lib/site';

/**
 * Home section order per the brief, as amended by Addendum 2 §F. Only a subset
 * of these appear in the nav; this is the full page order.
 */
const SECTIONS = [
  { hash: 'work', label: 'Selected Work' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'currently', label: 'Currently' },
  { hash: 'stack', label: 'Stack' },
  { hash: 'how-i-work', label: 'How I Work' },
] as const;

const SECTIONS_AFTER = [
  { hash: 'about', label: 'About' },
  { hash: 'education', label: 'Education' },
  { hash: 'contact', label: 'Contact' },
] as const;

/** Phase 1 shell: hero is real, the remaining sections are anchored stubs. */
function SectionStub({ hash, label }: { hash: string; label: string }) {
  return (
    <section
      id={hash}
      aria-labelledby={`${hash}-heading`}
      className="border-t-2 border-dashed border-line py-16"
    >
      <Container>
        <SectionHeading id={`${hash}-heading`}>{label}</SectionHeading>
        <p className="mt-4 text-muted">Phase 2.</p>
      </Container>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo
        title={`${person.name} — Full-Stack Developer, AI / Edge ML`}
        description={positioning}
        path="/"
      />

      <section aria-labelledby="hero-heading" className="py-16 sm:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="label-type inline-block -rotate-[3deg] border-[1.5px] border-line-strong bg-yellow px-4 py-2 text-[0.7rem] text-on-accent [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
              Full-Stack
            </span>
            <span className="label-type inline-block rotate-[2deg] border-[1.5px] border-line-strong bg-blue px-4 py-2 text-[0.7rem] text-on-accent [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
              AI / Edge ML
            </span>
          </div>

          <Marquee>
            <h1
              id="hero-heading"
              className="pixel text-[clamp(1.9rem,7.5vw,4.2rem)] leading-[1.1]"
            >
              <span className="block">Abdullah</span>
              <span className="block">Khan Niazi</span>
            </h1>
          </Marquee>

          <p className="mt-10 max-w-[34ch] font-label text-[clamp(1.15rem,2.4vw,1.7rem)] leading-[1.35] font-semibold">
            Backend systems engineer who ships machine learning into{' '}
            <em className="bg-blue px-1 text-on-accent not-italic">
              places that resist it
            </em>
            .
          </p>

          <p className="mt-6 max-w-[46ch] text-muted">
            A 480-endpoint ERP running in production, and federated training across a
            Jetson Nano with 4 GB of shared memory.
          </p>
        </Container>
      </section>

      {SECTIONS.map((item) => (
        <SectionStub key={item.hash} hash={item.hash} label={item.label} />
      ))}

      <AlsoBuilt />

      {SECTIONS_AFTER.map((item) => (
        <SectionStub key={item.hash} hash={item.hash} label={item.label} />
      ))}
    </>
  );
}
