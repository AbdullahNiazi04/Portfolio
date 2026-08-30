import type { ReactNode } from 'react';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';
import { Reveal } from '@/lib/motion';

/**
 * Shared section shell: landmark, dashed top rule, heading, optional intro.
 * The dashed rule replaces the reference's solid `hr`, which is part of the
 * character worth keeping.
 */
export function Section({
  id,
  heading,
  intro,
  children,
  dark = false,
}: {
  id: string;
  heading: string;
  intro?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={
        dark
          ? 'bg-ink py-16 text-paper sm:py-20'
          : 'border-t-2 border-dashed border-line py-16 sm:py-20'
      }
    >
      <Container>
        <Reveal>
          <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
          {intro ? (
            <p
              className={`mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed ${
                dark ? 'text-paper/80' : 'text-muted'
              }`}
            >
              {intro}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
