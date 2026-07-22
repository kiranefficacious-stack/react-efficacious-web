import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTABandProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaTo?: string;
  variant?: 'primary' | 'dark';
}

export default function CTABand({
  headline = 'Ready to speed up your billing?',
  subtext = 'Join 100+ restaurants already running smarter with e-Smart Restaurant.',
  ctaLabel = 'Book a Free Demo',
  ctaTo = '/contact',
  variant = 'primary',
}: CTABandProps) {
  const isPrimary = variant === 'primary';

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isPrimary
          ? 'bg-primary'
          : 'bg-charcoal'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora">
          {headline}
        </h2>
        {subtext && (
          <p className={`text-lg mb-10 ${isPrimary ? 'text-orange-100' : 'text-gray-300'}`}>
            {subtext}
          </p>
        )}
        <Link
          to={ctaTo}
          className={`inline-flex items-center gap-2 px-8 py-4 font-bold text-lg rounded-xl transition-all shadow-xl ${
            isPrimary
              ? 'bg-white text-primary hover:bg-orange-50'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {ctaLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
