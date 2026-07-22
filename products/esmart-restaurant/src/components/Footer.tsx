import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Billing & POS', to: '/product/billing-pos' },
    { label: 'Inventory Management', to: '/product/inventory' },
    { label: 'Online Ordering', to: '/product/online-ordering' },
    { label: 'Reports & Analytics', to: '/product/reports' },
    { label: 'Menu Management', to: '/product/menu' },
  ],
  Solutions: [
    { label: 'Fine Dine', to: '/solutions/fine-dine' },
    { label: 'Quick Service (QSR)', to: '/solutions/qsr' },
    { label: 'Cafés', to: '/solutions/cafes' },
    { label: 'Cloud Kitchens', to: '/solutions/cloud-kitchens' },
    { label: 'Bars & Breweries', to: '/solutions/bars' },
    { label: 'Multi-Outlet Chains', to: '/solutions/multi-outlet' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/about#careers' },
    { label: 'Partner Program', to: '/about#partners' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

const SOCIAL = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <Logo className="h-10 sm:h-12" lightText={true} />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-sm">
              Cloud-based billing & POS software for restaurants, cafés, cloud kitchens, and multi-outlet chains across India.
            </p>
            <div className="flex gap-3 mb-8">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Download App badges */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Download the App</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://apps.apple.com/co/app/e-smart-restaurant/id6762969059?l=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl transition-colors"
                >
                  <span className="text-xl leading-none">🍎</span>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-none mb-0.5 whitespace-nowrap">Download on the</p>
                    <p className="text-sm font-bold text-white leading-none whitespace-nowrap">App Store</p>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.efficacious.new_esmartrestaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl transition-colors"
                >
                  <span className="text-xl leading-none">▶</span>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-none mb-0.5 whitespace-nowrap">Get it on</p>
                    <p className="text-sm font-bold text-white leading-none whitespace-nowrap">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-5 font-sora text-sm tracking-wide uppercase">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <span className="text-gray-300 font-medium">Sales:</span>{' '}
              <a href="tel:+918454943806" className="hover:text-white transition-colors">+91 84549 43806</a>
            </div>
            <div>
              <span className="text-gray-300 font-medium">Support:</span>{' '}
              <a href="mailto:info@efficacious.co.in" className="hover:text-white transition-colors">info@efficacious.co.in</a>
            </div>
            <div>
              Sushma Niwas, Road No. 6, Sector-1, New Panvel, Navi Mumbai — 410206
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Efficacious India Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

        {/* Cross-sell */}
        <div className="mt-6 text-center text-xs text-gray-600">
          More from Efficacious India:{' '}
          <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors mx-2">e-Smart Health</a>
          ·
          <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors mx-2">School App</a>
        </div>
      </div>
    </footer>
  );
}
