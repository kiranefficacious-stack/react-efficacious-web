import { motion } from 'framer-motion';

export function About() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
                alt="Team working together" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              About Us
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Our Mission
            </p>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We believe that time is the most valuable asset anyone possesses. Yet, millions of hours are wasted every day standing in physical lines, waiting for services in crowded rooms, or managing inefficient paper-based schedules.
              </p>
              <p>
                <strong>E-Smart Queue was built to digitize the wait.</strong>
              </p>
              <p>
                Our goal is to create frictionless, timely interactions between service providers and customers. By leveraging real-time data, geolocation, and secure QR technology, we are replacing the frustration of the queue with the certainty of an intelligent schedule.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
