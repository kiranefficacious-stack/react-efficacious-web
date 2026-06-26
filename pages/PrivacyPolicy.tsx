import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Database, 
  Lock, 
  Share2, 
  UserCheck, 
  Mail, 
  ArrowRight,
  ChevronRight,
  MessageCircle,
  MapPin,
  Phone
} from 'lucide-react';

const motion = m as any;

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: Shield,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty">
            <strong>Efficacious India Limited</strong> ("we", "us", "our") is committed to protecting your personal data. This policy explains how we collect and use your information.
          </p>
        </>
      )
    },
    {
      id: 'info-collection',
      title: '2. Data We Collect',
      icon: Database,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty mb-4">
            We collect the following information to facilitate business and customer services:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-800 dark:text-white mb-2">Collected Data Elements:</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-wrap pretty leading-relaxed">
              Name, phone number, email address, and messages submitted through our website contact form or WhatsApp Business.
            </p>
          </div>
        </>
      )
    },
    {
      id: 'how-we-use',
      title: '3. How We Use It',
      icon: Eye,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty mb-4">
            We use your collected information for the following specific purposes:
          </p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>To respond to enquiries.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>To provide product support.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>To send service updates.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>To communicate via WhatsApp Business API operated by Meta Platforms, Inc.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: 'whatsapp',
      title: '4. WhatsApp Messaging',
      icon: MessageCircle,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty mb-4">
            By providing your phone number and consenting on our contact form, you agree to receive business communications from us on WhatsApp.
          </p>
          <div className="p-4 rounded-xl bg-[#E99400]/5 border border-[#E99400]/20 text-[#E99400]">
            <p className="text-sm font-semibold mb-1">Opt-Out Instantly:</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 text-wrap pretty">
              You may opt out at any time by replying <strong>STOP</strong> or emailing us at <a href="mailto:info@efficacious.co.in" className="underline font-medium text-[#E99400]">info@efficacious.co.in</a>.
            </p>
          </div>
        </>
      )
    },
    {
      id: 'sharing',
      title: '5. Data Sharing',
      icon: Share2,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty mb-4">
            We prioritize your privacy:
          </p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span><strong>We do not sell your data.</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>We share it only with service providers necessary to operate our business (e.g., Meta for WhatsApp delivery).</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: 'rights',
      title: '6. Your Rights',
      icon: UserCheck,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty">
            You may request access, correction, or deletion of your data by contacting us directly at <a href="mailto:info@efficacious.co.in" className="text-[#E99400] hover:underline font-semibold">info@efficacious.co.in</a>.
          </p>
        </>
      )
    },
    {
      id: 'contact',
      title: '7. Contact Us',
      icon: Mail,
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-wrap pretty mb-6">
            If you have questions about this policy or wish to exercise your rights, please reach out to us at:
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white">Efficacious India Limited</h4>
            
            <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
              <MapPin className="w-5 h-5 text-[#E99400] shrink-0 mt-0.5" />
              <span>Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6, Sector-1, New Panvel, Raigad, Maharashtra - 410206.</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Phone className="w-5 h-5 text-[#E99400] shrink-0" />
              <span>+91 8454943806</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Mail className="w-5 h-5 text-[#E99400] shrink-0" />
              <a href="mailto:info@efficacious.co.in" className="hover:text-[#E99400] underline">info@efficacious.co.in</a>
            </div>
          </div>
        </>
      )
    }
  ];

  const handleSectionScroll = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-950 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E99400] text-xs font-bold uppercase tracking-wider mb-6">
              <Shield className="w-3.5 h-3.5" /> Trust & Compliance
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-wrap balance">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed text-wrap pretty">
              We respect your privacy and are committed to safeguarding your personal data. Learn about how we handle your information.
            </p>
            <div className="text-xs text-slate-400 mt-6">
              Last Updated: June 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 items-start">
          {/* Navigation Sidebar (Sticky on Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSectionScroll(sec.id)}
                      className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                        isActive
                          ? 'bg-[#E99400]/10 text-[#E99400] font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        {sec.title.replace(/^\d+\.\s+/, '')}
                      </span>
                      {isActive && <ArrowRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Details Content Panel */}
          <div className="col-span-1 lg:col-span-3 space-y-8">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-[#E99400]/30 dark:hover:border-[#E99400]/30 transition-colors duration-300"
                >
                  {/* Subtle hover background highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#E99400]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center gap-3.5 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[#E99400] shrink-0 border border-slate-100 dark:border-slate-700/50">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                      {sec.title}
                    </h2>
                  </div>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                    {sec.content}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
