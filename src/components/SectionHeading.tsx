import type { ReactNode } from 'react';

/**
 * Silkscreen is permitted here (h2) and on the hero name only, and never below
 * 20px — the `pixel` utility enforces the floor.
 */
export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="pixel max-w-[18ch] text-[clamp(1.4rem,4vw,2.6rem)] leading-[1.15]">
      {children}
    </h2>
  );
}
