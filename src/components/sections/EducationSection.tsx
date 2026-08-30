import { Section } from '../Section';
import { Reveal } from '@/lib/motion';
import { education } from '@/data/content';

export function EducationSection() {
  return (
    <Section id="education" heading="Education">
      <Reveal>
        <div className="border-l-4 border-l-mint py-1 pl-5">
          <h3 className="label-type text-[0.95rem] font-bold">{education.institution}</h3>
          <p className="mt-1.5 text-[0.95rem]">{education.degree}</p>
          <p className="num mt-1 text-[0.72rem] text-muted">{education.period}</p>
          <p className="label-type mt-0.5 text-[0.6rem] text-muted">{education.location}</p>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="label-type mt-9 text-[0.6rem] text-muted">Activities</p>
        <ul className="mt-3 space-y-2.5">
          {education.activities.map((a) => (
            <li key={a} className="flex gap-3 text-[0.92rem] text-muted">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-blue" />
              <span className="max-w-[58ch]">{a}</span>
            </li>
          ))}
        </ul>

        {/* The generative AI course moves here from Currently on completion,
            with a date. While in progress it is learning, not a credential. */}
        <p className="label-type mt-8 border-2 border-dashed border-line px-4 py-3 text-[0.65rem] text-muted">
          TODO — Generative AI (Cohort 3), Pak Angels &amp; HEC: listed here on completion,
          with the date
        </p>
      </Reveal>
    </Section>
  );
}
