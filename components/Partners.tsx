import React from 'react';
import { motion as m } from 'framer-motion';
import { Briefcase, CheckCircle, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const motion = m as any;

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-24 bg-white dark:bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: CTA Card */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden text-white group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Become A Channel Partner</h2>
                        <p className="text-brand-100 mb-8 leading-relaxed text-lg">
                            Join our network to leverage a larger ecosystem and an effective business model. 
                            We are looking for dedicated partners to expand our reach across India.
                        </p>
                        
                        <div className="space-y-4 mb-10">
                            {[
                                'Lucrative revenue sharing model',
                                'Comprehensive training & support',
                                'Access to premium marketing assets'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="bg-brand-500/50 rounded-full p-1">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-medium text-brand-50">{item}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 px-8 py-4 rounded-xl font-bold transition-all hover:bg-brand-50 shadow-lg active:scale-95 w-full sm:w-auto">
                            Apply Now <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Right Column: Stats & Requirements */}
             <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="mb-10">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-6">
                        <span>Requirements</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Who are we looking for?</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We partner with entities that have a strong local presence and a commitment to excellence.
                    </p>
                </div>

                <div className="grid gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Industry Experience</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Minimum 3 years of experience in IT, Education, or related sectors.</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4">
                         <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Infrastructure</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Required office setup and a dedicated sales/support team.</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4">
                         <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Financial Stability</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Minimum turnover of Rs. 25 lakhs in the previous financial year.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;