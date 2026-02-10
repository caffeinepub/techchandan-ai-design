import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import OrderBookingPage from './pages/OrderBookingPage';
import SiteLayout from './components/layout/SiteLayout';

/**
 * ROUTER ARCHITECTURE - DUPLICATION PREVENTION:
 * 
 * This router uses a single root route that wraps ALL child routes with SiteLayout.
 * SiteLayout provides the header, footer, and main content area via <Outlet />.
 * 
 * CRITICAL: Each page component (HomePage, ServicesPage, etc.) should be a PURE page view.
 * - DO NOT wrap page components in SiteLayout directly
 * - DO NOT create duplicate route definitions for the same path
 * - The layout is applied ONCE at the root level only
 * 
 * REGRESSION CHECK:
 * To verify no duplication exists:
 * 1. Navigate to "/" in the browser
 * 2. Open DevTools and inspect the DOM
 * 3. Search for data-section="home-hero" (should find exactly 1 match)
 * 4. Search for data-section="home-features" (should find exactly 1 match)
 * 5. Search for data-section="home-services" (should find exactly 1 match)
 * 6. Search for data-section="home-cta" (should find exactly 1 match)
 * 7. Check console for any duplication warnings from SiteLayout
 * 
 * If any section appears more than once, the router composition has been broken.
 */

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: PortfolioPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order',
  component: OrderBookingPage,
});

const routeTree = rootRoute.addChildren([homeRoute, servicesRoute, portfolioRoute, contactRoute, orderRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
