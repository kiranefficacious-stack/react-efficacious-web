import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube,
  ArrowUpRight, GraduationCap, Shield, BookOpen,
  ChevronRight
} from 'lucide-react';

const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About Us',     href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Why Us',       href: '#benefits' },
  { label: 'Modules',      href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },

  { label: 'Contact',      href: '#contact' },
];

const solutions = [
  { label: 'Attendance & Tracking',    href: '#features' },
  { label: 'Fee Management',           href: '#features' },
  { label: 'Timetable & Scheduling',   href: '#features' },
  { label: 'Parent Mobile App',        href: '#features' },
  { label: 'Library Management',       href: '#features' },
  { label: 'Examination & Results',    href: '#features' },
  { label: 'Transport & Bus Tracking', href: '#features' },
];

const socials = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Twitter,   href: '#', label: 'Twitter / X' },
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { icon: Youtube,   href: '#', label: 'YouTube'   },
];

function scrollTo(href: string) {
  const id = href.replace('#', '');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  return (
    <footer className="bg-slate-950 overflow-hidden">

      {/* ── CTA Band ── */}
      <div className="border-t border-slate-800 bg-gradient-to-r from-primary-700 via-primary-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">
                Ready to transform your school?
              </h3>
              <p className="text-primary-100 text-sm">
                Join hundreds of institutions already using eSMARTs across India.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="https://apps.apple.com/in/app/e-smart-school/id6448924052"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm"
              >
                <img src="/esmart-school/apple-icon.svg" className="w-5 h-5 invert" alt="Apple" />
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=net.esmarts.app.esmart&hl=en_IN"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm"
              >
                <img src="/esmart-school/google-play-icon.svg" className="w-4 h-4" alt="Google Play" />
                Google Play
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                Book a Demo <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <img src="/esmart-school/logo-dark.svg" alt="eSMARTs" className="h-12 w-auto mb-3" />
            <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-4">
              By Efficacious India Limited
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Pioneering Education Management &amp; Student Security Systems — protecting and caring for the next generation with smarter technology.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Shield,      label: 'ISO Certified'   },
                { icon: GraduationCap, label: '500+ Schools'  },
                { icon: BookOpen,    label: 'CBSE Compatible' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded-full">
                  <Icon className="w-3 h-3 text-primary-400" />
                  {label}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary-600 border border-slate-700 hover:border-primary-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={e => { e.preventDefault(); scrollTo(href); }}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {solutions.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={e => { e.preventDefault(); scrollTo(href); }}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Get In Touch
            </h4>
            <address className="not-italic space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ground Floor, Plot No. 7, Sushma Niwas,<br />
                  Road No. 6, Sector-1, New Panvel,<br />
                  Raigad, Maharashtra — 410206.
                </p>
              </div>

              <a
                href="tel:+918454943806"
                className="flex gap-3 items-center group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-primary-500 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-primary-400 transition-colors">
                  +91 8454943806
                </span>
              </a>

              <a
                href="mailto:info@efficacious.co.in"
                className="flex gap-3 items-center group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-primary-500 flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-primary-400 transition-colors">
                  info@efficacious.co.in
                </span>
              </a>
            </address>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Efficacious India Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
