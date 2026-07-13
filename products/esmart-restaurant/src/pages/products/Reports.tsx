import React from 'react';
import {
  BarChart2, PieChart, TrendingUp, Clock, Users, FileText,
  Store, Layers, Smartphone
} from 'lucide-react';
import ProductTemplate, { ScreenFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Analytics Dashboard ──────────── */
function ReportsIllustration() {
  const bars = [65, 82, 55, 90, 78, 95, 70];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScreenFrame>
      {/* Header bar */}
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Reports &amp; Analytics</text>
      <rect x="370" y="29" width="76" height="18" rx="5" fill="#0F9D8C" />
      <text x="408" y="41" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">Export PDF ↓</text>

      {/* KPI cards row */}
      {[
        { label: 'Today Revenue', value: '₹34,200', sub: '↑ 18% vs yesterday', color: '#FF6B35' },
        { label: 'Covers', value: '147', sub: '↑ 12 from last week', color: '#0F9D8C' },
        { label: 'Avg Bill Value', value: '₹233', sub: '↑ ₹18 vs last week', color: '#A78BFA' },
      ].map(({ label, value, sub, color }, i) => (
        <g key={label}>
          <rect x={22 + i * 148} y={60} width={140} height={58} rx={8} fill="#0f0f2a" />
          <text x={22 + i * 148 + 12} y={77} fill="#8888aa" fontSize="7.5" fontFamily="monospace">{label}</text>
          <text x={22 + i * 148 + 12} y={97} fill={color} fontSize="14" fontWeight="bold" fontFamily="monospace">{value}</text>
          <text x={22 + i * 148 + 12} y={110} fill="#555577" fontSize="7" fontFamily="monospace">{sub}</text>
        </g>
      ))}

      {/* Weekly bar chart */}
      <text x="36" y="136" fill="#aaaacc" fontSize="8" fontFamily="monospace">REVENUE — THIS WEEK</text>
      {bars.map((h, i) => (
        <g key={i}>
          <rect x={36 + i * 32} y={224 - h} width={22} height={h} rx={4} fill={i === 5 ? '#FF6B35' : '#1e3a5f'} opacity={i === 5 ? 1 : 0.7} />
          <text x={36 + i * 32 + 11} y={234} fill={i === 5 ? '#FF6B35' : '#555577'} fontSize="7" fontFamily="monospace" textAnchor="middle">{days[i]}</text>
        </g>
      ))}

      {/* Pie chart area */}
      <circle cx="380" cy="180" r="50" fill="#0f0f2a" />
      <path d="M380,180 L380,130 A50,50 0 0,1 424,205 Z" fill="#FF6B35" />
      <path d="M380,180 L424,205 A50,50 0 0,1 358,229 Z" fill="#0F9D8C" />
      <path d="M380,180 L358,229 A50,50 0 0,1 336,155 Z" fill="#A78BFA" />
      <path d="M380,180 L336,155 A50,50 0 0,1 380,130 Z" fill="#F59E0B" />
      <circle cx="380" cy="180" r="28" fill="#0a0a1a" />
      <text x="380" y="176" fill="#aaaacc" fontSize="7" fontFamily="monospace" textAnchor="middle">Dish</text>
      <text x="380" y="187" fill="white" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Mix</text>

      {/* Legend */}
      {[
        ['Mains', '#FF6B35'], ['Drinks', '#0F9D8C'], ['Starters', '#A78BFA'], ['Desserts', '#F59E0B'],
      ].map(([label, color], i) => (
        <g key={label}>
          <rect x={36 + i * 85} y={250} width={8} height={8} rx={2} fill={color} />
          <text x={50 + i * 85} y={258} fill="#8888aa" fontSize="7" fontFamily="monospace">{label}</text>
        </g>
      ))}
    </ScreenFrame>
  );
}

/* ── Spotlight: Staff Performance view ───────────────── */
function StaffSpotlight() {
  const staff = [
    { name: 'Ravi Kumar', covers: 42, avg: '₹268', rating: 4.8, color: '#FF6B35' },
    { name: 'Priya Sharma', covers: 38, avg: '₹245', rating: 4.6, color: '#0F9D8C' },
    { name: 'Amit Patel', covers: 31, avg: '₹220', rating: 4.3, color: '#A78BFA' },
    { name: 'Nisha Joshi', covers: 28, avg: '₹198', rating: 4.1, color: '#F59E0B' },
  ];

  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">Waiter Performance — Today</text>
      <text x="420" y="41" fill="#555577" fontSize="8" fontFamily="monospace" textAnchor="end">Shift: 12PM–10PM</text>

      {/* Column headers */}
      <text x="36" y="66" fill="#555577" fontSize="7.5" fontFamily="monospace">WAITER</text>
      <text x="200" y="66" fill="#555577" fontSize="7.5" fontFamily="monospace">COVERS</text>
      <text x="280" y="66" fill="#555577" fontSize="7.5" fontFamily="monospace">AVG BILL</text>
      <text x="370" y="66" fill="#555577" fontSize="7.5" fontFamily="monospace">RATING</text>

      {staff.map(({ name, covers, avg, rating, color }, i) => (
        <g key={name}>
          <rect x="22" y={74 + i * 46} width="436" height="40" rx="6" fill={i % 2 === 0 ? '#0f0f2a' : '#0a0a1a'} />
          {/* Avatar */}
          <circle cx="46" cy={94 + i * 46} r="12" fill={`${color}20`} />
          <text x="46" y={98 + i * 46} fill={color} fontSize="10" fontFamily="monospace" textAnchor="middle">
            {name.charAt(0)}
          </text>
          <text x="66" y={90 + i * 46} fill="#ccccee" fontSize="9" fontFamily="monospace">{name}</text>
          <text x="66" y={102 + i * 46} fill="#555577" fontSize="7" fontFamily="monospace">Active</text>
          {/* Covers bar */}
          <rect x="190" y={86 + i * 46} width="60" height="12" rx="3" fill="#1a1a30" />
          <rect x="190" y={86 + i * 46} width={Math.round((covers / 50) * 60)} height="12" rx="3" fill={color} opacity="0.7" />
          <text x="258" y={97 + i * 46} fill={color} fontSize="8" fontFamily="monospace">{covers}</text>
          {/* Avg bill */}
          <text x="280" y={95 + i * 46} fill="#ccccee" fontSize="9" fontWeight="bold" fontFamily="monospace">{avg}</text>
          {/* Rating */}
          <text x="370" y={95 + i * 46} fill="#F59E0B" fontSize="9" fontFamily="monospace">★ {rating}</text>
        </g>
      ))}
    </ScreenFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'Reports & Analytics',
  title: 'Run on data,',
  titleAccent: 'not gut feel.',
  subtitle:
    'Real-time dashboards, 50+ report types, and automated daily MIS reports give you complete visibility into your restaurant\'s performance — from any device, anywhere in the world.',
  illustration: <ReportsIllustration />,
  stats: [
    { value: '50+', label: 'Report types available' },
    { value: 'Real-time', label: 'Live dashboard updates' },
    { value: 'Auto', label: 'Daily MIS via email' },
  ],
  features: [
    { icon: BarChart2, title: 'Daily MIS Report', desc: 'Automated morning email with yesterday\'s revenue, covers, top items, and collection summary.' },
    { icon: TrendingUp, title: 'Item-Wise Sales Analysis', desc: 'See your best-selling and least-selling dishes by revenue, quantity, and profit margin.' },
    { icon: Users, title: 'Staff Performance Reports', desc: 'Track covers served, average bill value, and customer ratings per waiter — shift by shift.' },
    { icon: Clock, title: 'Peak Hour Analysis', desc: 'Identify your busiest hours and days so you can plan staffing, inventory, and promotions.' },
    { icon: PieChart, title: 'Outlet Comparison', desc: 'For chains — compare revenue, footfall, and efficiency across all your outlets side by side.' },
    { icon: FileText, title: 'Export to Excel & PDF', desc: 'Download any report in Excel or PDF format and share with your accountant in one click.' },
  ],
  steps: [
    { num: '1', title: 'Bills are generated', desc: 'Every transaction is captured automatically — no manual data entry.' },
    { num: '2', title: 'Data auto-categorised', desc: 'Items, staff, time, payment mode, and outlet data are categorised in real-time.' },
    { num: '3', title: 'Dashboard updates live', desc: 'Charts and KPIs refresh with every new bill. View from phone, tablet, or desktop.' },
    { num: '4', title: 'MIS emailed at midnight', desc: 'A full daily summary lands in your inbox every morning before you arrive.' },
  ],
  spotlightHeadline: 'Know your best — and worst — performers',
  spotlightDesc:
    'Staff performance data is collected automatically with every bill. Know which waiter serves the most covers, achieves the highest average bill, and gets the best customer feedback — without asking anyone.',
  spotlightBullets: [
    'Covers served, avg bill, and upsell rate per waiter per shift',
    'Auto-generate performance summaries for appraisals',
    'Spot underperformance before it affects customer satisfaction',
    'Peak hour staffing data to schedule the right team at the right time',
    'Works across all outlets — compare performance by location too',
  ],
  spotlightVisual: <StaffSpotlight />,
  segments: [
    { icon: Store, type: 'Restaurant Owners', desc: 'Get a clear picture of revenue, costs, and profitability — even if you\'re not on-site.' },
    { icon: Layers, type: 'Chain Operators', desc: 'Compare outlet performance, identify top locations, and spot underperformers across your network.' },
    { icon: Smartphone, type: 'Remote Managers', desc: 'Access live dashboards from your phone — check revenue, covers, and staff at any time.' },
  ],
  faqs: [
    { q: 'How are reports generated — do I need to do anything?', a: 'Reports are fully automated. Every bill you generate automatically feeds into your analytics. The daily MIS email is sent at midnight without any manual intervention.' },
    { q: 'Can I get reports for a specific date range?', a: 'Yes. You can filter any report by day, week, month, or custom date range. You can also compare two periods side-by-side (e.g., this month vs last month).' },
    { q: 'Can I share reports with my accountant?', a: 'Yes. Export any report as PDF or Excel with one click and email it. You can also set up automatic email recipients for the daily MIS.' },
    { q: 'Are reports available for multi-outlet chains?', a: 'Yes. You can view consolidated reports across all outlets, or drill down into individual outlet data — both in the same dashboard.' },
  ],
  ctaHeadline: 'See your restaurant\'s full picture',
  ctaSubtext: 'Real-time data. Automated reports. Complete clarity — from any device.',
};

export default function Reports() {
  return <ProductTemplate config={config} />;
}
