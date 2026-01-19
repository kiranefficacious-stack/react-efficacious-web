import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, User, Building, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import Contact from '../components/Contact';
import { useContent } from '../hooks/useContent';

const ChannelPartners: React.FC = () => {
  const { data } = useContent();
  const partnersData = data.partners || { heroSlides: [], items: [] };
  const heroSlides = partnersData.heroSlides || [];
  const partners = partnersData.items || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Custom Slider Hero - Full Screen */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-slate-900">
        {/* Top Gradient for Navbar Visibility */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

        {heroSlides.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].overlayColor} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          {heroSlides.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl"
              >
                <h1 className="text-4xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-md font-light">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Slider Controls */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-20 left-0 right-0 z-30 flex items-center justify-center gap-4">
              <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/10 hover:scale-110"
              >
                  <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                  {heroSlides.map((_: any, index: number) => (
                      <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentSlide 
                              ? 'w-10 bg-white' 
                              : 'w-2 bg-white/40 hover:bg-white/60'
                          }`}
                      />
                  ))}
              </div>

              <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/10 hover:scale-110"
              >
                  <ChevronRight size={24} />
              </button>
          </div>
        )}

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/50 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => document.getElementById('partners-list')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      <section id="partners-list" className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
         {/* Decor */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-3 gap-8">
               {partners.map((partner: any, index: number) => (
                   <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
                   >
                       {/* Top Accent Bar */}
                       <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-${partner.color}-500 to-${partner.color}-600`} />
                       
                       <div className="flex items-start justify-between mb-6">
                           <div>
                               <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-${partner.color}-100 dark:bg-${partner.color}-900/30 text-${partner.color}-700 dark:text-${partner.color}-300`}>
                                   {partner.region}
                               </span>
                               <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                   <User className="w-5 h-5 text-slate-400" />
                                   {partner.name}
                               </h3>
                           </div>
                       </div>

                       <div className="space-y-4">
                           <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
                               <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shrink-0 shadow-sm text-brand-500 mt-1 border border-slate-100 dark:border-slate-600">
                                   <MapPin size={16} />
                               </div>
                               <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                   {partner.address}
                               </p>
                           </div>

                           <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
                               <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shrink-0 shadow-sm text-brand-500 border border-slate-100 dark:border-slate-600">
                                   <Mail size={16} />
                               </div>
                               <a href={`mailto:${partner.email}`} className="text-slate-600 dark:text-slate-300 text-sm hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all font-medium">
                                   {partner.email}
                               </a>
                           </div>

                           <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
                               <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shrink-0 shadow-sm text-brand-500 border border-slate-100 dark:border-slate-600">
                                   <Phone size={16} />
                               </div>
                               <a href={`tel:${partner.phone.split('/')[0].replace(/\s+/g, '')}`} className="text-slate-600 dark:text-slate-300 text-sm hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
                                   {partner.phone}
                               </a>
                           </div>
                       </div>
                   </motion.div>
               ))}
            </div>
         </div>
      </section>

      <Contact />
    </div>
  );
};

export default ChannelPartners;