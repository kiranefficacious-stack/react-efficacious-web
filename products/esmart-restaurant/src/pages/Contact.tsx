import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';

const CONTACT_FAQS = [
  { q: 'How do I request a demo?', a: 'Fill in the form on this page and our team will reach out within 2 business hours to schedule a personalised walkthrough.' },
  { q: 'What support channels do you offer?', a: 'We offer phone support, email support, and WhatsApp chat. Enterprise customers get a dedicated account manager.' },
  { q: 'Is onboarding support free?', a: 'Yes. All plans include free onboarding — our team helps you upload your menu, configure hardware, and train your staff.' },
];

const CHANNELS = [
  { icon: Phone, title: 'Call us', detail: '+91 84549 43806', sub: 'Mon–Sat, 9 AM – 8 PM IST', href: 'tel:+918454943806' },
  { icon: Mail, title: 'Email us', detail: 'info@efficacious.co.in', sub: 'We reply within 4 hours', href: 'mailto:info@efficacious.co.in' },
  { icon: MessageCircle, title: 'WhatsApp Chat', detail: 'Chat with support', sub: 'Mon–Sat, 9 AM – 8 PM IST', href: '#' },
];

type FormData = {
  name: string; email: string; phone: string; restaurant: string;
  city: string; outlets: string; time: string; message: string;
  submitted: boolean; errors: Record<string, string>;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', restaurant: '', city: '', outlets: '', time: '', message: '',
    submitted: false, errors: {},
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (field: string, value: string) =>
    setForm(s => ({ ...s, [field]: value, errors: { ...s.errors, [field]: '' } }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = 'Valid phone required';
    if (!form.restaurant.trim()) errs.restaurant = 'Restaurant name is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setForm(s => ({ ...s, errors: errs })); return; }
    setForm(s => ({ ...s, submitted: true }));
  };

  const field = (id: string, label: string, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-1.5">{label}</label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={(form as Record<string, string>)[id]}
        onChange={e => set(id, e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none bg-white transition-colors ${
          form.errors[id] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
        }`}
      />
      {form.errors[id] && <p className="text-red-500 text-xs mt-1">{form.errors[id]}</p>}
    </div>
  );

  return (
    <main className="bg-warm">
      {/* Hero & Form Grid unified in min-h-screen */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 font-sora">Let's talk about your restaurant</h1>
          <p className="text-lg text-gray-500">Book a free personalised demo, ask a sales question, or get help from our team.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-charcoal mb-6 font-sora">Book a Free Demo</h2>

            {form.submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2 font-sora">We got your request!</h3>
                <p className="text-gray-500 text-sm">Our team will call you at <strong>{form.phone}</strong> within 2 business hours to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('name', 'Full Name *')}
                  {field('email', 'Email Address *', 'email', 'you@restaurant.com')}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('phone', 'Phone Number *', 'tel', '+91 00000 00000')}
                  {field('restaurant', 'Restaurant Name *')}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('city', 'City')}
                  <div>
                    <label htmlFor="outlets" className="block text-sm font-medium text-charcoal mb-1.5">Number of Outlets</label>
                    <select
                      id="outlets" value={form.outlets} onChange={e => set('outlets', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white"
                    >
                      <option value="">Select</option>
                      <option>1</option><option>2-5</option><option>6-20</option><option>20+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-1.5">Preferred Callback Time</label>
                  <select
                    id="time" value={form.time} onChange={e => set('time', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white"
                  >
                    <option value="">Any time</option>
                    <option>Morning (9 AM – 12 PM)</option>
                    <option>Afternoon (12 PM – 4 PM)</option>
                    <option>Evening (4 PM – 8 PM)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">Anything else?</label>
                  <textarea
                    id="message" rows={3} value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Tell us about your restaurant, current challenges, or any specific questions..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  Request My Free Demo <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-gray-400">No commitment. Free onboarding. Cancel anytime.</p>
              </form>
            )}
          </div>

          {/* Right: Contact info + support */}
          <div className="space-y-6">
            {/* Support channels */}
            <div className="grid gap-4">
              {CHANNELS.map(({ icon: Icon, title, detail, sub, href }) => (
                <a
                  key={title} href={href}
                  className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4 hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal text-sm font-sora">{title}</div>
                    <div className="text-primary font-medium text-sm">{detail}</div>
                    <div className="text-gray-400 text-xs">{sub}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Address & Hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-charcoal mb-4 font-sora flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Office Address
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Sushma Niwas, Road No. 6, Sector-1,<br />
                New Panvel, Raigad,<br />
                Maharashtra — 410206
              </p>
              <h3 className="font-bold text-charcoal mb-3 font-sora flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Business Hours
              </h3>
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-charcoal">9:00 AM – 8:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday – Sunday</span><span className="text-gray-400">Closed</span></div>
              </div>
            </div>

            {/* Mini FAQ */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-charcoal mb-4 font-sora">Quick answers</h3>
              <div className="space-y-2">
                {CONTACT_FAQS.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 text-sm"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-charcoal">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                      <p className="px-4 pb-4 text-gray-500 text-xs leading-relaxed border-t border-gray-100 pt-2">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
