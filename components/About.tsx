import React from 'react';
import { motion as m } from 'framer-motion';
import { Target, Lightbulb, History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const motion = m as any;

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 dark:bg-slate-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
       
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
                    <span>About Us</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                    Driving Efficiency, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Securing Futures.</span>
                </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white font-semibold">Efficacious</strong> is synonymous with Efficiency. 
                  Our vision is to provide innovative & efficient solutions to the complex needs of customers to make their life 
                  <span className="text-slate-900 dark:text-white font-medium"> Safe, Secure & Easy</span>.
                </p>
                <p>
                  Founded in 2012, we transitioned from IT outsourcing to becoming a leader in 
                  <span className="text-brand-600 dark:text-brand-400 font-medium"> Educational ERP solutions</span>. 
                  Our mission revolves around simplifying operations while keeping Child Security as our prime focus.
                </p>
            </div>

            <Link to="/about" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold hover:gap-4 transition-all group">
                Read Our Story <ArrowRight size={20} className="group-hover:text-brand-700 dark:group-hover:text-brand-300" />
            </Link>
          </motion.div>

          {/* Right: Cards */}
          <div className="grid gap-6">
            <Card 
                icon={<Target className="w-8 h-8 text-brand-500" />}
                title="Our Mission"
                desc="Revolutionize operations with Child Security as the prime focus."
                delay={0.1}
                color="brand"
            />
            <Card 
                icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
                title="Our Vision"
                desc="Innovative & efficient solutions for complex customer needs."
                delay={0.2}
                color="yellow"
            />
            <Card 
                icon={<History className="w-8 h-8 text-purple-500" />}
                title="Our Journey"
                desc="Started in 2012, evolving from outsourcing to specialized ERP."
                delay={0.3}
                color="purple"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon, title, desc, delay, color }: { icon: React.ReactNode, title: string, desc: string, delay: number, color: string }) => {
    const bgColors: Record<string, string> = {
        brand: 'group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 group-hover:border-brand-100 dark:group-hover:border-brand-800',
        yellow: 'group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/20 group-hover:border-yellow-100 dark:group-hover:border-yellow-800',
        purple: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-100 dark:group-hover:border-purple-800',
    };

    return (
        <motion.div 
            className={`group bg-slate-50 dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 transition-all duration-300 ${bgColors[color]}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default About;