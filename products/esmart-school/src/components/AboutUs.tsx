import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';

export function AboutUs() {
  return (
    <div id="about" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50 dark:bg-primary-900/10 -skew-x-12 translate-x-32 hidden lg:block -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-400 text-sm font-semibold tracking-wide mb-6">
              <Users className="h-4 w-4" />
              <span>About Us</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight transition-colors">
              Empowering Education with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Smart Technology</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed transition-colors">
              At Efficacious India Limited, we believe in bridging the gap between technology and education. Our mission is to create a seamless, paperless, and secure environment for schools, ensuring that administrators, teachers, and parents stay connected effortlessly.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Mission</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">To deliver comprehensive, secure, and user-friendly management systems that enhance the educational experience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Vision</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">To be the global leader in educational technology, fostering smart environments for learning worldwide.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-blue-500/20 rounded-[2.5rem] blur-3xl -z-10"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover aspect-square lg:aspect-auto lg:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              {/* Floating Stat */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold tracking-tight">10+ Years</div>
                    <div className="text-sm font-semibold text-primary-200 uppercase tracking-wider">Of Excellence</div>
                  </div>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed max-w-xs">
                  Pioneering smart education management systems with a proven track record of trust and reliability.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
