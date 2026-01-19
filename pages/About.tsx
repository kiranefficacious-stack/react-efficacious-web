
import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Component Imports Aliased to match Prompt Structure
import WhoWeAre from '../components/WhoWeAre';
import WhyChooseUs from '../components/Features'; // Reusing Features as Why Choose Us
import OurVision from '../components/OurVision';
import OurMission from '../components/OurMission';
import OurValues from '../components/OurValues';
import OfficeGallery from '../components/OfficeGallery';
import ContactUs from '../components/Contact';

import { useContent } from '../hooks/useContent';

const motion = m as any;

const About: React.FC = () => {
  const { data } = useContent();
  const hero = data.about.hero;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Full Screen Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.image} 
            alt={hero.title} 
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
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
                Since 2012
             </div>
             <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
               {hero.title || "About Us"}
             </h1>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
               {hero.subtitle}
             </p>
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* 2. Who We Are */}
      <div id="who-we-are">
        <WhoWeAre />
      </div>

      {/* 3. Why Choose Us? */}
      <WhyChooseUs />

      {/* 4 & 5. Our Vision & Our Mission */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                 <OurVision />
                 <OurMission />
             </div>
        </div>
      </section>

      {/* 6. Our Values */}
      <OurValues />

      {/* 7. Office Gallery */}
      <OfficeGallery />

      {/* 8. Contact Us */}
      <ContactUs />

    </div>
  );
};

export default About;
