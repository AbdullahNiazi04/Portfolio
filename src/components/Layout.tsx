import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { ScrollManager } from './ScrollManager';

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="label-type sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:border-2 focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <ScrollManager />
      <Nav />

      {/*
        The rail offset lives on this wrapper, so it applies to the footer too.
        The reference put `margin-left: var(--nav-w)` inline on the footer,
        which pushed it off-screen once --nav-w became 100% at mobile.
      */}
      <div className="pt-16 lg:pt-0 lg:pl-60">
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
