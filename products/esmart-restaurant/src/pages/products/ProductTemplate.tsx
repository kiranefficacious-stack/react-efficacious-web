import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CTABand from '../../components/CTABand';

/* ── Scroll-reveal animation ─────────────────────────── */
export function FadeIn({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string; key?: string | number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── Types ───────────────────────────────────────────── */
export interface Stat { value: string; label: string; }
export interface Feature { icon: LucideIcon; title: string; desc: string; }
export interface Step { num: string; title: string; desc: string; }
export interface Segment { icon: LucideIcon; type: string; desc: string; }
export interface Faq { q: string; a: string; }

export interface ProductPageConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  illustration: React.ReactNode;
  stats: Stat[];
  features: Feature[];
  steps: Step[];
  spotlightHeadline: string;
  spotlightDesc: string;
  spotlightBullets: string[];
  spotlightVisual: React.ReactNode;
  segments: Segment[];
  faqs: Faq[];
  ctaHeadline: string;
  ctaSubtext?: string;
}

/* ── Shared Screen Wrapper SVG ───────────────────────── */
export function ScreenFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 pointer-events-none" />
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full drop-shadow-2xl">
        <rect x="8" y="8" width="464" height="298" rx="16" fill="#1A1A2E" />
        <rect x="8" y="8" width="464" height="298" rx="16" stroke="#FF6B35" strokeWidth="1.5" strokeOpacity="0.35" />
        <rect x="22" y="22" width="436" height="272" rx="10" fill="#0A0A1A" />
        {children}
      </svg>
    </div>
  );
}

/* ── Phone Frame Wrapper ─────────────────────────────── */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 pointer-events-none" />
      <svg viewBox="0 0 240 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full drop-shadow-2xl">
        <rect x="6" y="6" width="228" height="428" rx="30" fill="#1A1A2E" />
        <rect x="6" y="6" width="228" height="428" rx="30" stroke="#FF6B35" strokeWidth="1.5" strokeOpacity="0.3" />
        {/* Notch */}
        <rect x="85" y="14" width="70" height="18" rx="9" fill="#0A0A1A" />
        {/* Screen */}
        <rect x="16" y="36" width="208" height="376" rx="4" fill="#0F0F2A" />
        {children}
        {/* Home bar */}
        <rect x="95" y="424" width="50" height="4" rx="2" fill="#444" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function ProductTemplate({ config }: { config: ProductPageConfig }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="bg-warm">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative min-h-screen lg:h-screen lg:min-h-0 lg:py-0 flex items-center overflow-hidden bg-warm">
        {/* Background decoration elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Radial dot-matrix background */}
          <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: 'radial-gradient(#FF6B35 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Colorful gradient blurs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[43%_57%] gap-12 lg:gap-8 items-center w-full">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
                e-Smart · {config.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.1rem] font-bold text-charcoal leading-[1.12] mb-6 font-sora">
                {config.title}{' '}
                <span className="text-gradient">{config.titleAccent}</span>
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {config.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-orange-200"
                >
                  Get a Free Demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-charcoal font-medium rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all bg-white"
                >
                  Contact Sales
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 justify-center lg:justify-start">
                {[
                  'No long-term contract',
                  'Free onboarding',
                  'Live in under a day',
                ].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-secondary" /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full flex justify-center lg:justify-end lg:pl-4">
              {config.illustration}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────── */}
      <section className="border-y border-gray-200 bg-white py-10">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 divide-x divide-gray-100 gap-0">
          {config.stats.map(({ value, label }) => (
            <div key={label} className="text-center px-6">
              <div className="text-3xl sm:text-4xl font-bold text-primary font-sora mb-1">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">Everything you need</h2>
          <p className="text-gray-500 text-lg">Powerful capabilities built for the pace of a real restaurant.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.features.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn
              key={title}
              delay={i * 60}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-charcoal mb-2 text-lg font-sora">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">How it works</h2>
            <p className="text-gray-500 text-lg">Simple steps. Immediate impact.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-orange-100" />
            {config.steps.map(({ num, title, desc }, i) => (
              <FadeIn key={num} delay={i * 100}>
                <div className="relative bg-warm rounded-2xl p-6 text-center border border-gray-100 z-10">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold font-sora text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200 border-4 border-white">
                    {num}
                  </div>
                  <h4 className="font-bold text-charcoal mb-2 font-sora text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEEP-DIVE SPOTLIGHT ───────────────────── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora leading-tight">
              {config.spotlightHeadline}
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">{config.spotlightDesc}</p>
            <ul className="space-y-3 mb-8">
              {config.spotlightBullets.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-orange-200"
            >
              See it in action <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
          <FadeIn delay={150}>
            {config.spotlightVisual}
          </FadeIn>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────── */}
      <section className="bg-charcoal py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-sora">
              Built for every restaurant type
            </h2>
            <p className="text-gray-400">Whether you run a 5-table café or a 50-outlet chain, it works for you.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {config.segments.map(({ icon: Icon, type, desc }, i) => (
              <FadeIn key={type} delay={i * 80}>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white mb-2 font-sora">{type}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-3 font-sora">Common questions</h2>
            <p className="text-gray-500">Everything you need to know about this module.</p>
          </FadeIn>
          <div className="space-y-3">
            {config.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  aria-expanded={activeFaq === i}
                >
                  <span className="font-semibold text-charcoal text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: activeFaq === i ? '300px' : '0' }}
                >
                  <p className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline={config.ctaHeadline}
        subtext={config.ctaSubtext}
        ctaLabel="Book a Free Demo"
        ctaTo="/contact"
      />
    </main>
  );
}
