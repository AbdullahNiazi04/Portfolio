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
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  /** On the inverted band the handles must flip, or they vanish into it. */
  onDark?: boolean;
}) {
  const border = onDark ? 'border-paper/50' : 'border-line-strong';
  const handle = onDark ? 'bg-paper' : 'bg-ink';

  return (
    <div
      className={`relative inline-block border-2 border-dashed px-4 py-2 sm:px-6 sm:py-3 ${border} ${className}`}
    >
      <span aria-hidden="true" className={`absolute -top-[5px] -left-[5px] size-[9px] ${handle}`} />
      <span aria-hidden="true" className={`absolute -top-[5px] -right-[5px] size-[9px] ${handle}`} />
      <span
        aria-hidden="true"
        className={`absolute -bottom-[5px] -left-[5px] size-[9px] ${handle}`}
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
