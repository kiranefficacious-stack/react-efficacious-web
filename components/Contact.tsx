import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { MapPin, Mail, Phone, Send, User, MessageSquare, FileText, Smartphone, Home, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import emailjs from '@emailjs/browser';
import { sendEmailNotification } from '../utils/sendMail';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const motion = m as any;

const Contact: React.FC = () => {
  const { data } = useContent();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (values = formData): Record<string, string> => {
    const errs: Record<string, string> = {};

    if (!values.name.trim()) {
      errs.name = 'Full name is required';
    } else if (values.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!values.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else {
      const digits = values.mobile.replace(/\D/g, '');
      if (digits.length < 10) {
        errs.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    if (!values.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!values.subject.trim()) {
      errs.subject = 'Subject is required';
    } else if (values.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters';
    }

    if (!values.message.trim()) {
      errs.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate();
    setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      mobile: true,
      email: true,
      address: true,
      subject: true,
      message: true
    });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitSuccess(false);

    const recipientEmail = 'info@efficacious.co.in';
    let emailDelivered = false;

    // Formatted rich text body content
    const formattedBody = `
New Contact Inquiry from Website:
--------------------------------------------------
Full Name:        ${formData.name.trim()}
Email Address:    ${formData.email.trim()}
Mobile Number:    ${formData.mobile.trim()}
Location/Address: ${formData.address.trim() || 'Not specified'}
Subject:          ${formData.subject.trim()}

Message Content:
${formData.message.trim()}
--------------------------------------------------
To / Recipient:   ${recipientEmail}
`.trim();

    // 1. Save directly to Firestore database
    let savedToDatabase = false;
    try {
      await addDoc(collection(db, 'contact_inquiries'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        address: formData.address.trim() || 'Not specified',
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
        submittedAt: new Date().toISOString()
      });
      savedToDatabase = true;
    } catch (dbErr) {
      console.warn('Firestore inquiry save warning:', dbErr);
    }

    // 2. Email Notification Endpoint (Universal Mailer: auto-resolves base URLs, PHP, and dev server)
    try {
      const mailRes = await sendEmailNotification({
        type: 'contact',
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        address: formData.address.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (mailRes.success) {
        emailDelivered = true;
      } else if (mailRes.error) {
        console.warn('Mailer endpoint error:', mailRes.error);
      }
    } catch (mailErr: any) {
      console.warn('Contact mail send error:', mailErr);
    }

    // 3. EmailJS (From info@efficacious.co.in To info@efficacious.co.in)
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    if (!emailDelivered && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_name: 'Efficacious Team',
            to_email: recipientEmail,
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            reply_to: formData.email.trim(),
            name: formData.name.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            phone: formData.mobile.trim(),
            address: formData.address.trim() || 'Not specified',
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            body_content: formattedBody,
            content: formattedBody
          },
          EMAILJS_PUBLIC_KEY
        );
        emailDelivered = true;
      } catch (emailjsErr) {
        console.warn('EmailJS send error:', emailjsErr);
      }
    }

    if (emailDelivered) {
      setSubmitSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        address: '',
        subject: '',
        message: ''
      });
      setTouched({});
      setErrors({});
    } else {
      setErrorMessage('Unable to deliver message right now. Please email us directly at info@efficacious.co.in.');
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decor: Swapped Purple for warm Red/Orange glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#E48100]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-[#EF4444]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-[#E48100] to-[#EF4444] mx-auto rounded-full mb-6" />
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
             <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-[#E48100]/30 transition-colors">
                {/* Large Background Icon: Subtle Orange */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <MapPin size={120} className="text-[#E48100]" />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-[#E48100] mb-6 shadow-sm border border-[#E48100]/10">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Office</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                        {(() => {
                            const addr = contact.office || '';
                            if (addr.includes('\n')) return addr;
                            const parts = addr.split(', ');
                            if (parts.length > 4) {
                                const line1 = parts.slice(0, 3).join(', ');
                                const line2 = parts.slice(3, 6).join(', ');
                                const line3 = parts.slice(6).join(', ');
                                return [line1, line2, line3].filter(Boolean).join(',\n');
                            }
                            return addr;
                        })()}
                    </p>
                </div>
             </div>

             <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-[#E48100]/30 transition-colors group">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-[#E48100] mb-4 shadow-sm border border-[#E48100]/10 group-hover:bg-[#E48100] group-hover:text-white transition-all">
                        <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email Us</h3>
                    <a href={`mailto:${contact.email}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#EF4444] transition-colors">
                        {contact.email}
                    </a>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-[#E48100]/30 transition-colors group">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-[#E48100] mb-4 shadow-sm border border-[#E48100]/10 group-hover:bg-[#E48100] group-hover:text-white transition-all">
                        <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Call Us</h3>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#EF4444] transition-colors">
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
            
            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  Thank you for reaching out. We have received your inquiry and our team will get in touch with you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-gradient-to-r from-[#E48100] to-[#EF4444] text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-all text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                            <span>Full Name <span className="text-red-500">*</span></span>
                        </label>
                        <div className="relative group">
                            <User className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.name && errors.name ? 'text-red-500' : 'text-slate-400 group-focus-within:text-[#E48100]'}`} />
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Amol Tyagi"
                                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                                  touched.name && errors.name 
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#E48100]/20 focus:border-[#E48100]'
                                }`}
                                aria-invalid={Boolean(touched.name && errors.name)}
                            />
                        </div>
                        {touched.name && errors.name && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                            <AlertCircle size={12} className="shrink-0" /> {errors.name}
                          </p>
                        )}
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="mobile" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                            <span>Mobile Number <span className="text-red-500">*</span></span>
                        </label>
                        <div className="relative group">
                            <Smartphone className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.mobile && errors.mobile ? 'text-red-500' : 'text-slate-400 group-focus-within:text-[#E48100]'}`} />
                            <input 
                                type="tel" 
                                id="mobile" 
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="+91 98765 43210"
                                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                                  touched.mobile && errors.mobile 
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#E48100]/20 focus:border-[#E48100]'
                                }`}
                                aria-invalid={Boolean(touched.mobile && errors.mobile)}
                            />
                        </div>
                        {touched.mobile && errors.mobile && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                            <AlertCircle size={12} className="shrink-0" /> {errors.mobile}
                          </p>
                        )}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                        <span>Email Address <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative group">
                        <Mail className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.email && errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-[#E48100]'}`} />
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Amol@example.com"
                            className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                              touched.email && errors.email 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#E48100]/20 focus:border-[#E48100]'
                            }`}
                            aria-invalid={Boolean(touched.email && errors.email)}
                        />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                        <AlertCircle size={12} className="shrink-0" /> {errors.email}
                      </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="address" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                        <span>Address</span>
                    </label>
                    <div className="relative group">
                        <Home className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-[#E48100] transition-colors" />
                        <input 
                            type="text" 
                            id="address" 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Your City / Location"
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#E48100]/20 focus:border-[#E48100] transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                        <span>Subject <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative group">
                        <FileText className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.subject && errors.subject ? 'text-red-500' : 'text-slate-400 group-focus-within:text-[#E48100]'}`} />
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enquiry about..."
                            className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                              touched.subject && errors.subject 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#E48100]/20 focus:border-[#E48100]'
                            }`}
                            aria-invalid={Boolean(touched.subject && errors.subject)}
                        />
                    </div>
                    {touched.subject && errors.subject && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                        <AlertCircle size={12} className="shrink-0" /> {errors.subject}
                      </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                        <span>Message <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative group">
                        <MessageSquare className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.message && errors.message ? 'text-red-500' : 'text-slate-400 group-focus-within:text-[#E48100]'}`} />
                        <textarea 
                            id="message" 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            placeholder="How can we help you?"
                            className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 resize-none ${
                              touched.message && errors.message 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-slate-200 dark:border-slate-700 focus:ring-[#E48100]/20 focus:border-[#E48100]'
                            }`}
                            aria-invalid={Boolean(touched.message && errors.message)}
                        ></textarea>
                    </div>
                    {touched.message && errors.message && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                        <AlertCircle size={12} className="shrink-0" /> {errors.message}
                      </p>
                    )}
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#E48100] to-[#EF4444] hover:to-[#E48100] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#E48100]/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 group disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;