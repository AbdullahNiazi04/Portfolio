import { Section } from '../Section';
import { RevealItem, RevealList } from '@/lib/motion';
import { stackGroups } from '@/data/content';

/** Accent square cycles through the palette, as on the reference's list items. */
const SQUARES = ['bg-blue', 'bg-yellow', 'bg-pink', 'bg-mint'];

export function StackSection() {
  return (
    <Section
      id="stack"
      heading="Stack"
      intro="Grouped, not ranked. Percentage bars and star ratings measure nothing."
    >
      <RevealList className="border-t-2 border-dashed border-line">
        {stackGroups.map((group, i) => (
          <RevealItem
            key={group.name}
            className="grid gap-3 border-b-2 border-dashed border-line py-6 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-6"
          >
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`size-2.5 shrink-0 ${SQUARES[i % SQUARES.length]}`}
              />
              <h3 className="label-type text-[0.8rem] font-bold">{group.name}</h3>
            </div>
            <div>
              <p className="text-[0.95rem] leading-[1.9]">{group.items.join(' · ')}</p>
              {group.familiar ? (
                <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                  <span className="label-type text-[0.6rem]">Familiar with</span>{' '}
                  {group.familiar.join(' · ')}
                </p>
              ) : null}
            </div>
          </RevealItem>
        ))}
      </RevealList>
    </Section>
  );
}
