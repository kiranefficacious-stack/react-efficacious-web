import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTABand from '../components/CTABand';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  tag?: string;
}

const PLACEHOLDER_FAQS = [
  { q: 'When will this page be fully available?', a: 'This section is coming soon. In the meantime, book a demo and our team can walk you through all the capabilities.' },
  { q: 'Can I see a live demonstration?', a: 'Absolutely — book a free demo and we will cover all the features relevant to your restaurant type in detail.' },
];

export default function PlaceholderPage({ title, subtitle, tag = 'Coming Soon' }: PlaceholderPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-warm">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
          {tag}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 font-sora">{title}</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">{subtitle}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-orange-200"
        >
          Book a Free Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Placeholder content illustration */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-dashed border-orange-200 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
          </div>
          <p className="text-gray-400 text-sm">Full page content is being built. Check back soon, or speak to our team for a live walkthrough.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-charcoal mb-6 font-sora text-center">Have questions?</h2>
          <div className="space-y-3">
            {PLACEHOLDER_FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-charcoal text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                  <p className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Want to see the full picture?"
        subtext="Our team will walk you through every feature relevant to your restaurant type."
        ctaLabel="Book a Free Demo"
        ctaTo="/contact"
        variant="primary"
      />
    </main>
  );
}
