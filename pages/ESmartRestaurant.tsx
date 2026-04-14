import React from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, ChefHat, QrCode, Monitor, CreditCard, 
  BarChart3, ArrowRight, CheckCircle2, ClipboardList, 
  Smartphone, Coffee, Award, Wifi, Heart, Layers, ArrowDown
} from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import Contact from '../components/Contact';
import { useContent } from '../hooks/useContent';

const features = [
  {
    id: 2, // Matches Restaurant Screen ID in PhoneMockup (Slide 2)
    title: "Digital Menu & Ordering",
    description: "Provide a seamless contactless experience. Customers can scan QR codes to view vivid menus, customize orders, and place them directly from their smartphones.",
    icon: <QrCode className="w-6 h-6" />,
    details: ["Contactless Ordering", "Dynamic Menu Updates", "Upselling Prompts"],
    color: "bg-rose-500",
    textAccent: "text-rose-600"
  },
  {
    id: 30, // Unique ID for conceptual mapping
    title: "Kitchen Display System (KDS)",
    description: "Streamline your kitchen operations. Replace noisy printers with smart screens that route orders to specific stations, track prep times, and reduce errors.",
    icon: <Monitor className="w-6 h-6" />,
    details: ["Station-wise Routing", "Color-coded Status", "Prep Time Tracking"],
    color: "bg-orange-500",
    textAccent: "text-orange-600"
  },
  {
    id: 31,
    title: "Inventory & Recipe Management",
    description: "Take control of your food costs. Track ingredient usage down to the gram, manage recipes, and get low-stock alerts to prevent wastage and pilferage.",
    icon: <ClipboardList className="w-6 h-6" />,
    details: ["Real-time Stock Deductions", "Recipe Costing", "Wastage Reports"],
    color: "bg-amber-500",
    textAccent: "text-amber-600"
  },
  {
    id: 32,
    title: "Billing & POS",
    description: "A robust Point of Sale system designed for speed. Handle split bills, multiple payment modes, discounts, and GST compliance with ease.",
    icon: <CreditCard className="w-6 h-6" />,
    details: ["Fast Checkout", "Table Management", "Split/Merge Bills"],
    color: "bg-red-500",
    textAccent: "text-red-600"
  },
  {
    id: 33,
    title: "CRM & Loyalty",
    description: "Turn walk-ins into regulars. Capture customer data, run targeted SMS campaigns, and manage loyalty points to boost retention.",
    icon: <Heart className="w-6 h-6" />,
    details: ["Customer Database", "Loyalty Points", "Feedback Management"],
    color: "bg-pink-500",
    textAccent: "text-pink-600"
  }
];

const modules = [
    { title: "Table Reservation", icon: <Layers size={24} /> },
    { title: "Waitlist Management", icon: <Coffee size={24} /> },
    { title: "Staff Management", icon: <ChefHat size={24} /> },
    { title: "Aggregator Integration", icon: <Wifi size={24} /> },
    { title: "Menu Engineering", icon: <Utensils size={24} /> },
    { title: "Captain App", icon: <Smartphone size={24} /> },
];

const ESmartRestaurant: React.FC = () => {
  const { data } = useContent();
  const product = data.products.find((p: any) => p.href === '/products/esmart-restaurant');

  return (
    <div className="w-full bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f172a]">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid-food-hero" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-rose-500" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-food-hero)" />
            </svg>
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
         
         <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/30 text-xs font-bold uppercase tracking-wider mb-6 text-rose-300">
                    <Utensils size={16} /> Restaurant ERP
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                    Smart Dining <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Experience</span>
                </h1>
                <p className="text-lg lg:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                    Digitize your restaurant operations from kitchen to customer. Enhance service speed, reduce wastage, and increase profitability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30 active:scale-95 flex items-center justify-center gap-2">
                        Book a Demo <ArrowRight size={20} />
                    </button>
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                        View Features
                    </button>
                </div>

                {/* App Store Badges */}
                <div className="flex flex-wrap flex-row items-center justify-center gap-4 mt-8">
                  <a href={product?.appStoreLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-4 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-xl w-[210px]">
                    <svg className="w-7 h-7 fill-current mb-0.5 shrink-0" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-[10px] font-semibold text-slate-500 mb-1">Download on the</span>
                      <span className="text-base font-bold tracking-tight leading-none">App Store</span>
                    </div>
                  </a>
                  <a href={product?.playStoreLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-4 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-xl w-[210px]">
                    <svg className="w-6 h-6 fill-current mb-0.5 shrink-0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-[10px] font-semibold text-slate-500 mb-1">GET IT ON</span>
                      <span className="text-base font-bold tracking-tight leading-none">Google Play</span>
                    </div>
                  </a>
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
                                  
                                  {/* Phone Mockup with specific ID (Using 2 for Restaurant view) */}
                                  <div className="transform scale-[0.85] lg:scale-100 origin-center transition-transform duration-500">
                                      <PhoneMockup activeSlide={2} />
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
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Restaurant Modules</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Tools designed to optimize every aspect of your hospitality business.
                  </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {modules.map((mod, i) => (
                      <motion.div 
                        key={i}
                        className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 text-center border border-slate-100 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors group cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                          <div className="text-rose-500 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300">
                              {mod.icon}
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</span>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="py-20 bg-rose-600 dark:bg-rose-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-rose-500/50 dark:divide-rose-800">
                  <div className="p-6">
                      <div className="text-4xl font-black text-white mb-2">30%</div>
                      <div className="text-rose-100 font-medium">Increase in Table Turnover</div>
                  </div>
                  <div className="p-6">
                      <div className="text-4xl font-black text-white mb-2">15%</div>
                      <div className="text-rose-100 font-medium">Reduction in Food Cost</div>
                  </div>
                  <div className="p-6">
                      <div className="text-4xl font-black text-white mb-2">0%</div>
                      <div className="text-rose-100 font-medium">Order Errors</div>
                  </div>
              </div>
          </div>
      </section>

      <Contact />
    </div>
  );
};

export default ESmartRestaurant;