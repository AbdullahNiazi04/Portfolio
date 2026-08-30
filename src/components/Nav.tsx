import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mark } from './Mark';
import { ThemeToggle } from './ThemeToggle';
import { navItems, person } from '@/lib/site';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Left accent stripe cycles through the palette, one colour per link. */
const STRIPES = ['--blue', '--yellow', '--pink', '--mint'] as const;

function NavLinks({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <ul className="flex flex-col gap-1">
      {navItems.map((item, i) => (
        <li key={item.hash}>
          <Link
            to={{ pathname: '/', hash: `#${item.hash}` }}
            onClick={onNavigate}
            className="label-type block border-l-[3px] border-transparent px-3 py-2.5 text-[0.82rem] transition-colors hover:border-l-[3px] hover:bg-paper-deep"
            style={{ ['--stripe' as string]: `var(${STRIPES[i % STRIPES.length]})` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderLeftColor = 'var(--stripe)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderLeftColor = 'transparent';
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Logo({ onClick }: { onClick?: (() => void) | undefined }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5">
      <Mark size={26} />
      {/* Space Grotesk, not Silkscreen: the reference set the pixel face at
          ~15px here, well under its legibility floor. */}
      <span className="label-type text-[0.9rem] font-bold tracking-[0.06em]">
        AKN
      </span>
      <span className="sr-only">{person.name} — home</span>
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const location = useLocation();

  // Close on any route or hash change, including a browser Back press while the
  // drawer is open. Adjusted during render rather than in an effect so the
  // drawer never paints for a frame on the new route.
  const [lastKey, setLastKey] = useState(location.key);
  if (location.key !== lastKey) {
    setLastKey(location.key);
    setOpen(false);
  }

  // Focus trap, Esc-to-close, scroll lock, and focus restoration.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items.at(0);
      const last = items.at(-1);
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <nav aria-label="Primary">
      {/* ---------------- desktop left rail ---------------- */}
      <div className="fixed top-0 left-0 z-40 hidden h-[100dvh] w-60 flex-col justify-between border-r-2 border-dashed border-line-strong bg-paper px-6 py-7 lg:flex">
        <div className="flex flex-col gap-6">
          <Logo />
          <div className="mt-8">
            <NavLinks />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ThemeToggle className="self-start" />
          <p className="label-type text-[0.62rem] text-muted">
            {person.location}
          </p>
        </div>
      </div>

      {/* ---------------- mobile top bar ---------------- */}
      <div className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b-2 border-dashed border-line-strong bg-paper px-4 py-3 lg:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="label-type flex size-10 items-center justify-center border-[1.5px] border-line-strong"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {open ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ---------------- mobile drawer ---------------- */}
      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-paper px-6 pt-6 pb-10 lg:hidden"
      >
        <div className="flex items-center justify-between">
          <Logo onClick={() => setOpen(false)} />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex size-10 items-center justify-center border-[1.5px] border-line-strong"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-10 text-lg">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t-2 border-dashed border-line pt-6">
          <a
            href={`mailto:${person.email}`}
            className="label-type text-[0.78rem] break-all"
          >
            {person.email}
          </a>
          <p className="label-type text-[0.62rem] text-muted">
            {person.location}
          </p>
        </div>
      </div>
    </nav>
  );
}
