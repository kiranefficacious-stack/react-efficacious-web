import React from 'react';
import {
  Globe, CreditCard, Bell, QrCode, BarChart2, RefreshCw,
  Smartphone, Store, Truck, Coffee
} from 'lucide-react';
import ProductTemplate, { PhoneFrame, ScreenFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Mobile Ordering App ──────────── */
function OnlineOrderIllustration() {
  return (
    <PhoneFrame>
      {/* App header */}
      <rect x="16" y="44" width="208" height="40" fill="#1A1A2E" />
      <text x="120" y="58" fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">e-Smart Order</text>
      <text x="120" y="70" fill="#555577" fontSize="7" fontFamily="monospace" textAnchor="middle">The Spice Garden · New Panvel</text>

      {/* Category row */}
      {['Starters', 'Mains', 'Drinks', 'Dessert'].map((c, i) => (
        <g key={c}>
          <rect x={16 + i * 52} y={86} width={48} height={18} rx={5} fill={i === 1 ? '#FF6B35' : '#1e1e35'} />
          <text x={16 + i * 52 + 24} y={98} fill={i === 1 ? 'white' : '#8888aa'} fontSize="6.5" fontFamily="monospace" textAnchor="middle">{c}</text>
        </g>
      ))}

      {/* Menu items */}
      {[
        { name: 'Paneer Tikka', price: '₹240', tag: 'BESTSELLER' },
        { name: 'Dal Makhani', price: '₹180', tag: null },
        { name: 'Chicken Biryani', price: '₹320', tag: 'SPICY 🌶' },
      ].map(({ name, price, tag }, i) => (
        <g key={name}>
          <rect x="16" y={110 + i * 68} width="208" height="62" rx="8" fill="#0f0f2a" />
          <rect x="20" y={114 + i * 68} width="44" height="44" rx="6" fill="#1e1e35" />
          <circle cx="42" cy={136 + i * 68} r="14" fill={i === 0 ? '#FF6B3530' : i === 2 ? '#0F9D8C30' : '#A78BFA30'} />
          <text x="42" y={140 + i * 68} fontSize="12" textAnchor="middle" fill={i === 0 ? '#FF6B35' : i === 2 ? '#0F9D8C' : '#A78BFA'} fontFamily="monospace">
            {i === 0 ? '🧀' : i === 1 ? '🍛' : '🍗'}
          </text>
          <text x="72" y={126 + i * 68} fill="#ccccee" fontSize="8.5" fontFamily="monospace">{name}</text>
          {tag && <rect x="72" y={129 + i * 68} width={tag.length * 5 + 4} height="11" rx="3" fill="#FF6B3520" />}
          {tag && <text x="74" y={138 + i * 68} fill="#FF6B35" fontSize="6" fontFamily="monospace">{tag}</text>}
          <text x="72" y={152 + i * 68} fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace">{price}</text>
          <rect x="180" y={114 + i * 68} width="36" height="36" rx="8" fill="#FF6B35" />
          <text x="198" y={136 + i * 68} fill="white" fontSize="18" fontFamily="monospace" textAnchor="middle">+</text>
        </g>
      ))}

      {/* Cart bar */}
      <rect x="16" y="322" width="208" height="40" rx="10" fill="#FF6B35" />
      <text x="30" y="340" fill="white" fontSize="8" fontFamily="monospace">3 items</text>
      <text x="120" y="340" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VIEW CART</text>
      <text x="200" y="340" fill="white" fontSize="8" fontFamily="monospace" textAnchor="end">₹740</text>

      {/* Zero commission badge */}
      <rect x="60" y="370" width="120" height="24" rx="12" fill="#0F9D8C20" stroke="#0F9D8C" strokeWidth="1" />
      <text x="120" y="385" fill="#0F9D8C" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">0% Commission</text>
    </PhoneFrame>
  );
}

/* ── Spotlight Visual: Multi-platform ordering ───────── */
function IntegrationSpotlight() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Order Aggregator — All Sources, One Screen</text>
      {/* Order sources */}
      {[
        { source: 'Direct Website', orders: 12, revenue: '₹14,400', color: '#FF6B35', pct: 38 },
        { source: 'QR Table Order', orders: 8, revenue: '₹9,600', color: '#0F9D8C', pct: 27 },
        { source: 'Zomato', orders: 7, revenue: '₹6,800', color: '#E23744', pct: 23 },
        { source: 'Swiggy', orders: 4, revenue: '₹3,200', color: '#FC8019', pct: 12 },
      ].map(({ source, orders, revenue, color, pct }, i) => (
        <g key={source}>
          <rect x="36" y={68 + i * 48} width="408" height="38" rx="8" fill={i % 2 === 0 ? '#0f0f2a' : '#0a0a1a'} />
          <rect x="40" y={74 + i * 48} width="8" height="26" rx="2" fill={color} />
          <text x="58" y={87 + i * 48} fill="#ccccee" fontSize="9" fontFamily="monospace" fontWeight="bold">{source}</text>
          <text x="58" y={99 + i * 48} fill="#555577" fontSize="7.5" fontFamily="monospace">{orders} orders today</text>
          <text x="300" y={87 + i * 48} fill={color} fontSize="9" fontWeight="bold" fontFamily="monospace">{revenue}</text>
          <rect x="300" y={92 + i * 48} width="100" height="7" rx="3" fill="#1a1a30" />
          <rect x="300" y={92 + i * 48} width={pct} height="7" rx="3" fill={color} opacity="0.6" />
          <text x="408" y={99 + i * 48} fill={color} fontSize="7" fontFamily="monospace" textAnchor="end">{pct}%</text>
        </g>
      ))}
      {/* Summary */}
      <rect x="36" y="265" width="408" height="28" rx="8" fill="#FF6B3510" stroke="#FF6B35" strokeWidth="0.8" />
      <text x="120" y="282" fill="#aaaacc" fontSize="8" fontFamily="monospace">Total revenue today:</text>
      <text x="330" y="282" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">₹34,000</text>
      <text x="410" y="282" fill="#0F9D8C" fontSize="7" fontFamily="monospace">↑ 18%</text>
    </ScreenFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'Online Ordering',
  title: 'Your orders. Your brand.',
  titleAccent: 'Zero commission.',
  subtitle:
    'Launch your own branded online ordering page and accept direct orders from your customers — with no platform fees, no third-party dependency, and complete control over your data.',
  illustration: <OnlineOrderIllustration />,
  stats: [
    { value: '0%', label: 'Commission on direct orders' },
    { value: '3 min', label: 'Setup your ordering page' },
    { value: '100%', label: 'Customer data stays yours' },
  ],
  features: [
    { icon: Globe, title: 'Branded Ordering Page', desc: 'A fully customisable online ordering page with your logo, menu, and brand colors — no coding needed.' },
    { icon: CreditCard, title: 'Multiple Payment Modes', desc: 'Accept UPI, debit/credit cards, net banking, wallets, and cash-on-delivery in one checkout.' },
    { icon: RefreshCw, title: 'Zomato & Swiggy Integration', desc: 'Orders from Zomato and Swiggy flow directly into your e-Smart dashboard and fire KOTs automatically.' },
    { icon: Bell, title: 'Real-Time Order Tracking', desc: 'Customers track their order status live. Your kitchen sees updates instantly.' },
    { icon: QrCode, title: 'QR Table Ordering', desc: 'Guests scan a QR code at the table and order directly — no app download, no waiter needed.' },
    { icon: BarChart2, title: 'Order Channel Analytics', desc: 'See which channel (direct, Zomato, QR) drives the most revenue and optimise your strategy.' },
  ],
  steps: [
    { num: '1', title: 'Customer places order', desc: 'Via your website, QR code, Zomato, or Swiggy — all channels funnel into one screen.' },
    { num: '2', title: 'KOT fires automatically', desc: 'The order routes to the right kitchen station in seconds. No manual entry.' },
    { num: '3', title: 'Status updates sent', desc: 'Customer receives real-time SMS or WhatsApp updates — confirmed, preparing, ready.' },
    { num: '4', title: 'Revenue tracked instantly', desc: 'Every order updates your live sales dashboard, inventory, and daily MIS report.' },
  ],
  spotlightHeadline: 'All your order channels — one unified screen',
  spotlightDesc:
    'Whether customers order via your branded website, scan a QR code at the table, or come in from Zomato and Swiggy — every order lands in a single e-Smart dashboard. No switching between tablets. No missed tickets.',
  spotlightBullets: [
    'One screen for direct orders, QR orders, Zomato & Swiggy',
    'Automatic KOT routing to the correct kitchen station',
    'Per-channel revenue breakdown to track which platform performs best',
    'Customer database built automatically from every direct order',
    'Zero setup fee for the branded ordering page',
  ],
  spotlightVisual: <IntegrationSpotlight />,
  segments: [
    { icon: Store, type: 'Full-Service Restaurants', desc: 'QR table ordering and direct website orders to eliminate commission costs.' },
    { icon: Truck, type: 'Cloud Kitchens', desc: 'Aggregate Zomato, Swiggy, and direct orders into one kitchen screen with no switching.' },
    { icon: Coffee, type: 'Cafés & Bakeries', desc: 'Let customers pre-order pick-ups via your branded page — reduce wait times and boost throughput.' },
  ],
  faqs: [
    { q: 'Do I need a separate website for online ordering?', a: 'No. e-Smart provides a hosted ordering page at your subdomain (e.g., order.yourrestaurant.com). It\'s ready in minutes — no developer needed.' },
    { q: 'How does the Zomato/Swiggy integration work?', a: 'We use official integrations to pull orders from these platforms into your e-Smart dashboard. The KOT fires automatically — no manual re-entry.' },
    { q: 'Can customers pay online for dine-in pre-orders?', a: 'Yes. You can enable online prepayment for dine-in reservations, take-away pre-orders, or delivery — fully configurable per order type.' },
    { q: 'Is there any commission on direct orders through e-Smart?', a: 'None whatsoever. Direct orders placed through your branded page carry zero platform commission. You only pay the standard payment gateway fee (typically 1.5–2%).' },
  ],
  ctaHeadline: 'Start taking direct orders today',
  ctaSubtext: 'Your branded ordering page. Zero commission. Up and running in 3 minutes.',
};

export default function OnlineOrdering() {
  return <ProductTemplate config={config} />;
}
