import React, { useState, useEffect, useRef } from 'react';
import { FileText, Clock, Mail } from 'lucide-react';

function FadeIn({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  key?: string | number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function TermsOfService() {
  return (
    <div className="bg-warm min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
        {/* Header */}
        <FadeIn className="border-b border-gray-100 pb-8 mb-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-primary flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal font-sora">Terms of Service</h1>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Last Updated: July 9, 2026
          </p>
        </FadeIn>

        {/* Content */}
        <FadeIn className="prose prose-orange max-w-none text-gray-600 space-y-6 leading-relaxed">
          <p>
            Welcome to e-Smart Restaurant. These Terms of Service ("Terms") govern your use of our billing software, mobile applications, cloud dashboard systems, and technical onboarding support (the "Service"). By activating or using our Service, you agree to these Terms.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">1. License & Permitted Use</h2>
          <p>
            Subject to payment of the applicable subscription fees, e-Smart Restaurant grants you a non-exclusive, non-transferable, revocable license to install and run the billing system on your terminals and hardware. You agree not to copy, reverse-engineer, modify, or resell the source code of the POS client or sync protocols.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">2. Account Registration and Staff Access</h2>
          <p>
            You must provide accurate company credentials when creating your admin profile. You are fully responsible for all transactions, voids, and discounts processed under your account. We strongly recommend configuring role-based permissions to prevent unauthorised voids or discounts by floor staff.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">3. Subscription, Payments, and Margins</h2>
          <p>
            e-Smart Restaurant operates on a flat-rate subscription model. Unlike legacy aggregators, we do not charge commissions on transaction volumes or orders. Subscriptions are billed annually. If your subscription expires, core offline billing functionality will persist for up to 7 consecutive days, but cloud sync and real-time dashboard analytics will be paused until renewal.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">4. Operational SLAs & Liability</h2>
          <p>
            While e-Smart Restaurant is built with robust offline local capabilities to ensure your counter never stops billing, we are not liable for business revenue losses arising from internet service provider drops, printer physical failures, or incorrect manual pricing inputs.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">5. Customer Support & Updates</h2>
          <p>
            Active subscriptions include access to our 24/7 dedicated support desk. Regular system enhancements, security patches, and updated GST tax filing exports will be deployed automatically to your terminal without additional charge.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">6. Contact Support</h2>
          <p>
            For questions about subscription renewals, invoice structures, or terms clarifications, please contact our accounts team:
          </p>
          <div className="bg-warm rounded-2xl p-6 border border-gray-100 flex items-start gap-4 mt-4">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-charcoal text-sm">e-Smart Billing and Accounts Team</p>
              <p className="text-sm text-gray-500 mt-1">Email: support@e-smart-restaurant.com</p>
              <p className="text-sm text-gray-500">Address: 4th Floor, Tech Hub, Senapati Bapat Road, Pune, Maharashtra 411016</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
