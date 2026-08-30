import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ThemeContext,
  type ResolvedTheme,
  type ThemeChoice,
  type ThemeContextValue,
} from './theme-context';

const STORAGE_KEY = 'theme';

/** Storage can throw outright in private mode or with site data blocked. */
function readStoredChoice(): ThemeChoice {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch {
    /* unavailable — fall back to following the system */
  }
  return 'system';
}

function writeStoredChoice(choice: ThemeChoice): void {
  try {
    if (choice === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* the theme still applies for this session; it just will not persist */
  }
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(readStoredChoice);
  const [systemDark, setSystemDark] = useState<boolean>(systemPrefersDark);

  // Track the OS preference so `system` stays live rather than snapshotting
  // whatever it was at mount.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved: ResolvedTheme =
    choice === 'system' ? (systemDark ? 'dark' : 'light') : choice;

  // `system` deliberately writes no attribute, leaving the CSS media query in
  // charge. That is what keeps all three states genuinely distinct.
  useEffect(() => {
    const root = document.documentElement;
    if (choice === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', choice);
  }, [choice]);

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next);
    writeStoredChoice(next);
  }, []);

  const toggle = useCallback(() => {
    setChoiceState((prev) => {
      const current: ResolvedTheme =
        prev === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : prev;
      const next: ThemeChoice = current === 'dark' ? 'light' : 'dark';
      writeStoredChoice(next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ choice, resolved, setChoice, toggle }),
    [choice, resolved, setChoice, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
