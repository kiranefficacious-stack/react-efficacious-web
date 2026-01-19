import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, CheckCircle2, Upload, Send, 
  MapPin, Clock, ChevronDown, 
  ChevronUp, User, Mail, Phone, FileText, Globe, TrendingUp,
  FileCheck, MessageSquare, Coffee
} from 'lucide-react';
import { useContent } from '../hooks/useContent';

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
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    // Handle actual submission logic here
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
                                          <p className="text-slate-700 dark:text-slate-300 mb-6">{job.description}</p>
                                          
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
                          <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                                      <div className="relative">
                                          <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                          <input 
                                              type="text" 
                                              name="name"
                                              value={formData.name}
                                              onChange={handleInputChange}
                                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                              placeholder="John Doe"
                                              required
                                          />
                                      </div>
                                  </div>
                                  
                                  <div className="space-y-2 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                      <div className="relative">
                                          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                          <input 
                                              type="email" 
                                              name="email"
                                              value={formData.email}
                                              onChange={handleInputChange}
                                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                              placeholder="john@example.com"
                                              required
                                          />
                                      </div>
                                  </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Mobile Number</label>
                                      <div className="relative">
                                          <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                          <input 
                                              type="tel" 
                                              name="mobile"
                                              value={formData.mobile}
                                              onChange={handleInputChange}
                                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                              placeholder="+91 98765 43210"
                                              required
                                          />
                                      </div>
                                  </div>

                                  <div className="space-y-2 group">
                                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Address</label>
                                      <div className="relative">
                                          <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                          <input 
                                              type="text" 
                                              name="address"
                                              value={formData.address}
                                              onChange={handleInputChange}
                                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                              placeholder="City, State"
                                              required
                                          />
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-2 group">
                                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Applied Position</label>
                                  <div className="relative">
                                      <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                      <select 
                                          name="position"
                                          value={formData.position}
                                          onChange={handleInputChange}
                                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium cursor-pointer"
                                          required
                                      >
                                          <option value="">Select a position</option>
                                          {openings.map(job => (
                                              <option key={job.id} value={job.title}>{job.title}</option>
                                          ))}
                                          <option value="Other">Other / General Application</option>
                                      </select>
                                      <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                                  </div>
                              </div>

                              <div className="space-y-2">
                                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Upload CV / Resume</label>
                                  <div 
                                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${dragActive ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800'}`}
                                      onDragEnter={handleDrag}
                                      onDragLeave={handleDrag}
                                      onDragOver={handleDrag}
                                      onDrop={handleDrop}
                                  >
                                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                      <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                          <Upload className="w-7 h-7 text-slate-500 dark:text-slate-300" />
                                      </div>
                                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                                          Drag & Drop or <span className="text-brand-600 dark:text-brand-400 underline">Click to Upload</span>
                                      </p>
                                      <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 5MB</p>
                                  </div>
                              </div>

                              <div className="space-y-2 group">
                                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Cover Letter / Message</label>
                                  <div className="relative">
                                      <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                      <textarea 
                                          name="message"
                                          value={formData.message}
                                          onChange={handleInputChange}
                                          rows={3}
                                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                          placeholder="Tell us a bit about yourself..."
                                      ></textarea>
                                  </div>
                              </div>

                              <button 
                                  type="submit"
                                  className="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
                              >
                                  <Send size={20} />
                                  Send Application
                              </button>
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