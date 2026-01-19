import React from 'react';
import { motion as m } from 'framer-motion';
import { Lock, Monitor, Cloud, Smartphone, Clock, CheckCircle } from 'lucide-react';

const motion = m as any;

const features = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Child Security Focus",
    description: "Our prime directive. Advanced tracking and safety protocols embedded in the core ERP."
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "Complete ERP Suite",
    description: "End-to-end management for schools, from admissions to exams and transport."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Ready",
    description: "Responsive interfaces for parents, teachers, and administrators on the go."
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Infrastructure",
    description: "Secure, scalable, and accessible data management hosted on reliable servers."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Updates",
    description: "Instant notifications for attendance, transport location, and emergency alerts."
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "User-Centric Design",
    description: "Interfaces designed with the specific needs of potential end-users in mind."
  }
];

const Features: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
        {/* Decor */}
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-brand-500/5 rounded-tr-full" />
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Efficacious?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We move beyond standard IT solutions. We build ecosystems that protect children and streamline administration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-brand-200 dark:hover:border-slate-600 shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;