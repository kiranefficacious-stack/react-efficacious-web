import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, AppWindow } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Ready to eliminate the queue?
            </h2>
            <p className="text-slate-600 mb-10 text-lg">
              Reach out to our team to schedule a demo, learn about our API integrations, or see how Efficacious can fit your specific industry needs.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="text-primary-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Email Us</h4>
                  <p className="text-slate-500">info@efficacious.co.in</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-primary-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Headquarters</h4>
                  <p className="text-slate-500">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">Get the App Today</h4>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors font-bold shadow-sm">
                  <AppWindow className="w-5 h-5" />
                  App Store
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors font-bold shadow-sm">
                  <AppWindow className="w-5 h-5" />
                  Google Play
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 text-slate-900 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Partner with Us</h3>
            
            {status === 'success' ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-lg mb-2">Request Sent Successfully!</h4>
                <p>Thank you for reaching out. Our team will contact you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</label>
                    <input required value={formData.firstName} onChange={handleChange} type="text" id="firstName" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</label>
                    <input required value={formData.lastName} onChange={handleChange} type="text" id="lastName" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Work Email</label>
                  <input required value={formData.email} onChange={handleChange} type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="jane@company.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">Company / Organization</label>
                  <input required value={formData.company} onChange={handleChange} type="text" id="company" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Acme Corp" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">How can we help?</label>
                  <textarea required value={formData.message} onChange={handleChange} id="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none" placeholder="Tell us about your organization's needs..."></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="text-red-600 text-sm font-medium">
                    Failed to send request. Please try again later.
                  </div>
                )}
                
                <button disabled={status === 'submitting'} type="submit" className="w-full px-8 py-4 text-base font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-70">
                  {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
