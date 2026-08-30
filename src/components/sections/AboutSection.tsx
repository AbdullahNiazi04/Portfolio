import { Section } from '../Section';
import { Reveal } from '@/lib/motion';
import { about } from '@/data/content';
import { person } from '@/lib/site';

export function AboutSection() {
  return (
    <Section id="about" heading="About">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.4fr]">
        <Reveal>
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
