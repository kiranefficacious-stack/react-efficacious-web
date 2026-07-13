import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Mail, Phone, School, Building2, Users,
  CheckCircle2, Send, Loader2, ChevronDown
} from 'lucide-react';
import emailjs from '@emailjs/browser';



const STUDENT_RANGES = [
  'Less than 200',
  '200 – 500',
  '500 – 1,000',
  '1,000 – 3,000',
  'More than 3,000',
];

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    city: '',
    studentCount: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())       e.name       = 'Full name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                  e.email      = 'Valid email is required.';
    if (!form.phone.trim())      e.phone      = 'Phone number is required.';
    if (!form.schoolName.trim()) e.schoolName = 'School name is required.';
    if (!form.studentCount)      e.studentCount = 'Please select student count.';
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');

    // Build a mailto body as fallback / primary delivery
    const subject = encodeURIComponent(`[eSMARTs Demo Request] ${form.schoolName}`);
    const body = encodeURIComponent(
      `New Demo Request\n` +
      `================\n` +
      `Name:          ${form.name}\n` +
      `Email:         ${form.email}\n` +
      `Phone:         ${form.phone}\n` +
      `School:        ${form.schoolName}\n` +
      `City:          ${form.city || 'N/A'}\n` +
      `Students:      ${form.studentCount}\n` +
      `Message:       ${form.message || 'N/A'}\n`
    );

    // Try EmailJS first; fall back to mailto if not configured
    try {
      // EmailJS: update these three IDs after setting up EmailJS account
      // https://www.emailjs.com/ → Service ID, Template ID, Public Key
      const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name:     form.name,
            from_email:    form.email,
            phone:         form.phone,
            school_name:   form.schoolName,
            city:          form.city || 'N/A',
            student_count: form.studentCount,
            message:       form.message || 'N/A',
            to_email:      'info@efficacious.co.in',
          },
          PUBLIC_KEY
        );
        setStatus('success');
      } else {
        // Fallback: open user's default mail client with pre-filled content
        window.location.href = `mailto:info@efficacious.co.in?subject=${subject}&body=${body}`;
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', phone: '', schoolName: '', city: '', studentCount: '', plan: 'Premium', message: '' });
    setErrors({});
    setStatus('idle');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Book a Demo"
          >
            <div
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 rounded-t-3xl px-8 pt-8 pb-10 text-white overflow-hidden">
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <button
                  onClick={onClose}
                  id="close-demo-modal"
                  aria-label="Close dialog"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative z-10">
                  <h2 className="text-2xl font-extrabold leading-tight">
                    Book Your Personalized Demo
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">
                    Fill in your details and we'll get back to you within 24 hours.
                  </p>
                </div>
              </div>

              {/* Form / States */}
              <div className="px-8 pt-6 pb-8 -mt-4">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8 gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Request Sent!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                      Thank you, <strong>{form.name}</strong>! Our team will reach out to <strong>{form.email}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={reset}
                      className="mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" error={errors.name} required>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="demo-name"
                            name="name"
                            type="text"
                            placeholder="Rajesh Kumar"
                            value={form.name}
                            onChange={handleChange}
                            className={input(!!errors.name)}
                          />
                        </div>
                      </Field>
                      <Field label="Email Address" error={errors.email} required>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="demo-email"
                            name="email"
                            type="email"
                            placeholder="principal@school.edu"
                            value={form.email}
                            onChange={handleChange}
                            className={input(!!errors.email)}
                          />
                        </div>
                      </Field>
                    </div>

                    {/* Phone + City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Phone Number" error={errors.phone} required>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="demo-phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={handleChange}
                            className={input(!!errors.phone)}
                          />
                        </div>
                      </Field>
                      <Field label="City / Location" error={errors.city}>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="demo-city"
                            name="city"
                            type="text"
                            placeholder="Mumbai"
                            value={form.city}
                            onChange={handleChange}
                            className={input(false)}
                          />
                        </div>
                      </Field>
                    </div>

                    {/* School Name */}
                    <Field label="School / Institution Name" error={errors.schoolName} required>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="demo-school"
                          name="schoolName"
                          type="text"
                          placeholder="St. Mary's High School"
                          value={form.schoolName}
                          onChange={handleChange}
                          className={input(!!errors.schoolName)}
                        />
                      </div>
                    </Field>

                    {/* Student Count */}
                    <Field label="Approximate Student Count" error={errors.studentCount} required>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                          id="demo-student-count"
                          name="studentCount"
                          value={form.studentCount}
                          onChange={handleChange}
                          className={select(!!errors.studentCount)}
                        >
                          <option value="">Select range…</option>
                          {STUDENT_RANGES.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </Field>

                    {/* Message */}
                    <Field label="Additional Message (Optional)" error={undefined}>
                      <textarea
                        id="demo-message"
                        name="message"
                        rows={3}
                        placeholder="Tell us about your specific requirements…"
                        value={form.message}
                        onChange={handleChange}
                        className={`${input(false)} resize-none`}
                      />
                    </Field>

                    {status === 'error' && (
                      <p className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 rounded-xl">
                        Something went wrong. Please try again or email us directly at{' '}
                        <a href="mailto:info@efficacious.co.in" className="underline font-semibold">
                          info@efficacious.co.in
                        </a>.
                      </p>
                    )}

                    <button
                      id="demo-submit"
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Demo Request
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                      By submitting, you agree to be contacted by the eSMARTs team.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function input(hasError: boolean) {
  return [
    'w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white',
    'bg-slate-50 dark:bg-slate-900',
    'border transition-colors focus:outline-none focus:ring-2',
    hasError
      ? 'border-rose-400 focus:ring-rose-400/30 focus:border-rose-400'
      : 'border-slate-200 dark:border-slate-700 focus:ring-primary-500/20 focus:border-primary-500',
    'placeholder-slate-400',
  ].join(' ');
}

function select(hasError: boolean) {
  return [
    'w-full pl-10 pr-8 py-3 rounded-xl text-sm appearance-none',
    'bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white',
    'border transition-colors focus:outline-none focus:ring-2',
    hasError
      ? 'border-rose-400 focus:ring-rose-400/30 focus:border-rose-400'
      : 'border-slate-200 dark:border-slate-700 focus:ring-primary-500/20 focus:border-primary-500',
  ].join(' ');
}

function Field({
  label, error, required, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
