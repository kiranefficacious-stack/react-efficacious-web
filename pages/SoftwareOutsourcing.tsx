import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, Lightbulb, Compass, Palette, Code2, Server,
  Cpu, Rocket, CheckCircle2, ArrowRight, Smartphone, Globe,
  ShieldCheck, Clock, Award, Star, Send, Loader2, AlertCircle,
  HelpCircle, ChevronRight, Layers, Sparkles, AppWindow, Play,
  Lock, RefreshCw, BarChart2, Users, Building, Check
} from 'lucide-react';
import { sendEmailNotification } from '../utils/sendMail';

const PROCESS_STEPS = [
  {
    step: '01',
    badge: 'Ideation & Discovery',
    title: 'From Your Thoughts to Note',
    subtitle: 'You bring the raw thoughts, napkin sketches, or rough notes. We turn them into an actionable technical blueprint.',
    icon: Lightbulb,
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    textCol: 'text-amber-600 dark:text-amber-400',
    deliverables: [
      'Comprehensive Requirement Specification Document (SRS)',
      'Technical Feasibility Assessment & Risk Matrix',
      'System Architecture Blueprint & Data Flow Diagrams',
      'Budget Estimation & Milestone-Based Roadmap'
    ]
  },
  {
    step: '02',
    badge: 'Strategy & Identity',
    title: 'Market Positioning & Product Strategy',
    subtitle: 'We define how your product will win in the market — identifying user personas, competitive moats, and monetization models.',
    icon: Compass,
    color: 'from-orange-500 to-rose-600',
    lightBg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    textCol: 'text-orange-600 dark:text-orange-400',
    deliverables: [
      'Target Audience & User Persona Mapping',
      'Competitor Benchmarking & Feature Differentiation',
      'Value Proposition & Go-To-Market (GTM) Strategy',
      'Monetization & Conversion Funnel Architecture'
    ]
  },
  {
    step: '03',
    badge: 'UI/UX Experience',
    title: 'Interactive UI/UX & Prototype Design',
    subtitle: 'Crafting beautiful, modern interfaces with intuitive user flows that convert casual visitors into loyal daily users.',
    icon: Palette,
    color: 'from-purple-500 to-indigo-600',
    lightBg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    textCol: 'text-purple-600 dark:text-purple-400',
    deliverables: [
      'Low-Fidelity & High-Fidelity Wireframes in Figma',
      'Clickable Interactive Prototypes for User Testing',
      'Complete Design System, Component Library & Tokens',
      'Responsive Mobile & Desktop Experience Guidelines'
    ]
  },
  {
    step: '04',
    badge: 'Frontend Engineering',
    title: 'Transforming Designs into Clean Code',
    subtitle: 'Writing high-performance, modular, testable client code for both web and mobile platforms with pixel perfection.',
    icon: Code2,
    color: 'from-blue-500 to-cyan-600',
    lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    textCol: 'text-blue-600 dark:text-blue-400',
    deliverables: [
      'Cross-Platform Mobile Apps in Flutter & Dart',
      'High-Performance Web Apps in React & Angular',
      'Native iOS (Swift) & Android (Kotlin) Optimization',
      'WCAG Accessibility, Offline Cache & Ultra-Fast Loading'
    ]
  },
  {
    step: '05',
    badge: 'Backend & Cloud',
    title: 'Robust Backend, APIs & Custom Algorithms',
    subtitle: 'Architecting scalable server infrastructure, high-concurrency databases, and proprietary algorithms tailored to your domain.',
    icon: Server,
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    textCol: 'text-emerald-600 dark:text-emerald-400',
    deliverables: [
      'High-Throughput Microservices in .NET, Node.js & Python',
      'Custom Algorithms (Matching, Pricing, Search & Recommendation)',
      'Enterprise Database Schema (PostgreSQL, SQL Server, Redis)',
      'Bank-Grade Security, Role-Based Access & Encrypted Storage'
    ]
  },
  {
    step: '06',
    badge: 'Store & Web Launch',
    title: 'Full Live Deployment to App Store, Play Store & Web',
    subtitle: 'Zero-stress production launch. We handle all developer accounts, review guidelines, store assets, and cloud deployment.',
    icon: Rocket,
    color: 'from-rose-500 to-amber-600',
    lightBg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
    textCol: 'text-rose-600 dark:text-rose-400',
    deliverables: [
      'Apple App Store Approval, Certificates & TestFlight Distribution',
      'Google Play Store AAB Builds, Privacy & Policy Compliance',
      'Production Cloud Hosting on AWS/Azure/GCP with Custom Domain & SSL',
      'Live Post-Launch Monitoring, Analytics & 24/7 SLA Support'
    ]
  }
];

const TECH_STACK = [
  { category: 'Mobile Apps', items: ['Flutter', 'Dart', 'React Native', 'Swift (iOS)', 'Kotlin (Android)'] },
  { category: 'Web Frontend', items: ['React', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { category: 'Backend & APIs', items: ['.NET 10 (C#)', 'Node.js', 'Python / Django', 'GraphQL', 'RESTful APIs'] },
  { category: 'Databases & Cache', items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'SQLite'] },
  { category: 'Cloud & Stores', items: ['Apple App Store', 'Google Play Store', 'AWS', 'Microsoft Azure', 'Google Cloud'] }
];

export default function SoftwareOutsourcing() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    timeline: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; phone?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, email, and contact number.');
      return;
    }

    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const summaryMsg = `
Turnkey Software Outsourcing Request:
------------------------------------
Candidate / Client:  ${formData.name.trim()}
Company / Startup:   ${formData.company.trim() || 'N/A'}
Contact Email:       ${formData.email.trim()}
Phone Number:        ${formData.phone.trim()}
Estimated Budget:    ${formData.budget || 'Not specified'}
Desired Timeline:    ${formData.timeline || 'Flexible'}

Project Thoughts / Concept Note:
${formData.notes.trim() || 'No initial notes provided'}
      `.trim();

      const result = await sendEmailNotification({
        type: 'contact',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        mobile: formData.phone.trim(),
        company: formData.company.trim(),
        subject: `Turnkey Software Outsourcing - ${formData.company.trim() || formData.name.trim()}`,
        message: summaryMsg
      });

      if (result.success) {
        setSubmittedData({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim()
        });
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', budget: '', timeline: '', notes: '' });
      } else {
        setErrorMessage(result.error || 'Unable to submit request. Please email directly to info@efficacious.co.in');
      }
    } catch (err: any) {
      console.error('Outsourcing form submit error:', err);
      setErrorMessage('Unable to connect to mail server. Please email info@efficacious.co.in directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ── 1. HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/20 to-orange-500/20 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-bold tracking-wide mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Full-Lifecycle Software Outsourcing &amp; Product Engineering</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12] mb-6"
            >
              Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600">Idea &amp; Notes</span> into a Live App on <span className="underline decoration-amber-500 decoration-wavy decoration-2">App Store, Play Store &amp; Web</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10"
            >
              Have a product concept sketched on paper or saved in your notes? Outsource your complete software development to Efficacious. From positioning and interactive UI/UX to clean code, custom algorithms, robust backend, and live deployment on Apple App Store &amp; Google Play.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#consultation"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Book Free Scope Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#lifecycle"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-800 dark:text-slate-200 font-bold text-base shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                Explore The 6-Step Process
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
            >
              {[
                { label: 'Apps & Platforms Shipped', value: '150+' },
                { label: 'Store Approval Rate', value: '100%' },
                { label: 'Turnaround to MVP', value: '4–8 Weeks' },
                { label: 'Full Code & IP Ownership', value: 'You Own 100%' },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-sora">{value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{label}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. VISUAL JOURNEY HIGHLIGHT ─────────────────────── */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400"><FileText className="w-4 h-4" /> 1. Concept Note</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Compass className="w-4 h-4" /> 2. Market Positioning</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Palette className="w-4 h-4" /> 3. UI/UX Design</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><Code2 className="w-4 h-4" /> 4. Clean Frontend Code</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><Server className="w-4 h-4" /> 5. Backend &amp; Algorithms</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400"><Rocket className="w-4 h-4" /> 6. Live App &amp; Play Store</span>
          </div>
        </div>
      </section>

      {/* ── 3. DETAILED 6-STEP LIFECYCLE ────────────────────── */}
      <section id="lifecycle" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
            The Turnkey Engineering Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-4 tracking-tight">
            How We Take Your Idea to App Stores &amp; Live Web
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            You don't need a technical co-founder, an in-house hiring headache, or separate design and dev agencies. We take 100% end-to-end ownership of your product.
          </p>
        </div>

        <div className="space-y-12">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 1;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual / Badge Side */}
                <div className="w-full lg:w-5/12">
                  <div className={`rounded-3xl p-8 sm:p-10 ${step.lightBg} border ${step.border} relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl sm:text-5xl font-black text-slate-400 dark:text-slate-600 font-mono">
                        {step.step}
                      </span>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-sm mb-3">
                      {step.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Deliverables / Content Side */}
                <div className="w-full lg:w-7/12">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                    Key Outputs &amp; Deliverables
                  </h4>
                  <ul className="space-y-3.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-800">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 4. TECH STACK & ARCHITECTURE ───────────────────── */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
              Modern Technology Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Engineering Built for Million-User Scale
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
              We choose battle-tested, high-performance stacks that keep maintenance costs low and performance ultra-fast.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {TECH_STACK.map((col) => (
              <div key={col.category} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {col.category}
                </h3>
                <ul className="space-y-2.5">
                  {col.items.map(tech => (
                    <li key={tech} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY OUTSOURCE TO EFFICACIOUS ────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
            Enterprise Confidence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Why Founders &amp; Companies Outsource to Us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Lock,
              title: '100% IP & Source Code Ownership',
              desc: 'Every single line of code, design file, API key, and store account is 100% your legal property from Day 1. Zero vendor lock-in.'
            },
            {
              icon: ShieldCheck,
              title: 'Guaranteed Store Approvals',
              desc: 'We navigate Apple App Store & Google Play compliance guidelines, privacy mandates, and in-app purchase protocols for smooth, first-time approval.'
            },
            {
              icon: Clock,
              title: 'Transparent Sprints & Demos',
              desc: 'Weekly live sprint reviews, direct communication with your dedicated tech lead, and staging URLs so you watch your idea come alive in real time.'
            },
            {
              icon: Users,
              title: 'Complete Cross-Functional Squad',
              desc: 'You get a Product Manager, Senior UI/UX Designer, Frontend/Mobile Engineers, Backend Architects, and QA specialists — without hiring costs.'
            },
            {
              icon: Cpu,
              title: 'Proprietary Custom Algorithms',
              desc: 'Need algorithmic pricing, location matching, routing optimization, or AI/ML automation? We design and optimize the mathematical backend.'
            },
            {
              icon: RefreshCw,
              title: 'Long-Term SLA & Maintenance',
              desc: 'We don\'t disappear after launch. We offer 24/7 uptime monitoring, store policy updates, and feature iteration support as you scale.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. CONSULTATION & ESTIMATE FORM ────────────────── */}
      <section id="consultation" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
              Start Your Project
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-4">
              Share Your Thoughts &amp; Notes
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Send us your initial thoughts or requirements. We will review them under strict NDA and prepare a detailed scope breakdown within 24 hours.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Consultation Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
                  Thank you, <strong>{submittedData?.name}</strong>. A confirmation email has been sent to <strong className="text-amber-600">{submittedData?.email}</strong>.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 max-w-md mx-auto mb-6 text-left">
                  <p className="font-bold text-[#9a3412] dark:text-[#ea580c] mb-1">Please wait, our team will contact you soon!</p>
                  <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                    Our lead software architect will review your concept note and call you at <strong>{submittedData?.phone}</strong> to schedule a live scope consultation and NDA execution.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-all cursor-pointer"
                >
                  Submit Another Project Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 text-xs leading-relaxed">{errorMessage}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Rajesh Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Work / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Company / Startup Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g., Nexus Ventures"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Target Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="">Select budget</option>
                      <option value="₹1 Lakh – ₹3 Lakhs">₹1 Lakh – ₹3 Lakhs (MVP / Prototype)</option>
                      <option value="₹3 Lakhs – ₹8 Lakhs">₹3 Lakhs – ₹8 Lakhs (Full App &amp; Web)</option>
                      <option value="₹8 Lakhs – ₹20 Lakhs">₹8 Lakhs – ₹20 Lakhs (Enterprise Suite)</option>
                      <option value="₹20 Lakhs+">₹20 Lakhs+ (Complex Platform)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Target Launch Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="1 Month">1 Month (Urgent Launch)</option>
                      <option value="2–3 Months">2–3 Months (Standard Production)</option>
                      <option value="3–6 Months">3–6 Months (Full Scaled Rollout)</option>
                      <option value="Flexible">Flexible / Ongoing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Your Thoughts &amp; Concept Note *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Describe your idea, what problem it solves, what features you imagine, or paste your concept notes here..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Project Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Project Brief for Architecture Review</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

