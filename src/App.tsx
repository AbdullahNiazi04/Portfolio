import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';

// Route-level code splitting: the case studies are the heaviest pages and are
// not needed for the first paint of the landing page.
const PharmaErp = lazy(() => import('@/pages/work/PharmaErp'));
const FedGuard = lazy(() => import('@/pages/work/FedGuard'));
const HearingCare = lazy(() => import('@/pages/work/HearingCare'));

function RouteFallback() {
  return (
    <div className="px-5 py-24">
      <p className="label-type text-[0.72rem] text-muted">Loading…</p>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="work/pharma-erp"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PharmaErp />
            </Suspense>
          }
        />
        <Route
          path="work/fedguard"
          element={
            <Suspense fallback={<RouteFallback />}>
              <FedGuard />
            </Suspense>
          }
        />
        <Route
          path="work/hearing-care"
          element={
            <Suspense fallback={<RouteFallback />}>
              <HearingCare />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
