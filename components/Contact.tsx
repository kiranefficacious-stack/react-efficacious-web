import React from 'react';
import { motion as m } from 'framer-motion';
import { MapPin, Mail, Phone, Send, User, MessageSquare, FileText, Smartphone, Home } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const Contact: React.FC = () => {
  const { data } = useContent();
  const { contact } = data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Have a question or want to learn more about our solutions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
             <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MapPin size={120} className="text-brand-500" />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-brand-600 mb-6 shadow-sm">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Office</h3>
                    <p 
                        className="text-slate-600 dark:text-slate-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: contact.office.replace(/, /g, ', <br />') }}
                    />
                </div>
             </div>

             <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-brand-600 mb-4 shadow-sm">
                        <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email Us</h3>
                    <a href={`mailto:${contact.email}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        {contact.email}
                    </a>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-brand-600 mb-4 shadow-sm">
                        <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Call Us</h3>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        {contact.phone}
                    </a>
                </div>
             </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="John Doe"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                required 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="mobile" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Mobile Number</label>
                        <div className="relative">
                            <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input 
                                type="tel" 
                                id="mobile" 
                                placeholder="+91 98765 43210"
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="john@example.com"
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Address</label>
                    <div className="relative">
                        <Home className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            id="address" 
                            placeholder="Your City / Location"
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            id="subject" 
                            placeholder="Enquiry about..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Message</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <textarea 
                            id="message" 
                            rows={4}
                            placeholder="How can we help you?"
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                            required
                        ></textarea>
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
                >
                    <Send size={20} />
                    Send Message
                </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
