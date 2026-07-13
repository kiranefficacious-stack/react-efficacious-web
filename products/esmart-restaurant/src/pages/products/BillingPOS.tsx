import React from 'react';
import {
  Receipt, Layers, Printer, UtensilsCrossed, Settings,
  Shield, Wifi, Monitor, Globe, Keyboard, QrCode, FileText,
  Store, Coffee, Truck,
} from 'lucide-react';
import ProductTemplate, { ScreenFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Full POS Screen ─────────────── */
function BillingIllustration() {
  return (
    <div className="relative w-full max-w-xl mx-auto flex justify-center">
      <img
        src="/esmart-restaurant/billing_pos_mockup.png"
        alt="e-Smart Billing & POS System"
        className="w-full h-auto object-contain drop-shadow-2xl lg:scale-110 transform transition-transform duration-300"
      />
    </div>
  );
}

/* ── Spotlight Visual: Offline Mode indicator ────────── */
function OfflineSpotlight() {
  return (
    <ScreenFrame>
      <image href="/esmart-restaurant/billing_pos_offline.png" x="22" y="22" width="436" height="272" />
    </ScreenFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'Billing & POS',
  title: 'Bill faster than your',
  titleAccent: 'busiest rush hour',
  subtitle:
    'A complete cloud-based billing and POS solution for restaurants. Works offline, handles GST automatically, routes kitchen tickets instantly, and goes live in under a day.',
  illustration: <BillingIllustration />,
  stats: [
    { value: '10,000+', label: 'Restaurants served' },
    { value: '1M+', label: 'Bills processed daily' },
    { value: '<30 sec', label: 'Average bill generation' },
  ],
  features: [
    { icon: Receipt, title: 'Branded Bill Templates', desc: 'Fully editable GST-compliant invoice templates with your logo, address, and a custom thank-you message.' },
    { icon: Layers, title: 'Multi-Counter Sync', desc: 'Run multiple billing terminals simultaneously — all synced in real-time to a single dashboard.' },
    { icon: Printer, title: 'Kitchen Ticket Routing', desc: 'Auto-route KOTs to the right station (grill, tandoor, bar) based on item categories.' },
    { icon: UtensilsCrossed, title: 'Table & Floor Management', desc: 'Interactive floor plan with live table status, cover counts, and waiter assignments at a glance.' },
    { icon: Settings, title: 'Tax & Discount Rules', desc: 'Configure GST slabs, CGST/SGST splits, happy-hour pricing, and combo discount rules effortlessly.' },
    { icon: Shield, title: 'Role-Based Access', desc: 'Restrict bill voids, discounts, and settlements to authorised staff only — eliminating billing fraud.' },
  ],
  steps: [
    { num: '1', title: 'Select table or counter', desc: 'Cashier or waiter picks the table or opens a new counter bill on any device.' },
    { num: '2', title: 'Add items to bill', desc: 'Browse menu by category, add items with modifiers, and set quantities in seconds.' },
    { num: '3', title: 'KOT fires to kitchen', desc: 'Kitchen Order Ticket routes instantly to the correct kitchen station or display.' },
    { num: '4', title: 'Settle & print', desc: 'Accept cash, card, UPI or split payments, print the GST invoice, and send an SMS receipt.' },
  ],
  spotlightHeadline: 'Works perfectly — even without internet',
  spotlightDesc:
    'Power cuts and connectivity issues are common in restaurants. e-Smart Billing runs fully offline so your business never stops. Every bill, KOT, and payment is stored locally and synced to the cloud the moment connectivity returns.',
  spotlightBullets: [
    'Full offline billing with receipt printing on local printers',
    'Kitchen tickets continue to fire to KDS even with no internet',
    'Automatic cloud sync the instant connection is restored',
    'No data loss — every transaction is encrypted and stored locally',
    'Hardware-agnostic: Windows PC, Android tablet, iPad — any device',
  ],
  spotlightVisual: <OfflineSpotlight />,
  segments: [
    { icon: Store, type: 'Fine Dining', desc: 'Table management, course-by-course KOT, branded invoices, and split-bill support.' },
    { icon: Coffee, type: 'Cafés & QSR', desc: 'Lightning-fast counter billing with touch-optimised UI for high-volume service.' },
    { icon: Truck, type: 'Cloud Kitchens', desc: 'Multi-brand billing from a single screen with per-brand financial separation.' },
  ],
  faqs: [
    { q: 'How long does it take to go live?', a: 'Most restaurants complete setup and training in under 24 hours. Our onboarding team handles menu upload, hardware pairing, and staff walkthrough.' },
    { q: 'Does it support GST split (CGST / SGST)?', a: 'Yes. You can configure any GST structure — 5%, 12%, 18%, or mixed slabs — and e-Smart will automatically split CGST/SGST on every invoice.' },
    { q: 'Can I use my existing printer and hardware?', a: 'Absolutely. e-Smart works with any ESC/POS thermal printer, any Windows PC, Android tablet, or iPad. No proprietary hardware required.' },
    { q: 'What happens to data if the internet goes down?', a: 'Billing, printing, and KOT operations continue offline without interruption. All data syncs securely to the cloud once connectivity is restored.' },
    { q: 'Can one cashier handle multiple tables simultaneously?', a: 'Yes. A single billing terminal can manage unlimited open tables or counters in parallel — switching between them with one tap.' },
  ],
  ctaHeadline: 'Ready to speed up every bill?',
  ctaSubtext: 'Join 10,000+ restaurants already billing smarter with e-Smart Restaurant.',
};

export default function BillingPOS() {
  return <ProductTemplate config={config} />;
}
