import React from 'react';
import {
  Package, AlertTriangle, ShoppingCart, Truck, BarChart2,
  RefreshCw, Store, Coffee, Layers
} from 'lucide-react';
import ProductTemplate, { ScreenFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Inventory Dashboard ──────────── */
function InventoryIllustration() {
  return (
    <div className="relative w-full max-w-xl mx-auto flex justify-center">
      <img
        src="/esmart-restaurant/inventory_mockup.png"
        alt="e-Smart Inventory Management"
        className="w-full h-auto object-contain drop-shadow-2xl lg:scale-110 transform transition-transform duration-300"
      />
    </div>
  );
}

/* ── Spotlight Visual: Recipe Auto-Deduction ─────────── */
function RecipeSpotlight() {
  return (
    <ScreenFrame>
      {/* Header */}
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#0F9D8C" fontSize="10" fontWeight="bold" fontFamily="monospace">Recipe Costing &amp; Auto-Deduction</text>

      {/* Bill triggers deduction */}
      <text x="36" y="68" fill="#aaaacc" fontSize="8" fontFamily="monospace">TRIGGER: Bill generated — Chicken Biryani ×2</text>

      {/* Arrow flow */}
      <rect x="36" y="76" width="120" height="30" rx="6" fill="#FF6B3520" stroke="#FF6B35" strokeWidth="1" />
      <text x="96" y="95" fill="#FF6B35" fontSize="8" fontFamily="monospace" textAnchor="middle">Bill #187</text>

      <text x="165" y="95" fill="#555577" fontSize="12" fontFamily="monospace">→</text>

      <rect x="180" y="76" width="120" height="30" rx="6" fill="#0F9D8C20" stroke="#0F9D8C" strokeWidth="1" />
      <text x="240" y="95" fill="#0F9D8C" fontSize="8" fontFamily="monospace" textAnchor="middle">Recipe lookup</text>

      <text x="309" y="95" fill="#555577" fontSize="12" fontFamily="monospace">→</text>

      <rect x="325" y="76" width="120" height="30" rx="6" fill="#A78BFA20" stroke="#A78BFA" strokeWidth="1" />
      <text x="385" y="95" fill="#A78BFA" fontSize="8" fontFamily="monospace" textAnchor="middle">Stock deducted</text>

      {/* Ingredients table */}
      <text x="36" y="125" fill="#aaaacc" fontSize="8" fontFamily="monospace">INGREDIENTS DEDUCTED (per Chicken Biryani ×2)</text>
      {[
        ['Chicken', '400g deducted', '8.2 kg remaining', '#FF6B35'],
        ['Basmati Rice', '300g deducted', '1.1 kg remaining', '#EF4444'],
        ['Cooking Oil', '60ml deducted', '14.9 L remaining', '#0F9D8C'],
        ['Spices Mix', '20g deducted', '450g remaining', '#A78BFA'],
      ].map(([item, deducted, remaining, color], i) => (
        <g key={item}>
          <rect x="36" y={132 + i * 30} width="420" height="24" rx="4" fill={i % 2 === 0 ? '#0f0f2a' : '#0a0a1a'} />
          <text x="44" y={148 + i * 30} fill="#ccccee" fontSize="8.5" fontFamily="monospace">{item}</text>
          <text x="180" y={148 + i * 30} fill={color} fontSize="8" fontFamily="monospace">−{deducted}</text>
          <text x="340" y={148 + i * 30} fill="#8888aa" fontSize="7.5" fontFamily="monospace">{remaining}</text>
        </g>
      ))}

      {/* Low stock warning */}
      <rect x="36" y="260" width="420" height="26" rx="6" fill="#EF444415" stroke="#EF4444" strokeWidth="1" />
      <text x="52" y="276" fill="#EF4444" fontSize="8" fontFamily="monospace">⚠ Basmati Rice below reorder level (2 kg). Raise PO to supplier?</text>
      <rect x="382" y="265" width="66" height="16" rx="4" fill="#EF4444" />
      <text x="415" y="276" fill="white" fontSize="7" fontFamily="monospace" textAnchor="middle">Raise PO ▶</text>
    </ScreenFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'Inventory Management',
  title: 'Never lose a rupee to',
  titleAccent: 'waste or stockouts',
  subtitle:
    'Real-time inventory tracking that automatically deducts ingredients from your stock every time a bill is generated. Know exactly what\'s running low — before you run out mid-service.',
  illustration: <InventoryIllustration />,
  stats: [
    { value: '30%', label: 'Average wastage reduction' },
    { value: '500+', label: 'Raw materials trackable' },
    { value: 'Real-time', label: 'Stock deduction on every bill' },
  ],
  features: [
    { icon: RefreshCw, title: 'Recipe-Based Auto-Deduction', desc: 'Every bill auto-deducts the exact ingredients used — to the gram — based on your configured recipes.' },
    { icon: AlertTriangle, title: 'Low Stock Alerts', desc: 'Set reorder levels per ingredient. Get instant alerts when stock falls below the threshold.' },
    { icon: ShoppingCart, title: 'Purchase Order Management', desc: 'Create and send purchase orders to your vendors directly from the platform with one click.' },
    { icon: Truck, title: 'Vendor Management', desc: 'Maintain a supplier database with pricing history, lead times, and payment terms.' },
    { icon: BarChart2, title: 'Wastage & Variance Reports', desc: 'Compare theoretical vs actual stock usage to identify waste, theft, or recipe deviations.' },
    { icon: Package, title: 'Batch & Expiry Tracking', desc: 'Track ingredients by batch, manufacturing date, and expiry to ensure FIFO compliance and food safety.' },
  ],
  steps: [
    { num: '1', title: 'Add your recipes', desc: 'Link each menu item to its ingredient list with exact quantities per serving.' },
    { num: '2', title: 'Bill is generated', desc: 'When a bill is raised, the system automatically looks up the recipe for each item ordered.' },
    { num: '3', title: 'Stock deducted instantly', desc: 'Ingredients are deducted from your live inventory in real-time — no manual entry needed.' },
    { num: '4', title: 'Alerts & reorder', desc: 'Low-stock alerts fire automatically. Raise a PO to your vendor in one click.' },
  ],
  spotlightHeadline: 'Recipe-based auto-deduction — to the gram',
  spotlightDesc:
    'Stop guessing how much you\'ve used. The moment a bill is generated, e-Smart cross-references your recipe database and deducts the exact ingredients used. Your inventory reflects reality — always.',
  spotlightBullets: [
    'Deduct ingredients automatically with zero manual intervention',
    'Track 500+ raw materials across all your outlets simultaneously',
    'Get alerted before you run out — not after',
    'Identify which dishes cost the most to make vs how much they earn',
    'Full audit trail: see every deduction, adjustment, and purchase',
  ],
  spotlightVisual: <RecipeSpotlight />,
  segments: [
    { icon: Store, type: 'Standalone Restaurants', desc: 'Control your raw material costs and reduce wastage with recipe-based stock tracking.' },
    { icon: Layers, type: 'Multi-Outlet Chains', desc: 'Manage inventory across all locations from one centralised dashboard with outlet-level breakdowns.' },
    { icon: Coffee, type: 'Cloud Kitchens', desc: 'Track ingredients per brand separately even when they share the same kitchen and raw materials.' },
  ],
  faqs: [
    { q: 'Do I need to manually enter every stock movement?', a: 'No. Deductions happen automatically with every bill. You only need to manually record purchases (goods received) — everything else is automated.' },
    { q: 'Can I track semi-finished goods and prep items?', a: 'Yes. You can define sub-recipes (e.g., a marination batch) as intermediate ingredients and link them to finished dish recipes.' },
    { q: 'What if my actual usage differs from the recipe?', a: 'The system tracks theoretical vs actual stock and highlights variances. This helps you identify wastage, spillage, or recipe drift.' },
    { q: 'Can I manage multiple stores from one account?', a: 'Yes. Each outlet has its own inventory. You can view per-outlet stock or a consolidated view across all locations from a single login.' },
  ],
  ctaHeadline: 'Stop losing money on waste',
  ctaSubtext: 'Take full control of your kitchen costs with real-time inventory tracking.',
};

export default function Inventory() {
  return <ProductTemplate config={config} />;
}
