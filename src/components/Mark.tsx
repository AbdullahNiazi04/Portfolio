/**
 * The bullseye mark, carried over from the reference's visual language: two
 * concentric rings with a filled dot sitting deliberately off centre.
 */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="20" cy="20" r="18" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
      <circle cx="20" cy="20" r="10" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
      <circle cx="25" cy="15" r="4" fill="var(--pink)" />
    </svg>
  );
}
