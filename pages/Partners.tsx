import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import BecomePartnerContent from '../components/BecomePartnerContent';
import Contact from '../components/Contact';

const motion = m as any;

const Partners: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Full Screen Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" // Business handshake/meeting
            alt="Business Partnership" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
               Become A <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Partner</span>
             </h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
               Join our network and grow with Efficacious. Together we can achieve more and deliver excellence.
             </p>
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => document.getElementById('become-partner-content')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      <div id="become-partner-content">
        <BecomePartnerContent />
      </div>
      <Contact />
    </div>
  );
};

export default Partners;