import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import {
  Menu, X, ChevronDown, Smartphone,
  Receipt, Package, Globe, BarChart2, UtensilsCrossed, Heart,
  Wine, Coffee, ShoppingBag, Layers, Store, Utensils,
  BookOpen, FileText, HelpCircle, ArrowRight,
} from 'lucide-react';

/* ── Product items with icons + short desc ─────────── */
const PRODUCT_ITEMS = [
  {
    label: 'Billing & POS',
    to: '/product/billing-pos',
    icon: Receipt,
    desc: 'Fast billing, KOTs & GST invoices',
  },
  {
    label: 'Inventory Management',
    to: '/product/inventory',
    icon: Package,
    desc: 'Auto-deduct stock on every bill',
  },
  {
    label: 'Online Ordering',
    to: '/product/online-ordering',
    icon: Globe,
    desc: 'Zero-commission direct orders',
  },
  {
    label: 'Reports & Analytics',
    to: '/product/reports',
    icon: BarChart2,
    desc: 'Real-time dashboards & MIS',
  },
  {
    label: 'Menu Management',
    to: '/product/menu',
    icon: UtensilsCrossed,
    desc: 'Sync menus across all outlets',
  },
];

/* ── Solutions items with icons ────────────────────── */
const SOLUTION_ITEMS = [
  { label: 'Fine Dining', to: '/solutions/fine-dine', icon: Utensils },
  { label: 'Quick Service (QSR)', to: '/solutions/qsr', icon: ShoppingBag },
  { label: 'Cafés', to: '/solutions/cafes', icon: Coffee },
  { label: 'Cloud Kitchens', to: '/solutions/cloud-kitchens', icon: Layers },
  { label: 'Bars & Breweries', to: '/solutions/bars', icon: Wine },
  { label: 'Bakeries', to: '/solutions/bakeries', icon: Store },
  { label: 'Food Courts', to: '/solutions/food-courts', icon: UtensilsCrossed },
  { label: 'Multi-Outlet Chains', to: '/solutions/multi-outlet', icon: Layers },
];

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Product', children: PRODUCT_ITEMS, wide: true },
  { label: 'Solutions', children: SOLUTION_ITEMS },
  { label: 'About', to: '/about' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center -mt-6">
            <Logo className="h-10 sm:h-12" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      openDropdown === item.label
                        ? 'text-primary bg-orange-50'
                        : 'text-charcoal hover:text-primary hover:bg-orange-50'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180 text-primary' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* ── Product mega-dropdown ── */}
                  {item.label === 'Product' && (
                    <div
                      className={`absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/8 p-4 transition-all duration-150 ${
                        openDropdown === 'Product'
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      style={{ width: '560px' }}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {PRODUCT_ITEMS.map(({ label, to, icon: Icon, desc }) => (
                          <Link
                            key={to}
                            to={to}
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors duration-150"
                          >
                            <div className="w-9 h-9 rounded-lg bg-orange-100 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                              <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-charcoal group-hover:text-primary transition-colors leading-tight">
                                {label}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 leading-snug">{desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {/* Footer CTA */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">All features included in every plan</span>
                        <Link
                          to="/contact"
                          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                        >
                          Get a free demo <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* ── Solutions dropdown (simple) ── */}
                  {item.label === 'Solutions' && (
                    <div
                      className={`absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 transition-all duration-150 ${
                        openDropdown === 'Solutions'
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      style={{ minWidth: '220px' }}
                    >
                      {SOLUTION_ITEMS.map(({ label, to, icon: Icon }) => (
                        <Link
                          key={to}
                          to={to}
                          className="group flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.to
                      ? 'text-primary bg-orange-50'
                      : 'text-charcoal hover:text-primary hover:bg-orange-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://e-smartrestaurant.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-charcoal hover:text-primary transition-colors"
            >
              Login
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-orange-50 transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              Download App
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-sm shadow-orange-200"
            >
              Book a Free Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>
 
      {/* ── Mobile Menu ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden pt-20 overflow-y-auto`}
      >
        <div className="px-5 py-4 space-y-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between py-3 text-base font-semibold text-charcoal border-b border-gray-100"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="mt-1 mb-2 space-y-1">
                    {(item.children as { label: string; to: string; icon: React.ElementType; desc?: string }[]).map(
                      ({ label, to, icon: Icon, desc }) => (
                        <Link
                          key={to}
                          to={to}
                          className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-orange-50 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-charcoal group-hover:text-primary">{label}</div>
                            {desc && <div className="text-xs text-gray-400">{desc}</div>}
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className="block py-3 text-base font-semibold text-charcoal border-b border-gray-100 hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
          <div className="pt-6 space-y-3">
            <a
              href="https://e-smartrestaurant.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 text-center text-charcoal border border-gray-200 rounded-xl font-semibold text-base"
            >
              Login
            </a>
            <Link
              to="/contact"
              className="block w-full py-3 text-center text-primary border border-primary rounded-xl font-semibold text-base"
            >
              Download App
            </Link>
            <Link
              to="/contact"
              className="block w-full py-3 text-center bg-primary text-white rounded-xl font-semibold text-base"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
