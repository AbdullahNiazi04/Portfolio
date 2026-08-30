import { Section } from '../Section';
import { Reveal } from '@/lib/motion';
import { about } from '@/data/content';
import { person } from '@/lib/site';

function Portrait() {
  return (
    /* Rotation is within the ±2deg cap, and carries no text. Explicit
       width/height on the img so it reserves its box and cannot shift layout. */
    <div className="w-fit -rotate-[1.5deg] border-[2.5px] border-ink bg-paper-deep p-2">
      <picture>
        <source
          type="image/webp"
          srcSet="/img/abdullah-360.webp 1x, /img/abdullah-720.webp 2x"
        />
        <img
          src="/img/abdullah-360.jpg"
          width={360}
          height={450}
          loading="lazy"
          decoding="async"
          alt={person.name}
          className="block h-auto w-[220px] sm:w-[260px]"
        />
      </picture>
    </div>
  );
}

export function AboutSection() {
  return (
    <Section id="about" heading="About">
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-12">
        <Reveal className="flex flex-col gap-8">
          <Portrait />

          <dl className="space-y-4">
            <div>
              <dt className="label-type text-[0.6rem] text-muted">Based in</dt>
              <dd className="mt-1 text-[0.95rem]">{person.location}</dd>
            </div>
            <div>
              <dt className="label-type text-[0.6rem] text-muted">Graduating</dt>
              <dd className="num mt-1 text-[0.95rem]">July 2026</dd>
            </div>
            <div>
              <dt className="label-type text-[0.6rem] text-muted">Looking for</dt>
              <dd className="mt-1 text-[0.95rem]">Backend / AI platform</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-4">
            {about.map((para) => (
              <p key={para.slice(0, 32)} className="max-w-[62ch] leading-[1.75]">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
