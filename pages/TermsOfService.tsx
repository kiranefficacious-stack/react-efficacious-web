import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText,
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  Lock, 
  Layers, 
  Server, 
  AlertOctagon, 
  Scale, 
  RefreshCw, 
  Globe, 
  Mail, 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Building, 
  ExternalLink,
  Printer
} from 'lucide-react';

const motion = m as any;

interface Section {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

const TermsOfService: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

  const sections: Section[] = [
    {
      id: 'acceptance',
      number: '01',
      title: 'Acceptance of Terms',
      shortTitle: 'Acceptance',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) and <strong>Efficacious India Limited</strong> (&ldquo;Efficacious India&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By accessing, registering for, browsing, downloading, or using our applications, websites, APIs, platforms, or related services (collectively, the &ldquo;Services&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms and our applicable policies.
          </p>
          <div className="p-4 rounded-xl bg-[#E99400]/10 border border-[#E99400]/30 text-slate-800 dark:text-slate-200">
            <p className="text-sm font-semibold text-[#E99400] mb-1">Important Notice:</p>
            <p className="text-sm">
              If you do not agree with these Terms, please do not access, browse, or use any of the Services.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'eligibility',
      number: '02',
      title: 'User Eligibility',
      shortTitle: 'Eligibility',
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            You may use the Services only if you are legally capable of entering into a binding agreement under the laws applicable to you.
          </p>
          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 text-sm">
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>You must provide accurate, current, and complete information when creating an account or submitting inquiries.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>You must comply with all applicable local, state, national, and international laws and regulations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-[#E99400] shrink-0 mt-1" />
              <span>If you use the Services on behalf of a business, educational institution, or other organization, you confirm that you have full legal authority to bind that organization to these Terms.</span>
            </li>
          </ul>
          <p className="text-slate-500 dark:text-slate-400 text-xs italic">
            Our Services are not intended for individuals who are legally prohibited from using them under applicable law.
          </p>
        </div>
      )
    },
    {
      id: 'permitted-use',
      number: '03',
      title: 'Permitted Use',
      shortTitle: 'Permitted Use',
      icon: CheckCircle2,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            You may use the Services only for lawful purposes and in strict accordance with these Terms:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E99400] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Use Services for legitimate business, institutional, or personal purposes.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E99400] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Provide truthful, verified, and accurate data at all times.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E99400] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Respect the intellectual property, rights, and privacy of other users.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E99400] shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Comply with applicable industry standards, laws, and regulations.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'prohibited',
      number: '04',
      title: 'Prohibited Activities',
      shortTitle: 'Prohibited Activities',
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            You must not use the Services to engage in, facilitate, or promote unlawful, harmful, or abusive activities. Specifically, you agree not to:
          </p>
          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 text-sm">
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Violate any applicable national, state, or international laws or regulations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Commit fraud, impersonation, phishing, or other deceptive and misleading activities.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Attempt to gain unauthorized access to servers, databases, accounts, source code, or internal systems.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Introduce viruses, trojans, worms, logic bombs, malware, or other malicious and harmful code.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Harass, stalk, threaten, defame, abuse, or harm another individual or entity.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Promote hate speech, discrimination, harassment, or violence against any group or individual.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Bypass, alter, or circumvent security features, rate limits, access controls, or usage limits.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Use the Services in any manner that violates Meta&apos;s applicable policies, including its Developer Policies and Community Standards, where applicable.</span>
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200">
            <p className="text-sm font-bold flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              Policy Compliance:
            </p>
            <p className="text-sm">
              Where our Services integrate with Meta products, WhatsApp Business Platform, or third-party business tools, your use must strictly comply with all applicable third-party platform policies and terms of service.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      number: '05',
      title: 'Intellectual Property',
      shortTitle: 'Intellectual Property',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Unless otherwise expressly stated, all rights, title, and interest in and to the Services are owned by or licensed to <strong>Efficacious India Limited</strong>.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This includes, without limitation, proprietary software, source code, user interfaces, system architectures, graphics, branding, logos, trademarks, documentation, and product designs (including eSmart School, eSmart Restaurant, eSmart Health, eSmart Queue, and eSmart Track).
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
            These Terms grant you a limited, non-exclusive, non-transferable, and revocable right to access and use the Services as authorized. They do not transfer any intellectual property rights or ownership to you.
          </div>
        </div>
      )
    },
    {
      id: 'data',
      number: '06',
      title: 'Data Handling & Privacy',
      shortTitle: 'Data & Privacy',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We collect and process information necessary to provide, maintain, optimize, secure, and improve our Services.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Our data practices, collection methods, and your data protection rights are detailed in our{' '}
            <Link to="/privacy-policy" className="text-[#E99400] hover:underline font-semibold inline-flex items-center gap-1">
              Privacy Policy <ExternalLink className="w-3.5 h-3.5" />
            </Link>.
          </p>
          <div className="p-4 rounded-xl bg-[#E99400]/10 border border-[#E99400]/25 text-slate-800 dark:text-slate-200">
            <p className="text-sm font-semibold text-[#E99400] mb-1">Security Commitment:</p>
            <p className="text-sm">
              We employ industry-standard organizational and technical safeguards to protect your data against unauthorized access, loss, alteration, or disclosure. However, no internet transmission or electronic storage is completely impenetrable.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'third-party',
      number: '07',
      title: 'Third-Party Services',
      shortTitle: 'Third-Party Services',
      icon: Layers,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Our Services may integrate with or depend on external third-party platforms, APIs, payment gateways, messaging providers (such as Meta WhatsApp Business), hosting providers, and cloud infrastructure.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Third-party providers operate under their own independent terms of service and privacy policies. Your use of external integrations is governed by the respective provider&apos;s legal terms.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Efficacious India Limited is not liable or responsible for the availability, uptime, content, or policies of third-party platforms beyond our reasonable operational control.
          </p>
        </div>
      )
    },
    {
      id: 'availability',
      number: '08',
      title: 'Service Availability',
      shortTitle: 'Service Availability',
      icon: Server,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We aim to maintain the highest levels of platform reliability and service uptime. However, we do not warrant that our Services will be uninterrupted, error-free, completely bug-free, or continuously available at all times.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Services may temporarily experience interruptions or degradation due to planned maintenance, software upgrades, telecommunication network issues, cloud provider outages, or events beyond our reasonable control (force majeure).
          </p>
        </div>
      )
    },
    {
      id: 'termination',
      number: '09',
      title: 'Suspension & Termination',
      shortTitle: 'Termination',
      icon: AlertOctagon,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We reserve the right to suspend or terminate your access to the Services, with or without notice, if we reasonably determine that you:
          </p>
          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 text-sm">
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Have breached or violated any provision of these Terms or related policies.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Have engaged in unlawful, fraudulent, or abusive activities.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Have attempted to compromise system security, platform stability, or other users&apos; accounts.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Have submitted materially deceptive or misleading business or identity information.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <span>Create legal, regulatory, or operational risk for Efficacious India or other organizations.</span>
            </li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Where practical and legally permissible, we will provide reasonable advance notice prior to account suspension or termination.
          </p>
        </div>
      )
    },
    {
      id: 'liability',
      number: '10',
      title: 'Limitation of Liability',
      shortTitle: 'Liability',
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To the maximum extent permitted by applicable law, <strong>Efficacious India Limited</strong> and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your access to or inability to use the Services.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold">
            This disclaimer applies, where legally permissible, to damages arising from:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300 text-sm">
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              • Service downtime or disruptions
            </li>
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              • Loss of data, records, or profits
            </li>
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              • Technical failures or software bugs
            </li>
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              • Third-party provider disruptions
            </li>
          </ul>
          <p className="text-slate-500 dark:text-slate-400 text-xs italic">
            Nothing in these Terms excludes or limits any liability that cannot legally be excluded or restricted under Indian law.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      number: '11',
      title: 'Changes to These Terms',
      shortTitle: 'Changes to Terms',
      icon: RefreshCw,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We may update or revise these Terms periodically to reflect additions to our Services, legislative updates, security best practices, or operational modifications.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When material changes are made, we will provide reasonable notice via our website, email communications, or relevant platform notifications, with an updated &ldquo;Last Updated&rdquo; date.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Your continued use of our Services following the posting of updated Terms constitutes your acceptance and agreement to the revised Terms.
          </p>
        </div>
      )
    },
    {
      id: 'governing-law',
      number: '12',
      title: 'Governing Law & Jurisdiction',
      shortTitle: 'Governing Law',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            These Terms and any dispute or claim arising out of or related to them or the Services shall be governed by and construed in accordance with the <strong>laws of India</strong>, without giving effect to any conflict of law principles.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Any legal dispute, action, or proceeding arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Maharashtra, India</strong>.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      number: '13',
      title: 'Contact Information',
      shortTitle: 'Contact',
      icon: Mail,
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            If you have questions, concerns, feedback, or legal inquiries regarding these Terms of Service, please reach out to Efficacious India Limited:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2.5 text-[#E99400] font-bold">
                <Building className="w-5 h-5" />
                <span>Company Headquarters</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Efficacious India Limited
              </p>
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#E99400] shrink-0 mt-0.5" />
                <span>Ground Floor, Plot No. 7, Sushma Niwas, Road No. 6, Sector-1, New Panvel, Raigad, Maharashtra - 410206</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2.5 text-[#E99400] font-bold">
                <Mail className="w-5 h-5" />
                <span>Communications &amp; Support</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E99400] shrink-0" />
                  <a href="mailto:info@efficacious.co.in" className="hover:text-[#E99400] underline font-medium">
                    info@efficacious.co.in
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#E99400] shrink-0" />
                  <a href="tel:+918454943806" className="hover:text-[#E99400] font-medium">
                    +91 8454943806
                  </a>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <Globe className="w-4 h-4 text-[#E99400] shrink-0" />
                  <a href="https://efficacious.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#E99400]">
                    https://efficacious.co.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleSectionScroll = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E99400] text-xs font-bold uppercase tracking-wider mb-6">
              <Shield className="w-3.5 h-3.5" /> Legal &amp; Compliance
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-wrap balance">
              Terms of <span className="text-[#E99400]">Service</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed text-wrap pretty">
              These Terms of Service explain the rules, rights, and conditions that govern your access to and use of applications, websites, products, and services provided by Efficacious India Limited.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="font-semibold text-white">Effective Date:</span> October 5, 2026
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="font-semibold text-white">Last Updated:</span> October 5, 2026
              </div>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-colors cursor-pointer"
                title="Print Terms of Service"
              >
                <Printer className="w-3.5 h-3.5 text-[#E99400]" /> Print Document
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 items-start">
          
          {/* Navigation Sidebar (Sticky on Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  On This Page
                </h3>
                <span className="text-[11px] font-semibold text-[#E99400] bg-[#E99400]/10 px-2 py-0.5 rounded">
                  13 Sections
                </span>
              </div>
              
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSectionScroll(sec.id)}
                      className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs ${
                        isActive
                          ? 'bg-[#E99400]/10 text-[#E99400] font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 w-4">
                          {sec.number}
                        </span>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{sec.shortTitle}</span>
                      </span>
                      {isActive && <ArrowRight className="w-3 h-3 shrink-0 ml-1 text-[#E99400]" />}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <Link
                  to="/privacy-policy"
                  className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-[#E99400] p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#E99400]" />
                    Privacy Policy
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-[#E99400] p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#E99400]" />
                    Contact Support
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Details Content Panel */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            
            {/* Introductory Box */}
            <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-[#E99400]/10 to-transparent border border-[#E99400]/20 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#E99400] text-white shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white block mb-1">
                  Important Legal Notice
                </strong>
                Please review these Terms of Service carefully before utilizing our applications, platforms, or services. Accessing or using any Efficacious India Limited service indicates your informed consent and binding acceptance of these terms.
              </div>
            </div>

            {/* Mobile Table of Contents Pill Bar */}
            <div className="lg:hidden p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <label htmlFor="mobile-section-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Jump to Section:
              </label>
              <select
                id="mobile-section-select"
                aria-label="Jump to Section"
                value={activeSection}
                onChange={(e) => handleSectionScroll(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:border-[#E99400]"
              >
                {sections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.number}. {sec.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Render Each Section */}
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="scroll-mt-28 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-6 md:p-8 shadow-sm relative overflow-hidden group hover:border-[#E99400]/40 dark:hover:border-[#E99400]/40 transition-colors duration-300"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E99400]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center gap-3.5 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E99400]/10 text-[#E99400] flex items-center justify-center shrink-0 font-bold text-sm border border-[#E99400]/20">
                      {sec.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#E99400]" />
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                          {sec.title}
                        </h2>
                      </div>
                    </div>
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

export default TermsOfService;
