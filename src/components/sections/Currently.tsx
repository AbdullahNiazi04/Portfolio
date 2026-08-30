import { Container } from '../Container';
import { Marquee } from '../Marquee';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '@/lib/motion';
import { currently } from '@/data/content';

/**
 * The dark band. Second and final use of the selection marquee — it stops
 * reading as a signature the moment it appears a third time.
 */
export function Currently() {
  return (
    <section
      id="currently"
      aria-labelledby="currently-heading"
      className="bg-ink py-16 text-paper sm:py-20"
    >
      <Container>
        <Reveal>
          <SectionHeading id="currently-heading">Currently</SectionHeading>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Marquee onDark>
              <p className="max-w-[38ch] text-[0.98rem] leading-relaxed">{currently.body}</p>
            </Marquee>

            {currently.course ? (
              <p className="label-type mt-8 text-[0.78rem]">
                {currently.course.title} — {currently.course.provider} ·{' '}
                {currently.course.status}
              </p>
            ) : (
              /* TODO(abdullah): supply course provider, exact title and status.
                 Rendered as a visible placeholder rather than silently omitted,
                 and deliberately not styled as a credential badge. */
              <p className="label-type mt-8 border-2 border-dashed border-paper/40 px-4 py-3 text-[0.68rem] text-paper/70">
                TODO — course title, provider and status
              </p>
            )}
          </Reveal>

          <Reveal delay={0.06}>
            <p className="max-w-[46ch] leading-relaxed text-paper/80">
              {currently.direction}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
