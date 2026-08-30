import { Section } from '../Section';
import { RevealItem, RevealList } from '@/lib/motion';
import { roles } from '@/data/content';

/** Left accent stripes cycle through the palette, as in the reference. */
const STRIPES = ['border-l-blue', 'border-l-yellow', 'border-l-pink', 'border-l-mint'];

export function Experience() {
  return (
    <Section
      id="experience"
      heading="Experience"
      intro="These four roles ran concurrently — an internship, a full-time build, an AI research placement and freelance work overlapping through 2025 and 2026."
    >
      <RevealList className="border-t-2 border-dashed border-line">
        {roles.map((role, i) => (
          <RevealItem
            key={`${role.org}-${role.title}`}
            className={`grid gap-2 border-b-2 border-dashed border-line border-l-4 py-7 pl-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6 ${
              STRIPES[i % STRIPES.length]
            }`}
          >
            <div>
              <h3 className="label-type text-[0.95rem] font-bold">{role.title}</h3>
              <p className="mt-1.5 text-[0.88rem]">{role.org}</p>
              <p className="num mt-1 text-[0.72rem] text-muted">{role.period}</p>
              <p className="label-type mt-0.5 text-[0.6rem] text-muted">{role.location}</p>
            </div>
            <p className="max-w-[62ch] text-[0.92rem] leading-relaxed text-muted">
              {role.body}
            </p>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
