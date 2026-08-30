import type { ReactNode } from 'react';

/**
 * Centred, symmetric container. Replaces the reference's
 * `margin-left: 5.5vw; margin-right: auto`, which was asymmetric and made the
 * gutter unpredictable across viewports.
 */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-site px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
