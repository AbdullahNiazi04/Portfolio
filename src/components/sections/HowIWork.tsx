import { Section } from '../Section';
import { RevealItem, RevealList } from '@/lib/motion';
import { principles } from '@/data/content';

const STRIPES = [
  'border-l-blue',
  'border-l-yellow',
  'border-l-pink',
  'border-l-mint',
  'border-l-blue',
];

export function HowIWork() {
  return (
    <Section
      id="how-i-work"
      heading="How I work"
      intro="Each of these came out of a specific decision in one of the projects below, not a blog post."
    >
      <RevealList className="border-t-2 border-dashed border-line">
        {principles.map((p, i) => (
          <RevealItem
            key={p.title}
            className={`border-b-2 border-dashed border-line border-l-4 py-7 pr-2 pl-5 ${
              STRIPES[i % STRIPES.length]
            }`}
          >
            <h3 className="label-type text-[0.95rem] font-bold">
              <span className="num mr-2.5 text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              {p.title}
            </h3>
            <p className="mt-2.5 max-w-[62ch] leading-relaxed text-muted">{p.body}</p>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
