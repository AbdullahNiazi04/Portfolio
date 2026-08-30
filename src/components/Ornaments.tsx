import { wordmarks } from '@/data/content';

/** The wavy rule from the reference. Purely decorative. */
export function WavyDivider() {
  return (
    <svg
      className="block h-10 w-full"
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 T900,20 T1000,20"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * Replaces the reference's client-logo wall. Technology wordmarks, never
 * company names — there are no clients to claim.
 *
 * Uses the muted token rather than the reference's `opacity: 0.4`, which
 * failed AA on paper.
 */
export function Wordmarks() {
  return (
    <div className="mt-16 border-t-2 border-dashed border-line pt-8">
      <p className="label-type text-[0.62rem] text-muted">Built with</p>
      <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
        {wordmarks.map((w) => (
          <li key={w} className="label-type text-[0.95rem] text-muted">
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
