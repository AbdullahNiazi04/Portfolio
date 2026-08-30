import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not scroll on navigation. Sends the viewport to the hash
 * target when there is one, and to the top otherwise.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior, block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior });
  }, [pathname, hash]);

  return null;
}
