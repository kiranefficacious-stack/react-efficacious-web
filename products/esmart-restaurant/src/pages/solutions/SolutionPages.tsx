import React from 'react';
import {
  Utensils, Layout, Award, Users, BookOpen, Clock, Heart,
  Zap, Compass, Play, Plus, Trash2, Smartphone, DollarSign,
  ShoppingCart, Shield, RefreshCw, BarChart2, CheckCircle2,
  AlertOctagon, Store, Layers, Wine, Coffee, Truck, Tag
} from 'lucide-react';
import SolutionTemplate, { ScreenFrame, type SolutionPageConfig } from './SolutionTemplate';

/* ─── 1. FINE DINE ILLUSTRATION & COMPONENT ─────────── */
function FineDineIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Floor Plan Layout &amp; Tables</text>
      
      {/* Visual Tables Grid */}
      {[
        { t: 'Table 1', c: '4/4', status: 'Billed', fill: '#0F9D8C20', stroke: '#0F9D8C' },
        { t: 'Table 2', c: '2/2', status: 'Dining', fill: '#FF6B3520', stroke: '#FF6B35' },
        { t: 'Table 3', c: '0/6', status: 'Vacant', fill: '#1e1e35', stroke: '#333355' },
        { t: 'Table 4', c: '5/6', status: 'Dessert', fill: '#A78BFA20', stroke: '#A78BFA' },
        { t: 'Table 5', c: '0/2', status: 'Reserved', fill: '#F59E0B20', stroke: '#F59E0B' },
        { t: 'Table 6', c: '2/4', status: 'KOT Sent', fill: '#3B82F620', stroke: '#3B82F6' },
      ].map(({ t, c, status, fill, stroke }, i) => (
        <g key={t}>
          <rect x={36 + (i % 3) * 136} y={68 + Math.floor(i / 3) * 76} width="120" height="64" rx="10" fill={fill} stroke={stroke} strokeWidth="1.2" />
          <text x={96 + (i % 3) * 136} y={88 + Math.floor(i / 3) * 76} fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{t}</text>
          <text x={96 + (i % 3) * 136} y={102 + Math.floor(i / 3) * 76} fill="#888899" fontSize="8" fontFamily="monospace" textAnchor="middle">Covers: {c}</text>
          <rect x={66 + (i % 3) * 136} y={108 + Math.floor(i / 3) * 76} width="60" height="15" rx="4" fill={stroke} />
          <text x={96 + (i % 3) * 136} y={118 + Math.floor(i / 3) * 76} fill="white" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{status}</text>
        </g>
      ))}
      {/* Floor status bar */}
      <rect x="22" y="278" width="436" height="14" rx="0" fill="#0a0a1a" />
      <text x="36" y="288" fill="#555577" fontSize="7.5" fontFamily="monospace">Occupancy: 13/24 Covers (54%)</text>
      <text x="440" y="288" fill="#FF6B35" fontSize="7.5" fontFamily="monospace" textAnchor="end">Active Tables: 4</text>
    </ScreenFrame>
  );
}

const fineDineConfig: SolutionPageConfig = {
  badge: 'Fine Dining Solutions',
  title: 'Deliver flawless dining',
  titleAccent: 'service from table to kitchen',
  subtitle:
    'Visual floor layouts, table status indicators, course-by-course KOT routing, split billing, and digital customer feedback — built to maintain elegance during busy rush hours.',
  illustration: <FineDineIllustration />,
  stats: [
    { value: '22%', label: 'Higher table turnover rate' },
    { value: '100%', label: 'Flawless course synchronization' },
    { value: '4.8★', label: 'Average diner review rating' },
  ],
  challenges: [
    {
      challenge: 'Waiters forget modifiers or place orders in the wrong course sequence.',
      solution: 'e-Smart enforces course grouping (starter, main, dessert) and mandatory modifier popups before KOT print.'
    },
    {
      challenge: 'Splitting bills for large groups creates checkout bottlenecks.',
      solution: 'Split by seat, split equally, or customize split items directly on the payment screen in 3 taps.'
    }
  ],
  features: [
    { icon: Layout, title: 'Visual Floor Map', desc: 'Design your exact floor plan. Spot vacant, dining, billed, and reserved tables at a glance.' },
    { icon: Clock, title: 'Course-by-Course KOT', desc: 'Hold or fire courses to the kitchen to pace the guest\'s meal perfectly.' },
    { icon: Users, title: 'Split Billing & Settle', desc: 'Split bills by item, seat, or count instantly with multiple payment modes.' },
  ],
  spotlightHeadline: 'Pace meals perfectly with Course Management',
  spotlightDesc:
    'Keep your service seamless. With course holding, waiters can punch the entire table order upfront but only release starters first. The mains and desserts are fired when the guests are ready — keeping food fresh and waiters organized.',
  spotlightVisual: <FineDineIllustration />,
  faqs: [
    { q: 'Can we manage multiple dining floors?', a: 'Yes. You can configure multiple floor tabs (e.g., Ground Floor, Rooftop, AC Section) with unique layouts.' },
    { q: 'Does it support captain ordering via tablets?', a: 'Absolutely. Waiters can carry any Android tablet or iPad to tables, punch orders directly, and print KOTs instantly.' }
  ],
  ctaHeadline: 'Elevate your fine dine experience today'
};

export function FineDine() { return <SolutionTemplate config={fineDineConfig} />; }


/* ─── 2. QUICK SERVICE (QSR) ILLUSTRATION & COMPONENT ── */
function QSRIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">QSR Speed Dashboard</text>
      
      {/* Token orders columns */}
      <text x="36" y="68" fill="#aaaacc" fontSize="8" fontFamily="monospace">LIVE QUEUE — TOKEN ORDERS</text>
      
      {/* In preparation */}
      <rect x="36" y="78" width="180" height="150" rx="8" fill="#0f0f2a" stroke="#FF6B35" strokeWidth="0.8" />
      <text x="46" y="94" fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace">Preparing (4)</text>
      {['Token #184 — Burgers', 'Token #185 — Pizza', 'Token #186 — Shakes', 'Token #187 — Fries'].map((t, i) => (
        <g key={t}>
          <rect x="44" y="104 + i * 28" width="164" height="22" rx="4" fill="#1a1a35" />
          <text x="52" y="118 + i * 28" fill="#ccccee" fontSize="8" fontFamily="monospace">{t}</text>
          <text x="202" y="118 + i * 28" fill="#555577" fontSize="7" fontFamily="monospace" textAnchor="end">3m</text>
        </g>
      ))}

      {/* Ready for pickup */}
      <rect x="264" y="78" width="180" height="150" rx="8" fill="#0f0f2a" stroke="#0F9D8C" strokeWidth="0.8" />
      <text x="274" y="94" fill="#0F9D8C" fontSize="9" fontWeight="bold" fontFamily="monospace">Ready (3)</text>
      {['Token #181 — Combo Meal', 'Token #182 — Wraps', 'Token #183 — Drinks'].map((t, i) => (
        <g key={t}>
          <rect x="272" y="104 + i * 28" width="164" height="22" rx="4" fill="#0F9D8C15" />
          <text x="280" y="118 + i * 28" fill="#0F9D8C" fontSize="8" fontWeight="bold" fontFamily="monospace">{t}</text>
          <text x="430" y="118 + i * 28" fill="#0F9D8C" fontSize="7.5" fontFamily="monospace" textAnchor="end">PICKUP</text>
        </g>
      ))}

      {/* Bottom KPI */}
      <rect x="36" y="246" width="408" height="24" rx="6" fill="#0F9D8C15" />
      <text x="52" y="261" fill="#0F9D8C" fontSize="8" fontFamily="monospace">⚡ Speed Check: Avg prep time today is 4.2 minutes (Goal: &lt;5m)</text>
    </ScreenFrame>
  );
}

const qsrConfig: SolutionPageConfig = {
  badge: 'Quick Service Restaurants',
  title: 'Lightning speed billing for',
  titleAccent: 'high-volume food counters',
  subtitle:
    'High-speed touchscreen cashier interface, token printing, kitchen display integrations, customer status screens, and QR order aggregation built to keep queues moving.',
  illustration: <QSRIllustration />,
  stats: [
    { value: '3.8s', label: 'Average billing checkout time' },
    { value: '45%', label: 'Reduction in queue wait time' },
    { value: '0', label: 'Manual token sync errors' },
  ],
  challenges: [
    {
      challenge: 'Long queues during peak hours turn customers away.',
      solution: 'Our checkout takes just 3 taps — search items, tap payment, auto-print token instantly.'
    },
    {
      challenge: 'Staff manually shouting order tokens causes kitchen chaos.',
      solution: 'Automatic token routing prints directly in the kitchen or displays on the KDS monitor.'
    }
  ],
  features: [
    { icon: Zap, title: 'Speed Checkout UI', desc: 'Minimalist screen flow designed for cashiers to bill combos and extras in milliseconds.' },
    { icon: Compass, title: 'Token Screen Sync', desc: 'Display "Preparing" and "Ready" token numbers on an external TV screen for guests.' },
    { icon: Play, title: 'Combo Customizer', desc: 'Quickly select cold drinks, sides, and size upgrades with one-click combo buttons.' },
  ],
  spotlightHeadline: 'Ditch the kitchen paper trail with KDS',
  spotlightDesc:
    'No more lost tickets. Orders punched at the billing counter appear instantly on our digital Kitchen Display System screen. Cooks tap to start preparing, and tap again to mark ready — updating the guest token TV instantly.',
  spotlightVisual: <QSRIllustration />,
  faqs: [
    { q: 'Does it support digital payment gateway integration?', a: 'Yes. It pairs with dynamic QR payment terminals, automatically settling the bill only when payment is verified.' },
    { q: 'Can we customize the token announcement TV layout?', a: 'Yes. You can customize colors, headers, and sizes of token lists to match your branding.' }
  ],
  ctaHeadline: 'Accelerate your counter throughput now'
};

export function QSR() { return <SolutionTemplate config={qsrConfig} />; }


/* ─── 3. CAFÉS ILLUSTRATION & COMPONENT ──────────────── */
function CafeIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Coffee Customize &amp; Quick Settle</text>

      {/* Beverage customization panel */}
      <rect x="36" y="68" width="220" height="200" rx="8" fill="#0f0f2a" stroke="#FF6B35" strokeWidth="0.8" />
      <text x="46" y="86" fill="white" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Cappuccino Customizer</text>
      
      {/* Size Option */}
      <text x="46" y="110" fill="#888899" fontSize="8" fontFamily="monospace">SIZE</text>
      {['Regular', 'Large (+₹30)'].map((s, i) => (
        <g key={s}>
          <rect x={46 + i * 90} y={116} width="80" height="20" rx="4" fill={i === 1 ? '#FF6B35' : '#1a1a35'} />
          <text x={46 + i * 90 + 40} y={129} fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">{s}</text>
        </g>
      ))}

      {/* Milk Option */}
      <text x="46" y="152" fill="#888899" fontSize="8" fontFamily="monospace">MILK ALTERNATIVES</text>
      {['Whole', 'Oat (+₹40)', 'Almond (+₹40)'].map((s, i) => (
        <g key={s}>
          <rect x={46 + i * 66} y={158} width="60" height="20" rx="4" fill={i === 1 ? '#FF6B35' : '#1a1a35'} />
          <text x={46 + i * 66 + 30} y={171} fill="white" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{s}</text>
        </g>
      ))}

      {/* Sweetener Option */}
      <text x="46" y="194" fill="#888899" fontSize="8" fontFamily="monospace">SWEETENER</text>
      {['Sugar', 'Brown Sugar', 'Stevia'].map((s, i) => (
        <g key={s}>
          <rect x={46 + i * 66} y={200} width="60" height="20" rx="4" fill={i === 0 ? '#FF6B35' : '#1a1a35'} />
          <text x={46 + i * 66 + 30} y={213} fill="white" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{s}</text>
        </g>
      ))}

      {/* Settle Panel */}
      <rect x="272" y="68" width="172" height="200" rx="8" fill="#141428" />
      <text x="284" y="86" fill="#8888aa" fontSize="8" fontFamily="monospace">ORDER SUMMARY</text>
      <text x="284" y="106" fill="white" fontSize="8.5" fontFamily="monospace">1× Cappuccino (Large, Oat)</text>
      <text x="432" y="106" fill="#FF6B35" fontSize="8.5" fontFamily="monospace" textAnchor="end">₹250</text>
      <text x="284" y="120" fill="white" fontSize="8.5" fontFamily="monospace">1× Butter Croissant</text>
      <text x="432" y="120" fill="#FF6B35" fontSize="8.5" fontFamily="monospace" textAnchor="end">₹140</text>
      
      <rect x="284" y="140" width="148" height="1" fill="#2a2a4a" />
      <text x="284" y="160" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace">Total: ₹390</text>

      <rect x="284" y="180" width="148" height="24" rx="5" fill="#0F9D8C" />
      <text x="358" y="195" fill="white" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Fast Cash</text>
      <rect x="284" y="210" width="148" height="24" rx="5" fill="#FF6B35" />
      <text x="358" y="225" fill="white" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">UPI / Card</text>
    </ScreenFrame>
  );
}

const cafeConfig: SolutionPageConfig = {
  badge: 'Café Operations',
  title: 'Pace your specialty coffee',
  titleAccent: 'and pastries flawlessly',
  subtitle:
    'Dedicated drink customizers, bar station printer routing, recipe ingredient deduct trackers, customer profile loyalty cards, and simple counter menus built for independent coffee houses.',
  illustration: <CafeIllustration />,
  stats: [
    { value: '35%', label: 'Loyalty redemption increase' },
    { value: '100%', label: 'Ingredient costing accuracy' },
    { value: '1.2m', label: 'Average coffee prep dispatch' },
  ],
  challenges: [
    {
      challenge: 'Writing complex barista milk/syrup orders manually slows production.',
      solution: 'Our single-click beverage builder configures milk swaps, syrups, and sizes instantly.'
    },
    {
      challenge: 'High cost of oat/almond milk eats into coffee profit margins.',
      solution: 'Ingredient inventory auto-deducts pricey milk swaps to the exact milliliter.'
    }
  ],
  features: [
    { icon: Coffee, title: 'Barista Modifier Matrix', desc: 'Add modifiers (Oat milk, Extra shots, Sugar-free) with individual price adjustments.' },
    { icon: Tag, title: 'Happy Hour Specials', desc: 'Auto-apply buy-one-get-one deals or afternoon discount slots on baked goods.' },
    { icon: Heart, title: 'Diner Loyalty Stamping', desc: 'Automatically reward regular coffee drinkers with digital reward points on every phone checkout.' },
  ],
  spotlightHeadline: 'Optimize milk & syrup usage to the gram',
  spotlightDesc:
    'Coffee margins depend on milk & inventory control. e-Smart deducts exact milk volumes (e.g., 220ml Whole Milk vs Oat Milk) from your store inventory on every espresso purchase, helping you calculate daily cost-of-goods-sold (COGS) instantly.',
  spotlightVisual: <CafeIllustration />,
  faqs: [
    { q: 'Can we print orders directly to the barista counter?', a: 'Yes. KOT ticket routes print only to the coffee bar printer, while food tickets print at the bakery table.' },
    { q: 'Is there a digital stamps/card feature?', a: 'Yes. Points accumulate automatically to the customer\'s profile, sending warning thresholds for free coffee rewards.' }
  ],
  ctaHeadline: 'Modernize your coffee shop today'
};

export function Cafe() { return <SolutionTemplate config={cafeConfig} />; }


/* ─── 4. CLOUD KITCHENS ILLUSTRATION & COMPONENT ────── */
function CloudKitchenIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Multi-Brand Order Aggregator</text>
      
      {/* Brand orders streams */}
      {[
        { b: 'Tandoori Junction', s: 'Zomato', status: 'Rider Assigned', color: '#E23744', val: '₹420' },
        { b: 'Bowl of Greens', s: 'Swiggy', status: 'Food Cooking', color: '#FC8019', val: '₹280' },
        { b: 'Wok Box', s: 'Direct Website', status: 'Driver Dispatched', color: '#0F9D8C', val: '₹550' },
        { b: 'Tandoori Junction', s: 'Swiggy', status: 'Order Accepted', color: '#FC8019', val: '₹840' },
      ].map((o, i) => (
        <g key={i}>
          <rect x="36" y={68 + i * 48} width="408" height="42" rx="6" fill="#0f0f2a" stroke="#1e1e35" strokeWidth="1" />
          <rect x="42" y={74 + i * 48} width="6" height="30" rx="2" fill={o.color} />
          <text x="56" y={88 + i * 48} fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">{o.b}</text>
          <text x="56" y={100 + i * 48} fill="#888899" fontSize="7.5" fontFamily="monospace">{o.s} · status: {o.status}</text>
          <text x="430" y={94 + i * 48} fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">{o.val}</text>
        </g>
      ))}
      <rect x="36" y="264" width="408" height="24" rx="5" fill="#0F9D8C15" />
      <text x="52" y="279" fill="#0F9D8C" fontSize="8" fontFamily="monospace">✔ Cloud Kitchen Sync: 4 orders active across 3 virtual brands</text>
    </ScreenFrame>
  );
}

const cloudKitchenConfig: SolutionPageConfig = {
  badge: 'Cloud Kitchen Solutions',
  title: 'Manage multiple virtual brands',
  titleAccent: 'from a single dashboard',
  subtitle:
    'Swiggy/Zomato integrations, centralized brand menus, individual brand P&L reports, raw prep tracking, and auto-dispatch options designed for ghost kitchens.',
  illustration: <CloudKitchenIllustration />,
  stats: [
    { value: '4 brands', label: 'Managed from 1 screen' },
    { value: '18%', label: 'Higher kitchen efficiency' },
    { value: 'Zero', label: 'Missed order cancel tickets' },
  ],
  challenges: [
    {
      challenge: 'Managing 5 different tablets for different brands creates noise and errors.',
      solution: 'Every brand order flows into one central e-Smart aggregator POS. No table switching.'
    },
    {
      challenge: 'Calculating exact profit margins per virtual brand is difficult.',
      solution: 'Our dashboard splits expenses, sales, and commissions by brand automatically.'
    }
  ],
  features: [
    { icon: Layers, title: 'Multi-Brand Aggregators', desc: 'Sync Zomato, Swiggy, and direct delivery channels onto one unified KDS stream.' },
    { icon: BarChart2, title: 'Separate Brand P&L', desc: 'Track sales, ingredient costs, and aggregator commission payouts split by brand.' },
    { icon: RefreshCw, title: 'Central Dispatch Hub', desc: 'Alert drivers, auto-print packer slips, and track rider ETA on a single screen.' },
  ],
  spotlightHeadline: 'Scale to unlimited brands in 5 minutes',
  spotlightDesc:
    'Ghost kitchens grow by testing new cuisines. With e-Smart, you don\'t need separate systems. Simply add a virtual brand, configure its menu, connect Swiggy/Zomato, and start taking orders instantly from the same physical POS terminal.',
  spotlightVisual: <CloudKitchenIllustration />,
  faqs: [
    { q: 'Can we share a single physical inventory across brands?', a: 'Yes. You can configure multiple brands to deduct raw materials (like onions or chicken) from a single shared kitchen stock.' },
    { q: 'Does it support automatic order printing?', a: 'Yes. Incoming Swiggy/Zomato tickets accept and print receipt/packer slips automatically.' }
  ],
  ctaHeadline: 'Maximize your ghost kitchen output today'
};

export function CloudKitchens() { return <SolutionTemplate config={cloudKitchenConfig} />; }


/* ─── 5. BARS & BREWERIES ILLUSTRATION & COMPONENT ───── */
function BarIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Active Bar Tabs &amp; Happy Hour Rules</text>

      {/* Active Tabs */}
      <text x="36" y="68" fill="#aaaacc" fontSize="8" fontFamily="monospace">OPEN TABS</text>
      {[
        { tab: 'Tab 101 — Rohan S.', items: '3× IPA Draft, 1× Nachos', val: '₹1,250', time: '42m' },
        { tab: 'Tab 104 — Table 12', items: '2× Whiskey sour, 1× Wings', val: '₹950', time: '18m' },
        { tab: 'Bar Stool 3 — Guest', items: '1× Craft Lager', val: '₹220', time: '5m' },
      ].map((tab, i) => (
        <g key={i}>
          <rect x="36" y={76 + i * 46} width="408" height="40" rx="6" fill="#0f0f2a" stroke="#1e1e35" strokeWidth="1" />
          <text x="46" y={91 + i * 46} fill="white" fontSize="8.5" fontWeight="bold" fontFamily="monospace">{tab.tab}</text>
          <text x="46" y={104 + i * 46} fill="#888899" fontSize="7.5" fontFamily="monospace">{tab.items}</text>
          <text x="340" y={99 + i * 46} fill="#FF6B35" fontSize="8.5" fontWeight="bold" fontFamily="monospace">{tab.val}</text>
          <rect x="360" y={84 + i * 46} width="74" height="24" rx="4" fill="#1e1e35" />
          <text x="397" y={99 + i * 46} fill="#8888aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Settle Tab</text>
        </g>
      ))}

      {/* Happy Hour Rule Indicator */}
      <rect x="36" y="224" width="408" height="36" rx="6" fill="#F59E0B15" stroke="#F59E0B" strokeWidth="0.8" />
      <text x="52" y="246" fill="#F59E0B" fontSize="8" fontFamily="monospace">⚡ Happy Hour Active (4pm–7pm) · Auto 1+1 on Craft Beer applied</text>
    </ScreenFrame>
  );
}

const barConfig: SolutionPageConfig = {
  badge: 'Bars & Breweries',
  title: 'Manage open bar tabs and',
  titleAccent: 'happy hours with absolute ease',
  subtitle:
    'Bar tab authorization, multi-pricing happy-hour rules, bottle consumption volume calculators, and fast counter billing designed for high-energy bars.',
  illustration: <BarIllustration />,
  stats: [
    { value: '0% leakage', label: 'Liquor stock verification' },
    { value: '1-click', label: 'Bar tab settlement check' },
    { value: 'Auto-apply', label: 'Happy hour discount tiers' },
  ],
  challenges: [
    {
      challenge: 'Staff manually applying happy-hour discounts creates pricing errors.',
      solution: 'Configure automated pricing rules. Prices switch back and forth automatically based on clock time.'
    },
    {
      challenge: 'Tracking open card tabs at busy bars results in unpaid walkouts.',
      solution: 'Create named bar tabs that sync to floor tables — ensuring every pour is settled.'
    }
  ],
  features: [
    { icon: Wine, title: 'Open Tab Management', desc: 'Hold tabs open, track items by order round, and close tabs in a single transaction.' },
    { icon: Tag, title: 'Automated Pricing Rules', desc: 'Automate happy-hour slots, ladies night deals, and weekend premiums without manual override.' },
    { icon: BarChart2, title: 'Pour Volume Costing', desc: 'Track spirits down to the milliliter — compare stock weight vs sales logs.' },
  ],
  spotlightHeadline: 'Eliminate beverage theft with Pour Verification',
  spotlightDesc:
    'Liquor loss is the biggest drain on bar profits. e-Smart links directly to recipe cards. If a bartender serves a Whiskey Sour, 60ml of Whiskey is automatically deducted. Audit logs flag discrepancies between physical bottles and sales totals.',
  spotlightVisual: <BarIllustration />,
  faqs: [
    { q: 'Can we set up group tables and bar tabs together?', a: 'Yes. Guests can order drinks at the counter under a tab and have it transferred to a dinner table later.' },
    { q: 'Does it support liquor excise compliance exports?', a: 'Yes. Export daily sales ledger sheets formatted to state excise record standards.' }
  ],
  ctaHeadline: 'Double your bar efficiency tonight'
};

export function Bars() { return <SolutionTemplate config={barConfig} />; }


/* ─── 6. BAKERIES ILLUSTRATION & COMPONENT ───────────── */
function BakeryIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Weight Billing &amp; Expiry Batches</text>

      {/* Weight item card */}
      <rect x="36" y="68" width="200" height="200" rx="8" fill="#0f0f2a" stroke="#FF6B35" strokeWidth="0.8" />
      <text x="46" y="86" fill="white" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Weight scale link</text>
      
      <rect x="46" y="98" width="180" height="42" rx="6" fill="#1a1a35" />
      <text x="56" y="114" fill="#8888aa" fontSize="8.5" fontFamily="monospace">Kaju Katli (Weight)</text>
      <text x="56" y="130" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">0.450 kg</text>
      <text x="216" y="123" fill="white" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="end">₹360</text>

      {/* Batch details */}
      <text x="46" y="160" fill="#888899" fontSize="8" fontFamily="monospace">BATCH HISTORY</text>
      {[
        { name: 'Chocolate Cake', exp: 'Today (Expiring)', color: '#EF4444' },
        { name: 'Brownie Batch A', exp: '2 days remaining', color: '#0F9D8C' },
        { name: 'Macarons Box 2', exp: '4 days remaining', color: '#0F9D8C' },
      ].map((b, i) => (
        <g key={i}>
          <rect x="46" y={170 + i * 28} width="180" height="22" rx="4" fill="#141428" />
          <text x="52" y={184 + i * 28} fill="white" fontSize="7.5" fontFamily="monospace">{b.name}</text>
          <text x="220" y={184 + i * 28} fill={b.color} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="end">{b.exp}</text>
        </g>
      ))}

      {/* Expiring batch notice */}
      <rect x="252" y="68" width="192" height="200" rx="8" fill="#141428" />
      <text x="264" y="86" fill="#EF4444" fontSize="8.5" fontWeight="bold" fontFamily="monospace">⚠ BATCH EXPIRY ALERT</text>
      <text x="264" y="106" fill="white" fontSize="8" fontFamily="monospace">Batch #B982 (Pineapple Pastries)</text>
      <text x="264" y="118" fill="#888899" fontSize="7.5" fontFamily="monospace">Expiry date: 08-Jul-2026</text>
      
      <rect x="264" y="140" width="168" height="36" rx="5" fill="#EF444415" stroke="#EF4444" strokeWidth="0.8" />
      <text x="272" y="152" fill="#EF4444" fontSize="7.5" fontFamily="monospace">Action: Discard from stock or</text>
      <text x="272" y="164" fill="#EF4444" fontSize="7.5" fontWeight="bold" fontFamily="monospace">Auto Apply 50% discount</text>

      <rect x="264" y="196" width="168" height="24" rx="5" fill="#FF6B35" />
      <text x="348" y="211" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Clear Batch</text>
    </ScreenFrame>
  );
}

const bakeryConfig: SolutionPageConfig = {
  badge: 'Bakery Management',
  title: 'Speed up bakery checkout and',
  titleAccent: 'minimize shelf-life waste',
  subtitle:
    'Integration with weighing scales, batch number expiry alerts, production scheduler tools, and custom barcode generation designed for bakeries and cake shops.',
  illustration: <BakeryIllustration />,
  stats: [
    { value: '25%', label: 'Wastage reduction via FIFO' },
    { value: 'Direct link', label: 'Weighing scale sync time' },
    { value: 'Expiry alerts', label: 'Automated batch tracking' },
  ],
  challenges: [
    {
      challenge: 'Manually entering cake weights slows down the cashier counter.',
      solution: 'We integrate directly with weighing scales. Put the box on the scale, the POS reads the weight instantly.'
    },
    {
      challenge: 'High wastage due to items expiring unnoticed on the shelf.',
      solution: 'Track batches with manufacturing dates. Get warning alerts before expiry so you can run discount campaigns.'
    }
  ],
  features: [
    { icon: RefreshCw, title: 'Weighing Scale Integration', desc: 'Direct USB/Serial scale links. Read weights to the gram and calculate prices instantly.' },
    { icon: AlertOctagon, title: 'Batch & Expiry System', desc: 'Set alert parameters per product category to push expiring items quickly.' },
    { icon: Calendar, title: 'Advanced Cake Booking', desc: 'Accept customized orders (birthday messages, photo shapes, custom delivery slots).' },
  ],
  spotlightHeadline: 'Never let premium items go to waste',
  spotlightDesc:
    'Track batch shelf life dynamically. e-Smart warns cashiers if bread or pastry batches are approaching expiry. It can auto-apply discount rules (e.g. 50% off after 8 PM) to sell out remaining stock — turning loss into cash.',
  spotlightVisual: <BakeryIllustration />,
  faqs: [
    { q: 'Can we manage advance custom cake orders?', a: 'Yes. e-Smart has a cake order module where you can record design sketches, deposits, and target pickup schedules.' },
    { q: 'Does it support barcode label printing?', a: 'Yes. Print custom barcode stickers with manufacturing and expiry details to label fresh containers.' }
  ],
  ctaHeadline: 'Organize your bakery kitchen today'
};

/* Resolve icon names that were placeholder in typescript */
import { Calendar } from 'lucide-react';

export function Bakery() { return <SolutionTemplate config={bakeryConfig} />; }


/* ─── 7. FOOD COURTS ILLUSTRATION & COMPONENT ────────── */
function FoodCourtIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Central Cashier &amp; Multi-Stall Status</text>
      
      {/* Central bill */}
      <rect x="36" y="68" width="180" height="200" rx="8" fill="#0f0f2a" stroke="#FF6B35" strokeWidth="0.8" />
      <text x="46" y="86" fill="white" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Central Settle Card</text>
      
      {[
        { stall: 'Stall 1 — Burger', amt: '₹240', status: 'Cooking' },
        { stall: 'Stall 3 — Chinese', amt: '₹180', status: 'Ready' },
        { stall: 'Stall 4 — Dessert', amt: '₹90', status: 'Pending' },
      ].map((s, i) => (
        <g key={i}>
          <rect x="44" y={98 + i * 46} width="164" height="38" rx="5" fill="#141428" />
          <text x="52" y={112 + i * 46} fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">{s.stall}</text>
          <text x="52" y={124 + i * 46} fill="#8888aa" fontSize="7.5" fontFamily="monospace">Status: {s.status}</text>
          <text x="198" y={118 + i * 46} fill="#FF6B35" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="end">{s.amt}</text>
        </g>
      ))}

      {/* Stall performance charts */}
      <rect x="232" y="68" width="212" height="200" rx="8" fill="#141428" />
      <text x="244" y="86" fill="#aaaacc" fontSize="8" fontFamily="monospace">STALL SALES LOGS</text>
      
      {[
        { name: 'Stall 1 (Burger)', val: '₹14,500', pct: 85, color: '#FF6B35' },
        { name: 'Stall 2 (South)', val: '₹11,200', pct: 65, color: '#0F9D8C' },
        { name: 'Stall 3 (Chinese)', val: '₹9,800', pct: 58, color: '#3B82F6' },
        { name: 'Stall 4 (Drinks)', val: '₹4,500', pct: 25, color: '#A78BFA' },
      ].map((chart, i) => (
        <g key={i}>
          <text x="244" y={108 + i * 38} fill="#ccccee" fontSize="8" fontFamily="monospace">{chart.name}</text>
          <text x="432" y={108 + i * 38} fill="white" fontSize="8" fontFamily="monospace" textAnchor="end">{chart.val}</text>
          <rect x="244" y={116 + i * 38} width="176" height="6" rx="3" fill="#1e1e35" />
          <rect x="244" y={116 + i * 38} width={chart.pct * 1.76} height="6" rx="3" fill={chart.color} opacity="0.8" />
        </g>
      ))}
    </ScreenFrame>
  );
}

const foodCourtConfig: SolutionPageConfig = {
  badge: 'Food Court Central POS',
  title: 'Unified payment counters with',
  titleAccent: 'real-time multi-stall routing',
  subtitle:
    'Single card cashier terminals, automated billing splits, separate kitchen displays per vendor stall, and unified pickup screen hubs built for mall food courts.',
  illustration: <FoodCourtIllustration />,
  stats: [
    { value: 'Single card', label: 'Unified wallet settlement' },
    { value: 'Instant split', label: 'Vendor revenue reporting' },
    { value: 'Unified', label: 'Token announcement board' },
  ],
  challenges: [
    {
      challenge: 'Guests waiting in multiple lines to pay different stalls.',
      solution: 'Set up a single centralized cash counter. Guests pay once and get distinct tokens for each stall.'
    },
    {
      challenge: 'End-of-day commission splitting for food court vendors is complex.',
      solution: 'e-Smart splits sales and commission payouts automatically based on predefined stall rules.'
    }
  ],
  features: [
    { icon: Store, title: 'Central Billing Settle', desc: 'Charge orders for multiple stalls in a single transaction — print distinct KOTs per stall.' },
    { icon: RefreshCw, title: 'Central Wallet Cards', desc: 'Issue reloadable food court cards. Guests tap cards to pay at independent stalls.' },
    { icon: BarChart2, title: 'Automatic Vendor Split', desc: 'Real-time reports showing total collections, commission deductions, and vendor payouts.' },
  ],
  spotlightHeadline: 'One payment counter, unlimited food stalls',
  spotlightDesc:
    'Optimize your floor space. With e-Smart, customers order food from multiple stalls at a single central POS terminal, pay in one go, and collect orders as their tokens appear on the central announcement monitor.',
  spotlightVisual: <FoodCourtIllustration />,
  faqs: [
    { q: 'Can vendors run independent POS systems?', a: 'Yes. Vendors can have view-only screens or full POS terminals linked to the central parent admin ledger.' },
    { q: 'Do you support reloadable smart cards?', a: 'Yes, we support RFID card activation, top-ups, and balance refunds directly from the central desk.' }
  ],
  ctaHeadline: 'Simplify your food court checkout today'
};

export function FoodCourts() { return <SolutionTemplate config={foodCourtConfig} />; }


/* ─── 8. MULTI-OUTLET CHAINS ILLUSTRATION & COMPONENT ─ */
function MultiOutletIllustration() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Central Chain HQ Control Panel</text>
      
      {/* Locations performance comparing chart */}
      <text x="36" y="68" fill="#aaaacc" fontSize="8" fontFamily="monospace">OUTLET PERFORMANCE — TODAY</text>
      
      {[
        { loc: 'New Panvel (HQ)', sales: '₹64,200', pct: 90, color: '#FF6B35', count: '147 bills' },
        { loc: 'Kharghar Mall', sales: '₹42,800', pct: 60, color: '#0F9D8C', count: '98 bills' },
        { loc: 'Vashi Station', sales: '₹31,500', pct: 45, color: '#3B82F6', count: '74 bills' },
        { loc: 'Pune FC Road', sales: '₹22,000', pct: 30, color: '#A78BFA', count: '51 bills' },
      ].map((outlet, i) => (
        <g key={i}>
          <rect x="36" y={76 + i * 44} width="408" height="38" rx="6" fill="#0f0f2a" stroke="#1e1e35" strokeWidth="1" />
          <text x="46" y={91 + i * 44} fill="white" fontSize="8.5" fontWeight="bold" fontFamily="monospace">{outlet.loc}</text>
          <text x="46" y={103 + i * 44} fill="#555577" fontSize="7" fontFamily="monospace">{outlet.count}</text>
          
          <rect x="180" y={88 + i * 44} width="160" height="8" rx="4" fill="#1e1e35" />
          <rect x="180" y={88 + i * 44} width={outlet.pct * 1.6} height="8" rx="4" fill={outlet.color} opacity="0.8" />
          
          <text x="430" y={96 + i * 44} fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">{outlet.sales}</text>
        </g>
      ))}
      <rect x="36" y="260" width="408" height="28" rx="6" fill="#0F9D8C15" stroke="#0F9D8C" strokeWidth="0.8" />
      <text x="52" y="278" fill="#0F9D8C" fontSize="8" fontFamily="monospace">Consolidated Network Revenue: ₹1,60,500 (100% online sync)</text>
    </ScreenFrame>
  );
}

const multiOutletConfig: SolutionPageConfig = {
  badge: 'Multi-Outlet Chains',
  title: 'Govern your restaurant empire',
  titleAccent: 'from a single control center',
  subtitle:
    'Consolidated network sales charts, centralized menu pushes, brand ingredient supply chain logs, store stock audit tools, and user rights access control built for scaling food chains.',
  illustration: <MultiOutletIllustration />,
  stats: [
    { value: 'Unlimited', label: 'Outlets support capacity' },
    { value: '1-click', label: 'Master menu updates' },
    { value: 'Real-time', label: 'Consolidated network sales' },
  ],
  challenges: [
    {
      challenge: 'Zero visibility on individual branch sales without daily manager calls.',
      solution: 'All branch sales sync live. View individual location statistics or network aggregates on one screen.'
    },
    {
      challenge: 'Inconsistent menu prices and items across branches.',
      solution: 'Edit the central master catalog and push changes to 10 or 100 stores instantly.'
    }
  ],
  features: [
    { icon: Layers, title: 'Consolidated Dashboard', desc: 'Track sales patterns, active covers, and outlet performance metrics globally.' },
    { icon: RefreshCw, title: 'Central Inventory Supply', desc: 'Manage central base kitchens, issue indents to branches, and monitor transfers.' },
    { icon: Shield, title: 'Granular User Permissions', desc: 'Limit employee access levels per store branch or control HQ system access strictly.' },
  ],
  spotlightHeadline: 'Synchronize menus across 100 branches instantly',
  spotlightDesc:
    'Pushed a pricing update? No need to contact branch cashiers. Simply adjust the master menu in the e-Smart HQ panel, select your target locations or tags (e.g. Pune stores), and push the changes live immediately.',
  spotlightVisual: <MultiOutletIllustration />,
  faqs: [
    { q: 'How does central inventory supply work?', a: 'Branch managers submit stock requests (indents) to the central kitchen. The kitchen processes, packages, and marks the goods dispatched — automatically updating logs at both locations.' },
    { q: 'Can we configure unique prices per location?', a: 'Yes. You can override master prices per outlet or configure separate location groups (e.g., airports vs high-streets).' }
  ],
  ctaHeadline: 'Scale your chain operations today'
};

export function MultiOutlet() { return <SolutionTemplate config={multiOutletConfig} />; }
