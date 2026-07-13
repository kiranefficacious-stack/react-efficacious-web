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
export interface SolutionStat { value: string; label: string; }
export interface SolutionFeature { icon: LucideIcon; title: string; desc: string; }
export interface ChallengeVsSolution { challenge: string; solution: string; }
export interface SolutionFaq { q: string; a: string; }

export interface SolutionPageConfig {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  illustration: React.ReactNode;
  stats: SolutionStat[];
  challenges: ChallengeVsSolution[];
  features: SolutionFeature[];
  spotlightHeadline: string;
  spotlightDesc: string;
  spotlightVisual: React.ReactNode;
  faqs: SolutionFaq[];
  ctaHeadline: string;
}

/* ── Screen Frame wrapper ────────────────────────────── */
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

export default function SolutionTemplate({ config }: { config: SolutionPageConfig }) {
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
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6 animate-pulse">
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
                  Book a Demo for My Outlet <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              {config.illustration}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────── */}
      <section className="border-y border-gray-200 bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 divide-x divide-gray-100 gap-0">
          {config.stats.map(({ value, label }) => (
            <div key={label} className="text-center px-4 sm:px-6">
              <div className="text-3xl sm:text-4xl font-bold text-primary font-sora mb-1">{value}</div>
              <div className="text-sm text-gray-500 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHALLENGES VS SOLUTIONS ───────────────── */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">
            Built for your specific challenges
          </h2>
          <p className="text-gray-500 text-lg">General POS systems fail to address outlet-specific friction. We solve them directly.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {config.challenges.map(({ challenge, solution }, i) => (
            <FadeIn key={i} delay={i * 80} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">The Challenge</div>
                <p className="text-charcoal font-semibold text-base mb-6 leading-relaxed font-sora">“{challenge}”</p>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Our Solution</div>
                <p className="text-gray-500 text-sm leading-relaxed">{solution}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CORE FEATURES ─────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">Tailored features</h2>
            <p className="text-gray-500 text-lg">Operational workflows customized for your counter style and kitchen capacity.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.features.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn
                key={title}
                delay={i * 60}
                className="bg-warm rounded-2xl p-7 border border-gray-100/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 text-lg font-sora">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT FEATURE ────────────────────── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6 font-sora leading-tight">
              {config.spotlightHeadline}
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              {config.spotlightDesc}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-orange-200"
            >
              Request a visual demo <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
          <div className="w-full">
            {config.spotlightVisual}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-3 font-sora">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find answers regarding deployment, setup, and hardware compatibility.</p>
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
        subtext="Tailored setups for high-performing kitchens."
        ctaLabel="Book a Free Demo"
        ctaTo="/contact"
      />
    </main>
  );
}
