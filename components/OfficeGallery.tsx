import React from 'react';
import { motion as m } from 'framer-motion';
import { MapPin, User, Star, TrendingUp, Users, Award, Quote, Linkedin, Building2, Calendar } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const motion = m as any;

/* ─── Founder & CEO Spotlight Card ─────────────────────────────────────── */
const FounderCard: React.FC<{ member: any; index: number }> = ({ member, index }) => {
  const stats = [
    { icon: Calendar,    label: 'Founded',           value: '2012' },
    { icon: Building2,   label: 'Products Launched',  value: '4+' },
    { icon: Users,       label: 'Schools Empowered',  value: '500+' },
    { icon: TrendingUp,  label: 'Years of Growth',    value: '12+' },
  ];

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[2rem] mb-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: 'easeOut' }}
    >
      {/* ── layered glow border ── */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-400 via-brand-500 to-purple-600 p-[2px]">
        <div className="absolute inset-0 rounded-[2rem] bg-white dark:bg-slate-900" />
      </div>

      {/* ── ambient glow blobs ── */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-amber-400/20 dark:bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-brand-500/20 dark:bg-brand-500/10 blur-3xl pointer-events-none" />

      {/* ── card body ── */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-10 p-10">

        {/* LEFT — avatar column */}
        <div className="flex flex-col items-center gap-5 lg:w-64 flex-shrink-0">

          {/* Shimmer badge */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400 to-brand-500 animate-pulse opacity-60 blur-sm" />
            <div className="relative w-44 h-44 rounded-full overflow-hidden ring-4 ring-amber-300 dark:ring-amber-500/50 shadow-2xl">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Name + role */}
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {member.name}
            </h3>

            {/* Animated shimmer role badge */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase
                            bg-gradient-to-r from-amber-400 to-brand-500 text-white shadow-md shadow-amber-300/30 dark:shadow-amber-700/20
                            relative overflow-hidden">
              <Star size={11} className="fill-white/80" />
              {member.role}
              {/* shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                               translate-x-[-100%] animate-[shimmer_2.5s_infinite]" />
            </div>
          </div>

          {/* LinkedIn CTA */}
          <a
            href="https://www.linkedin.com/in/kamalagrawal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       bg-[#0A66C2] hover:bg-[#0854a5] text-white text-xs font-semibold
                       shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Linkedin size={13} />
            Connect on LinkedIn
          </a>

          {/* "Since" ribbon */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Award size={13} className="text-amber-500" />
            Leading Efficacious since 2012
          </div>
        </div>

        {/* RIGHT — content column */}
        <div className="flex flex-col justify-center flex-1 gap-6">

          {/* Vision quote */}
          <div className="relative pl-5 border-l-4 border-amber-400 dark:border-amber-500">
            <Quote size={20} className="absolute -top-1 -left-2.5 text-amber-400 dark:text-amber-500" />
            <p className="text-lg font-semibold italic text-slate-700 dark:text-slate-200 leading-relaxed">
              "Innovating at the intersection of education and technology — making every classroom smarter and every child safer."
            </p>
          </div>

          {/* Bio */}
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {member.description} A core finance professional turned tech entrepreneur, Kamal founded Efficacious in 2012 with a singular focus: harness technology to solve real-world problems in education, healthcare, and logistics across India.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl
                           bg-gradient-to-br from-amber-50 to-brand-50 dark:from-amber-900/15 dark:to-brand-900/15
                           border border-amber-100 dark:border-amber-800/30
                           hover:shadow-md transition-shadow duration-300"
              >
                <Icon size={18} className="text-amber-500 dark:text-amber-400" />
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">{value}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">{label}</span>
              </div>
            ))}
          </div>

          {/* Pillars */}
          <div className="flex flex-wrap gap-2 mt-1">
            {['EdTech Pioneer', 'ERP Architect', 'Child Safety Advocate', 'Finance Expert', 'Innovation Leader'].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[11px] font-semibold
                           bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                           text-slate-600 dark:text-slate-300 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Regular Team Member Card ──────────────────────────────────────────── */
const MemberCard: React.FC<{ member: any; index: number }> = ({ member, index }) => (
  <motion.div
    key={member.id || index}
    className="rounded-3xl p-8 border border-slate-100 dark:border-slate-700
               bg-slate-50 dark:bg-slate-800/50
               hover:border-brand-300 hover:shadow-xl
               transition-all duration-300 group flex flex-col items-center text-center
               w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] max-w-sm"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
  >
    <div className="w-24 h-24 flex-shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full
                    overflow-hidden shadow-md mb-6 ring-4 ring-white dark:ring-slate-800
                    group-hover:scale-105 transition-transform duration-500">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2
                   group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
      {member.name}
    </h3>
    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4
                    bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
      {member.role}
    </div>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t
                  border-slate-100 dark:border-slate-700/50 pt-4 w-full">
      {member.description}
    </p>
  </motion.div>
);

/* ─── Main Component ────────────────────────────────────────────────────── */
const OfficeGallery: React.FC = () => {
  const { data } = useContent();
  const galleryImages = data.gallery || [];
  const teamMembers  = data.team   || [];

  const getLayoutSize = (index: number) => {
    const sizes = [
      'md:col-span-2 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ];
    return sizes[index % sizes.length];
  };

  const founder = teamMembers.find((m: any) =>
    m.role.toLowerCase().includes('founder') || m.role.toLowerCase().includes('ceo')
  );
  const restMembers = teamMembers.filter((m: any) =>
    !(m.role.toLowerCase().includes('founder') || m.role.toLowerCase().includes('ceo'))
  );

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Gallery Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin size={14} className="text-brand-500" /> Navi Mumbai HQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Efficacious</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              A glimpse into our workspace where creativity meets technology. Designed for collaboration, built for innovation.
            </p>
          </motion.div>
        </div>

        {/* ── Gallery Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryImages.map((image: any, index: number) => (
            <motion.div
              key={image.id}
              className={`relative group overflow-hidden rounded-3xl ${getLayoutSize(index)}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-400 text-xs font-bold uppercase tracking-wider mb-1 block">{image.category || 'Office'}</span>
                  <h3 className="text-white font-bold text-xl">{image.caption}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Team Section Header ── */}
        <div className="mt-32 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-4">
              <User size={14} className="text-brand-500" /> Our Office Staff
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400">Team</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              The dedicated minds behind our innovative solutions.
            </p>
          </motion.div>
        </div>

        {/* ── Founder spotlight (full width, rendered first) ── */}
        {founder && <FounderCard member={founder} index={0} />}

        {/* ── Rest of the team ── */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {restMembers.map((member: any, i: number) => (
            <MemberCard key={member.id || i} member={member} index={i + 1} />
          ))}
        </div>

      </div>

      {/* ── Global shimmer keyframe ── */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
};

export default OfficeGallery;
