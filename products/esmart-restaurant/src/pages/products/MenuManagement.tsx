import React from 'react';
import {
  UtensilsCrossed, ToggleRight, Tag, Image, Layers, Globe,
  Store, Coffee, Truck
} from 'lucide-react';
import ProductTemplate, { ScreenFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Menu Editor ──────────────────── */
function MenuIllustration() {
  const items = [
    { name: 'Paneer Tikka', cat: 'Starters', price: '₹240', available: true },
    { name: 'Dal Makhani', cat: 'Mains', price: '₹180', available: true },
    { name: 'Chicken Biryani', cat: 'Mains', price: '₹320', available: false },
    { name: 'Mango Lassi', cat: 'Drinks', price: '₹90', available: true },
    { name: 'Gulab Jamun', cat: 'Desserts', price: '₹80', available: true },
    { name: 'Garlic Naan', cat: 'Breads', price: '₹40', available: true },
  ];

  return (
    <ScreenFrame>
      {/* Header */}
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Menu Manager</text>
      <rect x="320" y="29" width="72" height="18" rx="5" fill="#FF6B35" />
      <text x="356" y="41" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">+ Add Item</text>
      <rect x="398" y="29" width="50" height="18" rx="5" fill="#0F9D8C" />
      <text x="423" y="41" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">Sync All</text>

      {/* Category filter row */}
      {['All', 'Starters', 'Mains', 'Drinks', 'Desserts', 'Breads'].map((cat, i) => (
        <g key={cat}>
          <rect x={22 + i * 68} y={60} width={62} height={18} rx={4} fill={i === 0 ? '#FF6B35' : '#1e1e35'} />
          <text x={22 + i * 68 + 31} y={72} fill={i === 0 ? 'white' : '#8888aa'} fontSize="7" fontFamily="monospace" textAnchor="middle">{cat}</text>
        </g>
      ))}

      {/* Item cards grid */}
      {items.map(({ name, cat, price, available }, i) => (
        <g key={name}>
          <rect x={22 + (i % 3) * 148} y={86 + Math.floor(i / 3) * 82} width={140} height={74} rx={8} fill={available ? '#0f0f2a' : '#0a0a1a'} stroke={available ? '#1e1e35' : '#EF4444'} strokeWidth="0.8" />
          {/* Image placeholder */}
          <rect x={26 + (i % 3) * 148} y={90 + Math.floor(i / 3) * 82} width={36} height={36} rx={5} fill="#1a1a30" />
          <text x={44 + (i % 3) * 148} y={112 + Math.floor(i / 3) * 82} fill="#444466" fontSize="14" fontFamily="monospace" textAnchor="middle">
            {['🧀', '🍛', '🍗', '🥭', '🍮', '🫓'][i]}
          </text>
          {/* Details */}
          <text x={70 + (i % 3) * 148} y={100 + Math.floor(i / 3) * 82} fill="#ccccee" fontSize="8" fontFamily="monospace">{name}</text>
          <rect x={70 + (i % 3) * 148} y={103 + Math.floor(i / 3) * 82} width={cat.length * 5} height={10} rx={3} fill="#FF6B3515" />
          <text x={72 + (i % 3) * 148} y={112 + Math.floor(i / 3) * 82} fill="#FF6B35" fontSize="6" fontFamily="monospace">{cat}</text>
          <text x={70 + (i % 3) * 148} y={126 + Math.floor(i / 3) * 82} fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace">{price}</text>
          {/* Toggle */}
          <rect x={26 + (i % 3) * 148} y={134 + Math.floor(i / 3) * 82} width={140} height={18} rx={0} fill="none" />
          <rect x={80 + (i % 3) * 148} y={136 + Math.floor(i / 3) * 82} width={32} height={12} rx={6} fill={available ? '#0F9D8C' : '#444'} />
          <circle cx={(available ? 104 : 87) + (i % 3) * 148} cy={142 + Math.floor(i / 3) * 82} r={5} fill="white" />
          <text x={68 + (i % 3) * 148} y={145 + Math.floor(i / 3) * 82} fill={available ? '#0F9D8C' : '#EF4444'} fontSize="6.5" fontFamily="monospace" textAnchor="end">{available ? 'Available' : 'Off'}</text>
        </g>
      ))}
    </ScreenFrame>
  );
}

/* ── Spotlight: Multi-Outlet Sync ────────────────────── */
function SyncSpotlight() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Multi-Outlet Menu Sync</text>
      <text x="390" y="41" fill="#0F9D8C" fontSize="8" fontFamily="monospace" textAnchor="end">3 outlets selected</text>

      {/* Change being pushed */}
      <text x="36" y="66" fill="#aaaacc" fontSize="8" fontFamily="monospace">CHANGE: Paneer Tikka price → ₹260 (was ₹240)</text>
      <rect x="36" y="72" width="400" height="24" rx="6" fill="#FF6B3510" stroke="#FF6B35" strokeWidth="0.8" />
      <text x="52" y="88" fill="#FF6B35" fontSize="8" fontFamily="monospace">Paneer Tikka · Starters · Updated price: ₹260 · Apply to:</text>

      {/* Outlet checkboxes */}
      {[
        { name: 'The Spice Garden – New Panvel', status: 'Synced ✓', color: '#0F9D8C' },
        { name: 'The Spice Garden – Kharghar', status: 'Syncing...', color: '#F59E0B' },
        { name: 'The Spice Garden – Panvel Station', status: 'Queued', color: '#555577' },
      ].map(({ name, status, color }, i) => (
        <g key={name}>
          <rect x="36" y={106 + i * 44} width="400" height="36" rx="7" fill={i % 2 === 0 ? '#0f0f2a' : '#0a0a1a'} />
          <rect x="44" y={112 + i * 44} width="16" height="16" rx="4" fill={color === '#0F9D8C' ? '#0F9D8C' : '#1e1e35'} stroke={color} strokeWidth="1" />
          {color === '#0F9D8C' && <text x="52" y={123 + i * 44} fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle">✓</text>}
          <text x="70" y={121 + i * 44} fill="#ccccee" fontSize="8.5" fontFamily="monospace">{name}</text>
          <text x="430" y={121 + i * 44} fill={color} fontSize="8" fontFamily="monospace" textAnchor="end">{status}</text>
          {/* Progress bar for syncing */}
          {status === 'Syncing...' && (
            <>
              <rect x="70" y={128 + i * 44} width="240" height="5" rx="2" fill="#1a1a30" />
              <rect x="70" y={128 + i * 44} width="140" height="5" rx="2" fill="#F59E0B" opacity="0.7" />
            </>
          )}
        </g>
      ))}

      {/* Confirm button */}
      <rect x="36" y="244" width="192" height="30" rx="8" fill="#FF6B35" />
      <text x="132" y="262" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Push to All Outlets</text>
      <rect x="244" y="244" width="192" height="30" rx="8" fill="#1e1e35" />
      <text x="340" y="262" fill="#8888aa" fontSize="9" fontFamily="monospace" textAnchor="middle">Schedule for Later</text>
    </ScreenFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'Menu Management',
  title: 'Update your menu.',
  titleAccent: 'Everywhere. In seconds.',
  subtitle:
    'A centralised menu editor that lets you add items, update prices, toggle availability, and push changes to all your outlets simultaneously — without calling anyone or logging into multiple systems.',
  illustration: <MenuIllustration />,
  stats: [
    { value: 'Central', label: 'Single menu for all outlets' },
    { value: 'Unlimited', label: 'Items, categories & modifiers' },
    { value: 'Instant', label: 'Push updates across outlets' },
  ],
  features: [
    { icon: UtensilsCrossed, title: 'Central Menu Editor', desc: 'Add, edit, and organise all your menu items, categories, and subcategories from one screen.' },
    { icon: ToggleRight, title: 'Item Availability Toggle', desc: 'Mark items as available or unavailable in real-time — when ingredients run out, update the menu in one tap.' },
    { icon: Tag, title: 'Modifier & Add-on Setup', desc: 'Create customisation options (size, spice level, add-ons) with individual prices for each modifier.' },
    { icon: Layers, title: 'Recipe Linking', desc: 'Link each menu item to its recipe so inventory auto-deducts when a bill is generated.' },
    { icon: Globe, title: 'Multi-Outlet Push', desc: 'Update one menu item and push the change to all selected outlets simultaneously.' },
    { icon: Image, title: 'Item Images & Descriptions', desc: 'Upload images and write descriptions for every item — displayed on your online ordering page.' },
  ],
  steps: [
    { num: '1', title: 'Open menu editor', desc: 'Log in to the admin panel from any device and navigate to the menu section.' },
    { num: '2', title: 'Make your changes', desc: 'Update prices, toggle availability, add new items or modifiers — all with guided forms.' },
    { num: '3', title: 'Select outlets to update', desc: 'Choose which outlets receive the update — all at once or select specific locations.' },
    { num: '4', title: 'Changes go live instantly', desc: 'POS terminals, KDS screens, and your online ordering page all update in real-time.' },
  ],
  spotlightHeadline: 'One change. All outlets. Done.',
  spotlightDesc:
    'Running a chain means menu updates can be a nightmare — logging into each outlet, calling managers, hoping they update correctly. With e-Smart, you make one change and push it to every outlet in seconds.',
  spotlightBullets: [
    'Push a price update to 20 outlets in under 10 seconds',
    'Schedule menu changes in advance (e.g., seasonal items)',
    'Track which outlet has which version of the menu at any time',
    'Outlet managers can also toggle local availability without changing the master menu',
    'Full change history — see who changed what and when',
  ],
  spotlightVisual: <SyncSpotlight />,
  segments: [
    { icon: Store, type: 'Multi-Outlet Chains', desc: 'Manage one master menu and push updates to every location simultaneously.' },
    { icon: Coffee, type: 'Cafés & QSRs', desc: 'Update your digital menu board and ordering system in real-time from your phone.' },
    { icon: Truck, type: 'Cloud Kitchens', desc: 'Manage separate menus for each virtual brand from one centralised editor.' },
  ],
  faqs: [
    { q: 'Can branch managers update their own menu?', a: 'Yes. You can grant outlet managers permission to toggle local item availability without being able to change prices or add items to the master menu.' },
    { q: 'Can I schedule a menu change in advance?', a: 'Yes. You can schedule price changes or seasonal menu additions to go live at a specific date and time — useful for festival promotions or lunch/dinner menus.' },
    { q: 'Does the online ordering page update automatically?', a: 'Yes. Changes to item availability and prices reflect on your branded online ordering page within seconds of saving.' },
    { q: 'Can I have different prices for dine-in and online orders?', a: 'Yes. You can set separate price lists for dine-in, online delivery, and takeaway orders — all managed from the same menu editor.' },
  ],
  ctaHeadline: 'Take control of your menu today',
  ctaSubtext: 'One menu. All outlets. Always in sync.',
};

export default function MenuManagement() {
  return <ProductTemplate config={config} />;
}
