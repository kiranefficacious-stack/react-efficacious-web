import React from 'react';
import { motion as m } from 'framer-motion';
import { TrendingUp, Wallet, Smile } from 'lucide-react';

const motion = m as any;

const benefits = [
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-800",
    title: "Grow Your Revenue",
    description: "Our solution enables complete automation of the process leading to arresting of any possible revenue loss. Which is also cost effective."
  },
  {
    icon: <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
    title: "Affordable Prices",
    description: "We offer our solution at the most affordable prices keeping in-view the end customer requirement. Our offering are mostly on SaaS model."
  },
  {
    icon: <Smile className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
    title: "User Friendly Approach",
    description: "All our applications are developed keeping in-view the concept of Ease of Use so that no extensive training is required."
  }
];

const KeyBenefits: React.FC = () => {
  return (
    <section id="benefits" className="relative z-20 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-700/50 transition-all duration-500 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8 }}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent to-${benefit.bg.split('-')[1]}-500/5`} />

              <div className={`w-16 h-16 ${benefit.bg} ${benefit.border} border rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10`}>
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors relative z-10">
                {benefit.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base relative z-10">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;