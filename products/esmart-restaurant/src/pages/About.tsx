import React from 'react';
import { Heart, Target, Zap, Users, Award, TrendingUp } from 'lucide-react';
import CTABand from '../components/CTABand';

const MILESTONES = [
  { year: '2018', title: 'Founded in Navi Mumbai', desc: 'Efficacious India Limited started with a vision to digitise restaurant operations for Indian food businesses.' },
  { year: '2019', title: 'First 100 restaurants', desc: 'Launched the first version of e-Smart Restaurant POS, onboarding cafés and QSR outlets across Mumbai & Pune.' },
  { year: '2021', title: 'Cloud & multi-outlet launch', desc: 'Rebuilt the platform as a cloud-native product with support for multi-outlet chains and real-time admin dashboards.' },
  { year: '2023', title: '5,000+ restaurants go live', desc: 'Expanded to Tier 2 and Tier 3 cities. Launched CRM, loyalty, and online ordering modules.' },
  { year: '2025', title: '100+ restaurants & growing', desc: 'Serving restaurants across 200+ cities. Processing over 1 million bills every day across India.' },
];

const VALUES = [
  { icon: Target, title: 'Built for India', desc: 'Designed for Indian restaurant workflows — GST compliance, multi-language KOTs, UPI/cash splits, and offline reliability in low-connectivity areas.' },
  { icon: Zap, title: 'Speed first', desc: 'Every interaction in e-Smart is optimised for peak-hour speed. A bill in 30 seconds. A KOT in under 5.' },
  { icon: Heart, title: 'Honest pricing', desc: 'No transaction fees. No per-device charges. Flat, predictable pricing so your software costs never eat into your margins.' },
  { icon: Users, title: 'Team that cares', desc: 'Our support team is made up of people who have worked in or with restaurants. We understand your pressure.' },
];

const TEAM = [
  { initials: 'AK', name: 'Amit Kumar', role: 'Co-Founder & CEO', bio: 'Former restaurant software consultant with 10+ years of product experience in the hospitality sector.' },
  { initials: 'PM', name: 'Priya Mehta', role: 'Co-Founder & CTO', bio: 'Engineering leader passionate about building resilient, offline-first systems for Bharat businesses.' },
  { initials: 'RS', name: 'Rahul Singh', role: 'Head of Customer Success', bio: 'Ensures every restaurant onboards smoothly and gets maximum value from day one.' },
  { initials: 'NJ', name: 'Nisha Joshi', role: 'Head of Sales', bio: 'Helps restaurant owners find the right plan and grows our network of restaurant partners.' },
];

export default function About() {
  return (
    <main className="bg-warm">
      {/* Hero */}
      <section className="min-h-screen lg:h-screen lg:min-h-0 lg:py-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
          <Heart className="w-3.5 h-3.5" />
          Made in India, for India's restaurants
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-6 font-sora leading-tight">
          We help restaurants run{' '}
          <span className="text-gradient">without the chaos</span>
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
          e-Smart Restaurant is built by Efficacious India Limited — a Navi Mumbai-based software company dedicated to making restaurant management simple, affordable, and stress-free for owners across India.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '100+', label: 'Restaurants' },
            { value: '7k+', label: 'Bills/day' },
            { value: '50+', label: 'Cities' },
            { value: '2018', label: 'Founded' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-primary font-sora mb-1">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-charcoal rounded-3xl p-10 sm:p-14 text-center text-white">
          <Award className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-sora">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            To give every restaurant owner — from a 10-table café to a 50-outlet chain — the same operational clarity and speed that was previously only available to large enterprise brands. Technology should never be a barrier to running a great restaurant.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-12 font-sora text-center">Our journey so far</h2>
        {/* SAMPLE milestones — replace with real company history */}
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-orange-100 sm:-translate-x-1/2" />
          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={`flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className="sm:w-1/2" />
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center z-10 shrink-0">
                    {i + 1}
                  </div>
                </div>
                <div className={`sm:w-1/2 ${i % 2 === 0 ? 'sm:pl-8' : 'sm:pr-8 sm:text-right'}`}>
                  <span className="inline-block px-2.5 py-1 bg-orange-100 text-primary text-xs font-bold rounded-full mb-2">{m.year}</span>
                  <h3 className="font-bold text-charcoal mb-1 font-sora">{m.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-10 font-sora text-center">What we stand for</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-warm rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 font-sora">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-10 font-sora text-center">
          Meet the team {/* SAMPLE — replace with real team members and photos */}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(({ initials, name, role, bio }) => (
            <div key={name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-300 to-primary text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 font-sora">
                {initials}
              </div>
              <h3 className="font-bold text-charcoal mb-1 font-sora">{name}</h3>
              <p className="text-primary text-xs font-semibold mb-3">{role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        headline="Want to build the future of restaurants with us?"
        subtext="We're hiring, and always looking for restaurant chain partners and resellers."
        ctaLabel="Book a Demo"
        ctaTo="/contact"
        variant="primary"
      />
    </main>
  );
}
