import { useTheme } from '@/lib/theme-context';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolved, toggle } = useTheme();
  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className={`label-type inline-flex items-center gap-2 border-[1.5px] border-line-strong px-3 py-2 text-[0.68rem] transition-colors hover:bg-ink hover:text-paper ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {resolved === 'dark' ? (
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ) : (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </g>
        )}
      </svg>
      <span>{next}</span>
    </button>
  );
}
