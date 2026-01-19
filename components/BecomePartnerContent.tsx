import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, TrendingUp, Network, Map, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    title: "Effective Business Model",
    description: "A new and effective business model designed to maximize profitability and operational efficiency for our partners.",
    icon: <Zap className="w-6 h-6" />,
    color: "blue"
  },
  {
    title: "Better Market Reach",
    description: "Better penetration and reach into the market, leveraging our established brand presence and marketing support.",
    icon: <Map className="w-6 h-6" />,
    color: "emerald"
  },
  {
    title: "Larger Network",
    description: "Join a larger network of professionals and institutions, fostering growth through collaboration and referrals.",
    icon: <Network className="w-6 h-6" />,
    color: "purple"
  },
  {
    title: "B & C Town Focus",
    description: "Ability to cater to B & C towns, where the market is growing rapidly, at a lower operational cost.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "orange"
  }
];

const criteria = [
  {
    title: "Experience",
    requirement: "3+ Years",
    description: "Should have at least three years of experience in the same or related field (IT/Education).",
    icon: <Briefcase className="w-8 h-8" />
  },
  {
    title: "Infrastructure",
    requirement: "Office Setup",
    description: "Should have an office set-up with required infrastructure to meet the targets.",
    icon: <Building className="w-8 h-8" />
  },
  {
    title: "Financials",
    requirement: "₹ 25 Lakhs",
    description: "Should have achieved a minimum turnover of not less than Rs. 25 lakhs in the previous financial year.",
    icon: <TrendingUp className="w-8 h-8" />
  }
];

const BecomePartnerContent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-300">
      
      {/* Introduction / Why Partner */}
      <section className="py-20 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
                        Grow With Us
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        Partner with <span className="text-brand-600 dark:text-brand-400">Efficacious</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        We are expanding our footprint across India and are looking for strong partners to join us in this journey. 
                        Our partnership model is designed to empower you with the right tools, products, and support to succeed in the growing EdTech and ERP market.
                    </p>
                    <ul className="space-y-3">
                        {["Lucrative Revenue Sharing", "Comprehensive Product Training", "Marketing & Sales Support"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                <CheckCircle2 size={20} className="text-brand-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                        <img 
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
                            alt="Business Partnership" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="font-bold text-lg">Growth Together</p>
                            <p className="text-sm opacity-90">Building the future of education management.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Benefits Grid */}
            <div className="text-center mb-12">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Why Join Our Network?</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {benefits.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                  >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                          {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                      </p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Criteria Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid-criteria" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-500" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid-criteria)" />
              </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                      <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Criteria for Channel Partners</h2>
                      <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                          To ensure mutual success and maintain our quality standards, we look for partners who meet the following prerequisites.
                      </p>
                  </motion.div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {criteria.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 hover:border-brand-500/50 transition-all group relative overflow-hidden"
                      >
                          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                              {item.icon}
                          </div>
                          
                          <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center text-brand-400 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                          </div>
                          
                          <h4 className="text-sm font-bold text-brand-400 uppercase tracking-wide mb-2">{item.title}</h4>
                          <h3 className="text-2xl font-bold text-white mb-3">{item.requirement}</h3>
                          <p className="text-slate-400 leading-relaxed">
                              {item.description}
                          </p>
                      </motion.div>
                  ))}
              </div>

              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                  <Link to="/contact" className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 hover:-translate-y-1">
                      Apply to Become a Partner <ArrowRight size={20} />
                  </Link>
                  <p className="text-slate-500 mt-4 text-sm">Join us in shaping the future.</p>
              </motion.div>
          </div>
      </section>

    </div>
  );
};

export default BecomePartnerContent;