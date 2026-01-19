import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, HeartPulse, Stethoscope, Microscope, 
  FileText, ArrowRight, CheckCircle2, Clock, 
  Smartphone, Database, Shield, Monitor, ArrowDown
} from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import Contact from '../components/Contact';

const UsersIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const features = [
  {
    id: 3, // Matches Health Screen ID in PhoneMockup
    title: "Patient Management (OPD/IPD)",
    description: "Streamline the entire patient journey from registration to discharge. Manage appointments, bed allocation, and patient history effortlessly.",
    icon: <UsersIcon className="w-6 h-6" />,
    details: ["Online Appointments", "Real-time Bed Status", "Discharge Summary"],
    color: "bg-emerald-500",
    textAccent: "text-emerald-600"
  },
  {
    id: 40,
    title: "Doctor's Workbench",
    description: "Empower doctors with a dedicated digital workspace. Access electronic medical records (EMR), write prescriptions, and view lab reports instantly.",
    icon: <Stethoscope className="w-6 h-6" />,
    details: ["E-Prescriptions", "Patient History", "Diagnosis Tools"],
    color: "bg-teal-500",
    textAccent: "text-teal-600"
  },
  {
    id: 41,
    title: "Laboratory & Radiology",
    description: "Integrated diagnostics module. Direct machine interfacing for error-free reporting and instant availability of results to doctors and patients.",
    icon: <Microscope className="w-6 h-6" />,
    details: ["Machine Integration", "Auto-Approval", "SMS/Email Reports"],
    color: "bg-blue-500",
    textAccent: "text-blue-600"
  },
  {
    id: 42,
    title: "Pharmacy Management",
    description: "Complete inventory control for your hospital pharmacy. Track stock levels, manage expirations, and handle billing with GST compliance.",
    icon: <Database className="w-6 h-6" />,
    details: ["Stock Alerts", "Expiry Tracking", "Alternative Medicine Suggestion"],
    color: "bg-cyan-500",
    textAccent: "text-cyan-600"
  },
  {
    id: 43,
    title: "Billing & Insurance (TPA)",
    description: "Simplify the complex billing process. Handle multi-mode payments, insurance claims, and TPA processing with transparency.",
    icon: <FileText className="w-6 h-6" />,
    details: ["Cashless Processing", "Package Billing", "TPA Integration"],
    color: "bg-indigo-500",
    textAccent: "text-indigo-600"
  }
];

const modules = [
    { title: "EMR / EHR", icon: <Activity size={24} /> },
    { title: "OT Management", icon: <Monitor size={24} /> },
    { title: "Blood Bank", icon: <HeartPulse size={24} /> },
    { title: "Ambulance", icon: <Clock size={24} /> },
    { title: "Telemedicine", icon: <Smartphone size={24} /> },
    { title: "Insurance / TPA", icon: <Shield size={24} /> },
];

const ESmartHealth: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f172a]">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid-health-hero" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20h40M20 0v40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-health-hero)" />
            </svg>
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
         
         <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-6 text-emerald-300">
                    <Activity size={16} /> Hospital Management System
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                    Advanced Healthcare <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Technology</span>
                </h1>
                <p className="text-lg lg:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                    A comprehensive, paperless solution for hospitals and clinics. Enhance patient care, optimize resources, and streamline administration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/30 active:scale-95 flex items-center justify-center gap-2">
                        Request Demo <ArrowRight size={20} />
                    </button>
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Explore Modules
                    </button>
                </div>
            </motion.div>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
         >
            <ArrowDown size={32} />
         </motion.div>
      </section>

      {/* --- FEATURES ZIG-ZAG SECTION --- */}
      <div id="features" className="flex flex-col">
          {features.map((feature, index) => (
              <section key={feature.id} className="py-24 lg:py-32 relative overflow-hidden">
                  {/* Alternating Backgrounds */}
                  {index % 2 === 1 && (
                      <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/30 -z-10" />
                  )}
                  
                  {/* Decorative Blobs */}
                  <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-96 h-96 ${feature.color.replace('bg-', 'bg-').replace('500', '200')} opacity-10 blur-[100px] rounded-full -z-10`} />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                          
                          {/* Text Content */}
                          <motion.div 
                              className="flex-1 space-y-8"
                              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                          >
                              {/* Icon & Number */}
                              <div className="flex items-center gap-4">
                                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${feature.color}`}>
                                      {feature.icon}
                                  </div>
                                  <span className="text-6xl font-black text-slate-200 dark:text-slate-800/50 select-none">
                                      0{index + 1}
                                  </span>
                              </div>

                              <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                  {feature.title}
                              </h3>
                              
                              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {feature.description}
                              </p>

                              <div className="space-y-4">
                                  {feature.details.map((detail, i) => (
                                      <div key={i} className="flex items-center gap-3 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
                                          <CheckCircle2 size={20} className={feature.textAccent} />
                                          <span className="font-semibold text-slate-700 dark:text-slate-200">{detail}</span>
                                      </div>
                                  ))}
                              </div>
                          </motion.div>

                          {/* Phone Visual */}
                          <motion.div 
                              className="flex-1 flex justify-center items-center w-full"
                              initial={{ opacity: 0, scale: 0.8, y: 50 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.7, delay: 0.2 }}
                          >
                              <div className="relative">
                                  {/* Glow behind phone */}
                                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${feature.color.replace('bg-', 'bg-')} opacity-20 blur-[60px] rounded-full`} />
                                  
                                  {/* Phone Mockup with specific ID (Using 3 for Health view) */}
                                  <div className="transform scale-[0.85] lg:scale-100 origin-center transition-transform duration-500">
                                      <PhoneMockup activeSlide={3} />
                                  </div>
                              </div>
                          </motion.div>

                      </div>
                  </div>
              </section>
          ))}
      </div>

      {/* --- MODULES GRID --- */}
      <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Core Modules</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      A modular system designed to scale with your healthcare institution.
                  </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {modules.map((mod, i) => (
                      <motion.div 
                        key={i}
                        className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 text-center border border-slate-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                          <div className="text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                              {mod.icon}
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</span>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-500/50 dark:divide-emerald-800">
                  <div className="p-6">
                      <div className="text-4xl font-black text-white mb-2">40%</div>
                      <div className="text-emerald-100 font-medium">Reduction in Wait Time</div>
                  </div>
                  <div className="p-6">
                      <div className="text-4xl font-black text-white mb-2">100%</div>
                      <div className="text-emerald-100 font-medium">Paperless Operations</div>
                  </div>
                  <div className="p-6">
                      <div className="text-4xl font-black text-white mb-2">24/7</div>
                      <div className="text-emerald-100 font-medium">Support & Uptime</div>
                  </div>
              </div>
          </div>
      </section>

      <Contact />
    </div>
  );
};

export default ESmartHealth;