import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, CheckSquare, Bell, UserCheck, BookOpen, Clock, FileText, Sparkles, ChevronRight } from 'lucide-react';

const attendanceData = [
  { name: 'Mon', present: 95, absent: 5 },
  { name: 'Tue', present: 92, absent: 8 },
  { name: 'Wed', present: 98, absent: 2 },
  { name: 'Thu', present: 90, absent: 10 },
  { name: 'Fri', present: 96, absent: 4 },
];

export function DashboardPreview() {
  return (
    <div id="preview" className="py-8 lg:py-16 bg-white dark:bg-slate-950 relative overflow-hidden text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-80 transition-colors duration-300"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-100/50 dark:bg-primary-900/20 rounded-full blur-[100px] transition-colors duration-300"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold tracking-wide mb-6 backdrop-blur-sm transition-colors duration-300"
          >
            <Sparkles className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <span>Premium Interface</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white transition-colors duration-300"
          >
            Experience the <span className="text-primary-600 dark:text-primary-500">Portals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto transition-colors duration-300"
          >
            Intuitive interfaces meticulously designed for extreme clarity and speed. Putting real-time actionable data at your fingertips.
          </motion.p>
        </div>

        {/* Browser Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-6xl mx-auto z-10"
        >
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary-500/30 via-slate-800 to-blue-500/30 rounded-[2.5rem] blur-xl opacity-50"></div>
          <div className="rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden relative backdrop-blur-xl">
            {/* Browser Header */}
            <div className="bg-slate-800/80 border-b border-slate-700/80 px-6 py-4 flex items-center backdrop-blur-md">
              <div className="flex space-x-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] border border-rose-400/50" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] border border-amber-400/50" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] border border-emerald-400/50" />
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="p-4 sm:p-6 bg-slate-950/80 min-h-[400px] relative overflow-hidden">
               {/* Inner ambient glows */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-900/10 rounded-full blur-[80px] pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none"></div>
               
               <div className="relative z-10">
                 <AdminView />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdminView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4 lg:space-y-5"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-4 border-b border-slate-800 gap-4">
        <div>
          <h3 className="text-3xl font-bold text-white tracking-tight mb-2">Good Morning, Sarah</h3>
          <div className="flex items-center gap-3">
             <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">Grade 10 Homeroom</span>
             <p className="text-slate-400 text-sm font-medium flex items-center gap-1.5">
               <Clock className="w-4 h-4 text-amber-400" /> Attendance due in 15 mins
             </p>
          </div>
        </div>
        <button className="bg-primary-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-600 transition-all flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] border border-primary-400">
           <UserCheck className="w-5 h-5" /> Mark Attendance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
        {/* Stat Cards */}
        <div className="bg-slate-800/40 p-3 sm:p-4 rounded-2xl border border-slate-700/50 shadow-sm flex items-center gap-3 backdrop-blur-sm group hover:border-slate-600 transition-colors">
           <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
           </div>
           <div>
             <p className="text-[10px] sm:text-xs text-slate-400 font-bold tracking-wide uppercase mb-0.5">Total Students</p>
             <p className="text-xl sm:text-2xl font-extrabold text-white">32</p>
           </div>
        </div>
        <div className="bg-slate-800/40 p-3 sm:p-4 rounded-2xl border border-slate-700/50 shadow-sm flex items-center gap-3 backdrop-blur-sm group hover:border-slate-600 transition-colors">
           <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
           </div>
           <div>
             <p className="text-[10px] sm:text-xs text-slate-400 font-bold tracking-wide uppercase mb-0.5">Present Today</p>
             <p className="text-xl sm:text-2xl font-extrabold text-white">28</p>
           </div>
        </div>
        <div className="bg-slate-800/40 p-3 sm:p-4 rounded-2xl border border-slate-700/50 shadow-sm flex items-center gap-3 backdrop-blur-sm group hover:border-slate-600 transition-colors">
           <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 group-hover:scale-110 transition-transform">
              <Bell className="w-5 h-5" />
           </div>
           <div>
             <p className="text-[10px] sm:text-xs text-slate-400 font-bold tracking-wide uppercase mb-0.5">Leave Requests</p>
             <p className="text-xl sm:text-2xl font-extrabold text-white">3</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-slate-800/40 p-4 sm:p-5 rounded-3xl border border-slate-700/50 shadow-sm backdrop-blur-sm">
           <h4 className="text-base font-bold text-white mb-3 lg:mb-4 flex items-center gap-2">
             <div className="w-2 h-5 bg-primary-500 rounded-full"></div>
             Weekly Attendance Analytics
           </h4>
           <div className="h-40 lg:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #475569', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)', backgroundColor: '#1e293b', color: '#f8fafc' }} 
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="present" stroke="#10b981" fillOpacity={1} fill="url(#colorPresent)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Gradebook snippet */}
        <div className="bg-slate-800/40 p-4 sm:p-5 rounded-3xl border border-slate-700/50 shadow-sm backdrop-blur-sm flex flex-col">
           <h4 className="text-base font-bold text-white mb-3 lg:mb-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-2 h-5 bg-blue-500 rounded-full"></div>
                Gradebook
             </div>
             <span className="text-xs lg:text-sm font-semibold text-blue-400 cursor-pointer hover:text-blue-300 flex items-center gap-1">
               View All <ChevronRight className="w-4 h-4" />
             </span>
           </h4>
           <div className="space-y-2 flex-1">
              {[
                { name: 'Mathematics Quiz 1', avg: '85%' },
                { name: 'Science Project', avg: '92%' },
                { name: 'History Midterm', avg: '78%' },
                { name: 'English Essay', avg: '88%' }
              ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-3 lg:p-4 hover:bg-slate-700/50 rounded-2xl border border-slate-700/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 text-slate-400 transition-colors">
                         <FileText className="w-4 h-4" />
                       </div>
                       <span className="text-xs lg:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-xs lg:text-sm font-extrabold text-white">{item.avg}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
