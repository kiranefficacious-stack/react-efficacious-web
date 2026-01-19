import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import * as LucideIcons from 'lucide-react';

const motion = m as any;

const Products: React.FC = () => {
  const { data } = useContent();
  const products = data.products.filter((p: any) => p.enabled);

  return (
    <section id="products" className="py-32 bg-slate-50 dark:bg-dark-bg relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 dark:opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-800"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap size={14} className="fill-brand-500 text-brand-500" />
              <span>Smart Solutions</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Product Suite</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Tailored ERP ecosystems designed to streamline operations and enhance security across various industries. 
              Discover the power of Efficacious.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="group relative h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Card Container with Gradient Border Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 rounded-[2rem] opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`absolute -inset-[1px] bg-gradient-to-r ${product.gradient} rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`} />
              
              <div className="relative h-full bg-white dark:bg-slate-900/90 backdrop-blur-xl rounded-[1.9rem] p-8 flex flex-col transition-transform duration-300">
                
                {/* Icon Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${product.bgAccent} ${product.textAccent} flex items-center justify-center shadow-inner`}>
                        {(() => {
                          const IconComp = (LucideIcons as any)[product.iconName];
                          return IconComp ? <IconComp className="w-8 h-8" /> : null;
                        })()}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                        <ArrowRight size={16} className="text-slate-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>

                {/* Action */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
                    <Link to={product.href} className={`text-sm font-semibold ${product.textAccent} flex items-center gap-1 hover:gap-2 transition-all`}>
                        Explore Features
                        <ArrowRight size={14} />
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
