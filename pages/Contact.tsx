import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowDown, MessageSquare, Globe, Clock, Sparkles } from 'lucide-react';
import ContactComponent from '../components/Contact';

const motion = m as any;

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Full Screen Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Office" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold tracking-wider mb-8">
                <Sparkles size={16} className="text-yellow-400" /> 
                <span>We're Here For You</span>
             </div>
             <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
               Let's Start A <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Conversation</span>
             </h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
               Have a project in mind or need assistance with our products? 
               Our team is ready to provide the answers you need.
             </p>
             
             <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Globe size={16} className="text-brand-400" /> Global Support
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Clock size={16} className="text-brand-400" /> 24/7 Response
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <MessageSquare size={16} className="text-brand-400" /> Live Chat
                </div>
             </div>
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={32} className="text-white/70" />
        </motion.div>
      </section>

      {/* Existing Contact Component */}
      <ContactComponent />
    </div>
  );
};

export default Contact;