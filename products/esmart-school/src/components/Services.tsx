import { motion } from 'framer-motion';
import { Users, GraduationCap, Calendar, Award, CreditCard, BookOpen, Settings } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Admission Management',
    description: 'Streamline the entire admission process from inquiry to enrollment with digital forms and document collection.',
  },
  {
    icon: GraduationCap,
    title: 'Student Portal',
    description: 'A dedicated dashboard for students to access materials, track progress, and communicate with faculties.',
  },
  {
    icon: Calendar,
    title: 'Attendance & Timetable',
    description: 'Automated attendance tracking and dynamic timetable generation for classes and examinations.',
  },
  {
    icon: Award,
    title: 'Examination & Results',
    description: 'Create exams, manage grading scales, and automatically generate comprehensive report cards.',
  },
  {
    icon: CreditCard,
    title: 'Fee Management',
    description: 'Secure online fee collection, automated reminders, and detailed financial reporting for the institution.',
  },
  {
    icon: BookOpen,
    title: 'Library Management',
    description: 'Digital cataloging of books, automated issue/return tracking, and late fee calculations.',
  }
];

export function Services() {
  return (
    <div id="services" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold tracking-wide mb-4"
          >
            <Settings className="h-4 w-4" />
            <span>Our Services</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-6"
          >
            Smart College Management
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Empower your institution with our comprehensive suite of college management modules designed to automate daily operations.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
