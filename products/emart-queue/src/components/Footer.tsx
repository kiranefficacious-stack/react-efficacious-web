import { useState } from 'react';
import logoColor from '../assets/logo-color.png';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Phone, Twitter, Linkedin, Github, Instagram, Facebook,
  ArrowRight, QrCode, CheckCircle2, AlertCircle
} from 'lucide-react';
import type { DevModalType } from './DeveloperModalContent';

export interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onDeveloperResourceClick?: (type: DevModalType, title: string) => void;
}

interface NavLinkItem {
  label: string;
  href: string;
}

const navLinks: Record<string, NavLinkItem[]> = {
  Product: [
    { label: 'How it Works',    href: '#workflow' },
    { label: 'Services',        href: '#services' },
    { label: 'Features',        href: '#features' },
    { label: 'App Preview',     href: '#app-preview' },
    { label: 'Why Us',          href: '#why-us' },
  ],
  Company: [
    { label: '← Main Website',  href: '/' },
    { label: 'About Us',        href: '#about' },
    { label: 'Contact',         href: '#contact' },
    { label: 'Partner with Us', href: '#contact' },
    { label: 'Careers',         href: '/careers' },
  ],
};

const socials = [
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/efficacious-india-limited-9aaa87287/' },
  { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/efficacioustech' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/esmart_efficacious' },
  { icon: Twitter,   label: 'Twitter',   href: '' },
].filter(s => s.href && s.href.trim() !== '' && s.href.trim() !== '#' && !s.href.startsWith('javascript:'));

export function Footer({ onPrivacyClick, onTermsClick, onDeveloperResourceClick }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden">

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-primary-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Main Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16 border-b border-slate-800">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Logo in Full Vibrant Colors */}
            <a 
              href="#" 
              title="Smart Queue - Main Screen" 
              className="w-fit inline-block cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (window.scrollY < 20) {
                  window.location.reload();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img 
                src={logoColor} 
                alt="Smart Queue" 
                className="h-12 w-auto hover:opacity-90 transition-opacity drop-shadow-sm" 
              />
            </a>

            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              The intelligent queue management and appointment booking platform — built for modern businesses and everyday users.
            </p>

            {/* Contact info */}
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@efficacious.co.in" className="hover:text-white transition-colors">info@efficacious.co.in</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-primary-400 flex-shrink-0" />
                <a 
                  href="https://maps.google.com/?q=New+Panvel,+Maharashtra,+India" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  New Panvel, Maharashtra, India
                </a>
              </li>
            </ul>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-600/20 border border-slate-700 hover:border-primary-500/50 flex items-center justify-center text-slate-400 hover:text-primary-400 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Nav Columns: Product (lg:col-span-2) and Company (lg:col-span-2) */}
          {Object.entries(navLinks).map(([heading, links], colIdx) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (colIdx + 1) * 0.08 }}
              className="lg:col-span-2"
            >
              <h3 className="text-xs font-extrabold text-white uppercase tracking-widest mb-5">{heading}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleSectionScroll(e, link.href)}
                      className="text-sm text-slate-400 hover:text-white hover:translate-x-0.5 transition-all inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                        <ArrowRight size={10} className="text-primary-400" />
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-4"
          >
            <h3 className="text-xs font-extrabold text-white uppercase tracking-widest mb-5">Stay Updated</h3>
            <p className="text-sm mb-4 leading-relaxed text-slate-400">
              Get product updates, launch announcements, and queue management tips directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Thank you for subscribing! You'll receive our next product release notes.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary-500/60 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm text-white placeholder-slate-500 transition-all"
                  />
                  <button
                    type="submit"
                    id="footer-newsletter-submit"
                    className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold rounded-xl transition-colors flex-shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-primary-600/25"
                  >
                    Subscribe <ArrowRight size={14} />
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
                    <AlertCircle size={12} /> {newsletterError}
                  </p>
                )}
              </form>
            )}
            <p className="text-xs mt-2.5 text-slate-600">No spam, ever. Unsubscribe anytime.</p>

            {/* App download badges */}
            <div className="mt-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Download the App</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://apps.apple.com/ph/app/e-smart-queue/id6784201811"
                  id="footer-appstore-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                >
                  <span className="text-lg leading-none">🍎</span>
                  <div>
                    <p className="text-[9px] text-slate-500 leading-none">Download on the</p>
                    <p className="text-xs font-bold text-white leading-tight">App Store</p>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.efficacious.esmartqueue"
                  id="footer-playstore-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                >
                  <span className="text-lg leading-none">▶</span>
                  <div>
                    <p className="text-[9px] text-slate-500 leading-none">Get it on</p>
                    <p className="text-xs font-bold text-white leading-tight">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-slate-600 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} E-Smart Queue Technologies. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium order-1 sm:order-2">
            <button
              id="footer-privacy-policy-btn"
              onClick={onPrivacyClick}
              className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              id="footer-terms-btn"
              onClick={onTermsClick}
              className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">·</span>
            <button
              id="footer-cookie-btn"
              onClick={() => onDeveloperResourceClick?.('cookie', 'Cookie Policy')}
              className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
