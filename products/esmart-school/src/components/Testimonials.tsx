import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "eSMARTs has completely transformed how we manage our daily operations. The automated attendance and real-time GPS tracking for transport give our parents immense peace of mind.",
    name: "Mrs. Sunita Sen",
    role: "Principal",
    school: "Delhi Public School, Sector 45",
    avatar: "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
  },
  {
    id: 2,
    quote: "The dashboards provide incredible visibility into student performance and financials. It's an all-in-one platform that saves our administrative staff hours of work every single day.",
    name: "Dr. Anil Deshmukh",
    role: "School Administrator",
    school: "St. Xavier's High School, Mumbai",
    avatar: "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
  },
  {
    id: 3,
    quote: "Implementation was seamless, and the mobile app is a game-changer. Our teachers can now communicate with parents instantly, fostering a much stronger school community.",
    name: "Mrs. Priya Iyer",
    role: "Head of Operations",
    school: "Pinnacle International School, Bengaluru",
    avatar: "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="
  }
];

export function Testimonials() {
  return (
    <div id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold tracking-wide mb-4"
          >
            <Star className="h-4 w-4" />
            <span>Success Stories</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-6"
          >
            Trusted by Educational Leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            See how forward-thinking schools are using our platform to streamline operations and enhance the learning experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative group hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="absolute top-8 right-8 text-primary-200 dark:text-primary-900/50 group-hover:text-primary-400 dark:group-hover:text-primary-700 transition-colors">
                <Quote className="w-12 h-12 rotate-180" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 mb-8 relative z-10 font-medium leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{testimonial.role}</p>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{testimonial.school}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
