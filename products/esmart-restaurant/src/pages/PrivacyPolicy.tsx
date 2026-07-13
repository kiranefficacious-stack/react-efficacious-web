import React, { useState, useEffect, useRef } from 'react';
import { Shield, Clock, Mail } from 'lucide-react';

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

export default function PrivacyPolicy() {
  return (
    <div className="bg-warm min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
        {/* Header */}
        <FadeIn className="border-b border-gray-100 pb-8 mb-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-primary flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal font-sora">Privacy Policy</h1>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Last Updated: July 9, 2026
          </p>
        </FadeIn>

        {/* Content */}
        <FadeIn className="prose prose-orange max-w-none text-gray-600 space-y-6 leading-relaxed">
          <p>
            At e-Smart Restaurant, we take your privacy and data security seriously. This Privacy Policy describes how we collect, use, process, and protect your information when you use our POS software, cloud dashboards, and related services (collectively, the "Service").
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">1. Information We Collect</h2>
          <p>
            We collect information that is necessary to provide, manage, and optimize our services for your restaurant operations. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Profile Information:</strong> Your name, email address, phone number, company name, and physical address.</li>
            <li><strong>Restaurant Data:</strong> Menu items, pricing, floor plans, transactional history, sales reports, and receipt details.</li>
            <li><strong>Device Information:</strong> Hardware models, operating system versions, unique device identifiers, and local network setups for printer routing.</li>
          </ul>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">2. How We Use Your Information</h2>
          <p>
            Your restaurant data is strictly used for billing processing, synchronization between countertops, real-time analytics reports, and inventory management. Specifically, we use it to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sync tables, KOT updates, and bills between local registers and the cloud dashboard.</li>
            <li>Send digital e-receipts and SMS alerts to your customers upon your request.</li>
            <li>Diagnose printer routing errors and resolve critical billing interruptions.</li>
          </ul>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">3. Data Ownership and Security</h2>
          <p>
            <strong>Your restaurant data belongs to you.</strong> We do not sell, rent, or trade your operational data, menu configurations, or customer information to third parties. We utilize industry-standard TLS encryption for all synced data, secure backup systems, and strict access controls on our cloud infrastructure.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">4. Customer Data Handling</h2>
          <p>
            When processing digital invoices or loyalty points, our software stores basic customer details (such as phone numbers and names) that you input. You are responsible for ensuring that your collection of customer info complies with local regulatory rules.
          </p>

          <h2 className="text-xl font-bold text-charcoal font-sora pt-4">5. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or your data access rights, please contact our privacy compliance team:
          </p>
          <div className="bg-warm rounded-2xl p-6 border border-gray-100 flex items-start gap-4 mt-4">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-charcoal text-sm">e-Smart Privacy Compliance Office</p>
              <p className="text-sm text-gray-500 mt-1">Email: privacy@e-smart-restaurant.com</p>
              <p className="text-sm text-gray-500">Address: 4th Floor, Tech Hub, Senapati Bapat Road, Pune, Maharashtra 411016</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
