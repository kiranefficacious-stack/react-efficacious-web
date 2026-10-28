import React, { useState, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, CheckCircle2, Upload, Send, 
  MapPin, Clock, ChevronDown, 
  ChevronUp, User, Mail, Phone, FileText, Globe, TrendingUp,
  FileCheck, MessageSquare, Coffee, AlertCircle, Loader2, X
} from 'lucide-react';
import { useContent } from '../hooks/useContent';
import emailjs from '@emailjs/browser';

const motion = m as any;

const Careers: React.FC = () => {
  const { data } = useContent();
  const openings = data.careers;
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const recruitmentSteps = [
    { icon: <FileCheck size={20} />, title: "Application Review", desc: "Our HR team reviews your profile." },
    { icon: <Phone size={20} />, title: "Telephonic Round", desc: "A quick chat to understand your goals." },
    { icon: <MessageSquare size={20} />, title: "Technical Interview", desc: "Deep dive into your skills & experience." },
    { icon: <Coffee size={20} />, title: "Final Discussion", desc: "Culture fit and offer discussion." },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    position: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fileError, setFileError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(typeof reader.result === 'string' ? reader.result : '');
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };

  const validateFile = (file: File): string | null => {
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      return 'Please upload a PDF or DOCX file (.pdf, .doc, .docx)';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'File size exceeds 5MB limit. Please choose a smaller file.';
    }
    return null;
  };

  const validate = (values = formData): Record<string, string> => {
    const errs: Record<string, string> = {};

    if (!values.name.trim()) {
      errs.name = 'Full name is required';
    } else if (values.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!values.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else {
      const digits = values.mobile.replace(/\D/g, '');
      if (digits.length < 10) {
        errs.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    if (!values.address.trim()) {
      errs.address = 'City / Location is required';
    } else if (values.address.trim().length < 2) {
      errs.address = 'Please enter a valid location';
    }

    if (!values.position || values.position.trim() === '' || values.position === 'Select a position') {
      errs.position = 'Please select a position from the dropdown';
    }

    return errs;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate();
    setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const err = validateFile(file);
      if (err) {
        setFileError(err);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setFileError('');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const err = validateFile(file);
      if (err) {
        setFileError(err);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      mobile: true,
      address: true,
      position: true
    });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0 || fileError) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    const recipientEmail = 'info@efficacious.co.in';
    let emailDelivered = false;

    // 1. Read file as Data URL if under 850KB for direct email attachment
    let resumeDataUrl = '';
    if (selectedFile && selectedFile.size <= 850 * 1024) {
      try {
        resumeDataUrl = await readFileAsDataUrl(selectedFile);
      } catch (readErr) {
        console.warn('Could not read resume as data URL:', readErr);
      }
    }

    // Formatted rich text body content
    const formattedCareerBody = `
New Job Application Received:
--------------------------------------------------
Candidate Name:   ${formData.name.trim()}
Email Address:    ${formData.email.trim()}
Mobile Number:    ${formData.mobile.trim()}
Location / City:  ${formData.address.trim()}
Applied Position: ${formData.position}

Resume Attached:  ${selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : 'No file attached'}

Cover Letter / Candidate Notes:
${formData.message.trim() || 'No cover letter provided'}
--------------------------------------------------
To / Recipient:   ${recipientEmail}
`.trim();

    // 2. Email Notification Endpoint (Cloud Function or local dev mailer)
    const CLOUD_FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || '/api/send-email';
    if (CLOUD_FUNCTIONS_URL) {
      try {
        const fnRes = await fetch(CLOUD_FUNCTIONS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'career',
            name: formData.name.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            address: formData.address.trim(),
            position: formData.position,
            message: formData.message.trim(),
            resumeName: selectedFile ? selectedFile.name : '',
            resumeSize: selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '',
            resumeDataUrl: resumeDataUrl || '',
          }),
        });
        const fnData = await fnRes.json().catch(() => null);
        if (fnRes.ok && (fnData?.success === true || fnData?.success === 'true')) {
          emailDelivered = true;
        } else if (fnData?.error) {
          console.warn('Mailer endpoint error:', fnData.error);
          setStatusMessage(fnData.error);
        }
      } catch (fnErr: any) {
        console.warn('Firebase Cloud Function careers send error:', fnErr);
      }
    }

    // 3. EmailJS (From info@efficacious.co.in To info@efficacious.co.in)
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const EMAILJS_CAREERS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CAREERS_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    if (!emailDelivered && EMAILJS_SERVICE_ID && EMAILJS_CAREERS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CAREERS_TEMPLATE_ID,
          {
            to_name: 'Efficacious HR Team',
            to_email: recipientEmail,
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            reply_to: formData.email.trim(),
            name: formData.name.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            phone: formData.mobile.trim(),
            address: formData.address.trim(),
            position: formData.position,
            message: formData.message.trim() || 'No cover letter provided',
            resume_name: selectedFile ? selectedFile.name : 'No file attached',
            resume_size: selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'N/A',
            body_content: formattedCareerBody,
            content: formattedCareerBody
          },
          EMAILJS_PUBLIC_KEY
        );
        emailDelivered = true;
      } catch (emailjsErr) {
        console.warn('EmailJS careers send error:', emailjsErr);
      }
    }

    if (emailDelivered) {
      setSubmitStatus('success');
      setStatusMessage('Thank you! Your application has been submitted successfully.');
      setFormData({ name: '', email: '', mobile: '', address: '', position: '', message: '' });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTouched({});
      setErrors({});
      setFileError('');
    } else {
      setSubmitStatus('error');
      setStatusMessage('Unable to submit your application right now. Please email your CV directly to info@efficacious.co.in.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* --- HERO SECTION (Match Screen Height) --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-slate-900/80 z-10" />
            <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920" 
                alt="Team working together" 
                className="w-full h-full object-cover"
            />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-6">
                    <Briefcase size={14} className="text-brand-400" /> Careers at Efficacious
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                    Do Work That <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Matters</span>
                </h1>
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Join a team of visionaries, creators, and problem solvers. We're building the future of educational and business ERP solutions.
                </p>
                
                <motion.button 
                    onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-brand-600/30 transition-all"
                >
                    View Open Positions
                </motion.button>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        >
            <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- WHY WORK WITH US --- */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                  >
                      <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                          Why Work With Us?
                      </h2>
                      <div className="prose dark:prose-invert text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                          <p>
                              We believe passion is sustained by a unique culture that encourages people to harmonize their whole self—not just professional aspirations—with the organization’s pursuits.
                          </p>
                          <p>
                              Our culture is built on trust, autonomy, and a shared vision. Over the years, this has structured Efficacious into an employee owned organization, where every team member contributes directly to our collective success and growth.
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-8">
                              {[
                                  { label: "Employee Owned", icon: <User /> },
                                  { label: "Growth Focused", icon: <TrendingUp /> },
                                  { label: "Inclusive Culture", icon: <Globe /> },
                                  { label: "Work-Life Balance", icon: <Clock /> }
                              ].map((item, i) => (
                                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                      <div className="text-brand-600 dark:text-brand-400">{item.icon}</div>
                                      <span className="font-semibold text-slate-900 dark:text-white">{item.label}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </motion.div>

                  <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                  >
                      <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                          <img 
                              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                              alt="Office Culture" 
                              className="w-full h-full object-cover"
                          />
                      </div>
                      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -z-10" />
                  </motion.div>
              </div>
          </div>
      </section>

      {/* --- CURRENT OPENINGS --- */}
      <section id="openings" className="py-24 bg-slate-50 dark:bg-dark-bg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Current Openings</h2>
                  <p className="text-slate-600 dark:text-slate-400">Find the role that fits your expertise.</p>
              </div>

              <div className="space-y-6">
                  {openings.map((job) => (
                      <motion.div 
                          key={job.id}
                          className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                      >
                          <div 
                              className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                              onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                          >
                              <div>
                                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h3>
                                  <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                                      <span className="flex items-center gap-1"><Briefcase size={16} /> {job.experience}</span>
                                      <span className="flex items-center gap-1"><MapPin size={16} /> Mumbai / Remote</span>
                                      <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-3">
                                  <button className="bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-lg text-sm font-bold">
                                      View Details
                                  </button>
                                  {expandedJob === job.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                              </div>
                          </div>

                          <AnimatePresence>
                              {expandedJob === job.id && (
                                  <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"
                                  >
                                      <div className="p-6 md:p-8">
                                          <p className="text-slate-700 dark:text-slate-300 mb-6 whitespace-pre-line leading-relaxed">{job.description}</p>
                                          
                                          <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                              <CheckCircle2 size={18} className="text-brand-500" /> Job Criteria
                                          </h4>
                                          <ul className="grid md:grid-cols-2 gap-3 mb-8">
                                              {job.criteria.map((item, i) => (
                                                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                                                      {item}
                                                  </li>
                                              ))}
                                          </ul>

                                          <button 
                                              onClick={() => {
                                                  setFormData(prev => ({ ...prev, position: job.title }));
                                                  document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                                              }}
                                              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                                          >
                                              Apply for this Position
                                          </button>
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- APPLICATION FORM SECTION --- */}
      <section id="apply-form" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-slate-800/50 -skew-x-12 translate-x-32 hidden lg:block" />
          <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 dark:bg-grid-slate-800 opacity-50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                  
                  {/* Left Column: Context & Process */}
                  <div className="lg:col-span-5 space-y-12">
                      <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                      >
                          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                              Ready to make an <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Impact?</span>
                          </h2>
                          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                              We're always looking for talented individuals who are passionate about technology and innovation. Fill out the form, and let's start a conversation.
                          </p>
                          
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                              <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                  <Briefcase className="w-5 h-5 text-brand-500" /> Recruitment Process
                              </h3>
                              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-slate-200 dark:before:bg-slate-700">
                                  {recruitmentSteps.map((step, index) => (
                                      <div key={index} className="flex gap-4 relative">
                                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-500 flex items-center justify-center shrink-0 z-10 shadow-sm text-brand-600 dark:text-brand-400">
                                              {React.cloneElement(step.icon as React.ReactElement<any>, { size: 14 })}
                                          </div>
                                          <div>
                                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </motion.div>
                  </div>

                  {/* Right Column: The Form */}
                  <div className="lg:col-span-7">
                      <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700"
                      >
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Application Form</h3>
                          <form 
                              noValidate 
                              onSubmit={handleSubmit} 
                              method="POST" 
                              encType="multipart/form-data" 
                              action="https://formsubmit.co/99a588cd0cd777cbb113f4394a597440"
                              className="space-y-6"
                          >
                              {submitStatus === 'error' && (
                                  <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
                                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                      <span>{statusMessage || 'Something went wrong while submitting your application.'}</span>
                                  </div>
                              )}

                              <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-1.5 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                                          <span>Full Name <span className="text-red-500">*</span></span>
                                      </label>
                                      <div className="relative">
                                          <User className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.name && errors.name ? 'text-red-500' : 'text-slate-400 group-focus-within:text-brand-500'}`} />
                                          <input 
                                              type="text" 
                                              name="name"
                                              value={formData.name}
                                              onChange={handleInputChange}
                                              onBlur={handleInputBlur}
                                              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 ${
                                                touched.name && errors.name 
                                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                                              }`}
                                              placeholder="John Doe"
                                              aria-invalid={Boolean(touched.name && errors.name)}
                                          />
                                      </div>
                                      {touched.name && errors.name && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                                          <AlertCircle size={12} className="shrink-0" /> {errors.name}
                                        </p>
                                      )}
                                  </div>
                                  
                                  <div className="space-y-1.5 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                                          <span>Email Address <span className="text-red-500">*</span></span>
                                      </label>
                                      <div className="relative">
                                          <Mail className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.email && errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-brand-500'}`} />
                                          <input 
                                              type="email" 
                                              name="email"
                                              value={formData.email}
                                              onChange={handleInputChange}
                                              onBlur={handleInputBlur}
                                              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 ${
                                                touched.email && errors.email 
                                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                                              }`}
                                              placeholder="john@example.com"
                                              aria-invalid={Boolean(touched.email && errors.email)}
                                          />
                                      </div>
                                      {touched.email && errors.email && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                                          <AlertCircle size={12} className="shrink-0" /> {errors.email}
                                        </p>
                                      )}
                                  </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-1.5 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                                          <span>Mobile Number <span className="text-red-500">*</span></span>
                                      </label>
                                      <div className="relative">
                                          <Phone className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.mobile && errors.mobile ? 'text-red-500' : 'text-slate-400 group-focus-within:text-brand-500'}`} />
                                          <input 
                                              type="tel" 
                                              name="mobile"
                                              value={formData.mobile}
                                              onChange={handleInputChange}
                                              onBlur={handleInputBlur}
                                              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 ${
                                                touched.mobile && errors.mobile 
                                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                                              }`}
                                              placeholder="+91 98765 43210"
                                              aria-invalid={Boolean(touched.mobile && errors.mobile)}
                                          />
                                      </div>
                                      {touched.mobile && errors.mobile && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                                          <AlertCircle size={12} className="shrink-0" /> {errors.mobile}
                                        </p>
                                      )}
                                  </div>

                                  <div className="space-y-1.5 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                                          <span>Address / City <span className="text-red-500">*</span></span>
                                      </label>
                                      <div className="relative">
                                          <MapPin className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.address && errors.address ? 'text-red-500' : 'text-slate-400 group-focus-within:text-brand-500'}`} />
                                          <input 
                                              type="text" 
                                              name="address"
                                              value={formData.address}
                                              onChange={handleInputChange}
                                              onBlur={handleInputBlur}
                                              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 ${
                                                touched.address && errors.address 
                                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                                              }`}
                                              placeholder="City, State"
                                              aria-invalid={Boolean(touched.address && errors.address)}
                                          />
                                      </div>
                                      {touched.address && errors.address && (
                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                                          <AlertCircle size={12} className="shrink-0" /> {errors.address}
                                        </p>
                                      )}
                                  </div>
                              </div>

                              <div className="space-y-1.5 group">
                                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                                      <span>Applied Position <span className="text-red-500">*</span></span>
                                  </label>
                                  <div className="relative">
                                      <Briefcase className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${touched.position && errors.position ? 'text-red-500' : 'text-slate-400 group-focus-within:text-brand-500'}`} />
                                      <select 
                                          name="position"
                                          value={formData.position}
                                          onChange={handleInputChange}
                                          onBlur={handleInputBlur}
                                          className={`w-full pl-11 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all appearance-none text-slate-900 dark:text-white font-medium cursor-pointer focus:outline-none focus:ring-2 ${
                                            touched.position && errors.position 
                                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                              : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                                          }`}
                                          aria-invalid={Boolean(touched.position && errors.position)}
                                      >
                                          <option value="">Select a position</option>
                                          {openings.map(job => (
                                              <option key={job.id} value={job.title}>{job.title}</option>
                                          ))}
                                          <option value="Other">Other / General Application</option>
                                      </select>
                                      <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                                  </div>
                                  {touched.position && errors.position && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                                      <AlertCircle size={12} className="shrink-0" /> {errors.position}
                                    </p>
                                  )}
                              </div>

                              <div className="space-y-1.5">
                                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                                      <span>Upload CV / Resume</span>
                                      <span className="text-xs text-slate-400">PDF, DOCX up to 5MB</span>
                                  </label>
                                  <div 
                                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group ${
                                        fileError 
                                          ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20' 
                                          : dragActive 
                                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' 
                                            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800'
                                      }`}
                                      onDragEnter={handleDrag}
                                      onDragLeave={handleDrag}
                                      onDragOver={handleDrag}
                                      onDrop={handleDrop}
                                  >
                                      <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        name="attachment"
                                        id="resume_file_input"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                      />
                                      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                          <Upload className="w-6 h-6 text-slate-500 dark:text-slate-300" />
                                      </div>
                                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                                          {selectedFile ? (
                                              <span className="text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center gap-2">
                                                  <span>{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                                  <button
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFile(null);
                                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                                      }}
                                                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 hover:text-red-500"
                                                      title="Remove file"
                                                  >
                                                      <X size={14} />
                                                  </button>
                                              </span>
                                          ) : (
                                              <>Drag & Drop or <span className="text-brand-600 dark:text-brand-400 underline font-semibold">Click to Upload</span></>
                                          )}
                                      </p>
                                  </div>
                                  {fileError && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium ml-1">
                                      <AlertCircle size={12} className="shrink-0" /> {fileError}
                                    </p>
                                  )}
                              </div>

                              <div className="space-y-1.5 group">
                                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Cover Letter / Message</label>
                                  <div className="relative">
                                      <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                      <textarea 
                                          name="message"
                                          value={formData.message}
                                          onChange={handleInputChange}
                                          rows={3}
                                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                          placeholder="Tell us a bit about yourself and relevant experience..."
                                      ></textarea>
                                  </div>
                              </div>

                              <div className="relative pt-2">
                                  {submitStatus === 'success' && (
                                      <motion.div 
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-2xl border border-emerald-500 text-center p-6 shadow-2xl"
                                      >
                                          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3">
                                              <CheckCircle2 size={32} />
                                          </div>
                                          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Application Sent Successfully!</h4>
                                          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                                              Thank you for applying. Your application has been recorded and our HR team will review your profile shortly.
                                          </p>
                                          <button 
                                            type="button"
                                            onClick={() => setSubmitStatus('idle')}
                                            className="px-4 py-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-brand-100 transition-colors"
                                          >
                                            Submit Another Application
                                          </button>
                                      </motion.div>
                                  )}

                                  <button 
                                      type="submit"
                                      disabled={isSubmitting}
                                      className="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                                  >
                                      {isSubmitting ? (
                                          <>
                                              <Loader2 size={20} className="animate-spin" />
                                              <span>Sending Application...</span>
                                          </>
                                      ) : (
                                          <>
                                              <Send size={20} />
                                              <span>Send Application</span>
                                          </>
                                      )}
                                  </button>
                              </div>
                          </form>
                      </motion.div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default Careers;