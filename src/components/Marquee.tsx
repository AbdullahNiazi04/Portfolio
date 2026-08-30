import type { ReactNode } from 'react';

/**
 * The signature device: a dashed selection rectangle with four handles, one of
 * which sits off its corner in an accent colour.
 *
 * Used exactly twice on the site (hero name, and the Currently band). It stops
 * reading as a deliberate motif the moment it appears a third time.
 */
export function Marquee({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-block border-2 border-dashed border-line-strong px-4 py-2 sm:px-6 sm:py-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[5px] -left-[5px] size-[9px] bg-ink"
      />
      <span
        aria-hidden="true"
        className="absolute -top-[5px] -right-[5px] size-[9px] bg-ink"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-[5px] -left-[5px] size-[9px] bg-ink"
      />
      {/* the off-centre handle */}
      <span
        aria-hidden="true"
        className="absolute -right-[5px] -bottom-[5px] size-[9px] translate-x-[7px] translate-y-[7px] bg-pink"
      />
      {children}
    </div>
  );
}
