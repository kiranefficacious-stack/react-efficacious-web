import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PlaceholderPage from './pages/PlaceholderPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
// Product pages
import BillingPOS from './pages/products/BillingPOS';
import Inventory from './pages/products/Inventory';
import OnlineOrdering from './pages/products/OnlineOrdering';
import Reports from './pages/products/Reports';
import MenuManagement from './pages/products/MenuManagement';
// Solution pages
import {
  FineDine, QSR, Cafe, CloudKitchens, Bars, Bakery, FoodCourts, MultiOutlet
} from './pages/solutions/SolutionPages';


/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Layout wrapper */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

/* ─── Placeholder route configs ─────────────────────── */
const PLACEHOLDER_ROUTES = [
  // Legal
  { path: '/refund',                    title: 'Refund Policy',                  subtitle: 'Our refund and cancellation policy for all plans.' },
];

export default function App() {
  return (
    <BrowserRouter basename="/products/esmart-restaurant/">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* ── Product Pages (fully built) ── */}
        <Route path="/product/billing-pos" element={<Layout><BillingPOS /></Layout>} />
        <Route path="/product/inventory" element={<Layout><Inventory /></Layout>} />
        <Route path="/product/online-ordering" element={<Layout><OnlineOrdering /></Layout>} />
        <Route path="/product/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/product/menu" element={<Layout><MenuManagement /></Layout>} />


        {/* ── Solution Pages (fully built) ── */}
        <Route path="/solutions/fine-dine" element={<Layout><FineDine /></Layout>} />
        <Route path="/solutions/qsr" element={<Layout><QSR /></Layout>} />
        <Route path="/solutions/cafes" element={<Layout><Cafe /></Layout>} />
        <Route path="/solutions/cloud-kitchens" element={<Layout><CloudKitchens /></Layout>} />
        <Route path="/solutions/bars" element={<Layout><Bars /></Layout>} />
        <Route path="/solutions/bakeries" element={<Layout><Bakery /></Layout>} />
        <Route path="/solutions/food-courts" element={<Layout><FoodCourts /></Layout>} />
        <Route path="/solutions/multi-outlet" element={<Layout><MultiOutlet /></Layout>} />



        {/* ── Legal Pages (fully built) ── */}
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />

        {/* All other placeholder routes */}
        {PLACEHOLDER_ROUTES.map(({ path, title, subtitle }) => (
          <React.Fragment key={path}>
            <Route
              path={path}
              element={
                <Layout>
                  <PlaceholderPage title={title} subtitle={subtitle} />
                </Layout>
              }
            />
          </React.Fragment>
        ))}

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <Layout>
              <PlaceholderPage
                title="Page not found"
                subtitle="The page you're looking for doesn't exist. Try navigating from the menu above."
                tag="404"
              />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
