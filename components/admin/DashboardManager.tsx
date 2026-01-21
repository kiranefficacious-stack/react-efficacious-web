import React from 'react';
import { useContent } from '../../hooks/useContent';
import { 
  Newspaper, Image, Layout, Briefcase, 
  Users, Box, Phone, Info, GraduationCap, Truck
} from 'lucide-react';

const DashboardManager: React.FC = () => {
  const { data } = useContent();

  const stats = [
    { 
      label: 'News & Events', 
      value: data.news.length, 
      icon: <Newspaper size={24} />,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Gallery Images', 
      value: data.gallery.length, 
      icon: <Image size={24} />,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Services', 
      value: data.services.length, 
      icon: <Layout size={24} />,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    { 
      label: 'Careers', 
      value: data.careers.length, 
      icon: <Briefcase size={24} />,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    { 
      label: 'Portfolio Projects', 
      value: data.portfolio.length, 
      icon: <Briefcase size={24} />,
      color: 'bg-teal-500',
      textColor: 'text-teal-600'
    },
    { 
      label: 'Blog Posts', 
      value: data.blogs.length, 
      icon: <Box size={24} />,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
    },
    { 
      label: 'Partners', 
      value: data.partners.items.length, 
      icon: <Users size={24} />,
      color: 'bg-pink-500',
      textColor: 'text-pink-600'
    },
    { 
      label: 'Products', 
      value: data.products.length, 
      icon: <Box size={24} />,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Overview of your website content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center ${stat.textColor} dark:text-white dark:bg-opacity-20`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Status */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          System Status
        </h3>
        <div className="space-y-4">
           {/* Contact Info Check */}
           <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
             <div className="flex items-center gap-3">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${data.contact.office ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                 <Phone size={16} />
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-900 dark:text-white">Contact Information</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">
                   {data.contact.office ? 'Configured' : 'Missing Information'}
                 </p>
               </div>
             </div>
             <span className={`text-xs font-bold px-2 py-1 rounded ${data.contact.office ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {data.contact.office ? 'Active' : 'Action Needed'}
             </span>
           </div>

           {/* About Info Check */}
           <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
             <div className="flex items-center gap-3">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${data.about.hero.title ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                 <Info size={16} />
               </div>
               <div>
                 <p className="text-sm font-medium text-slate-900 dark:text-white">About Section</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">
                   {data.about.hero.title ? 'Configured' : 'Missing Information'}
                 </p>
               </div>
             </div>
             <span className={`text-xs font-bold px-2 py-1 rounded ${data.about.hero.title ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {data.about.hero.title ? 'Active' : 'Action Needed'}
             </span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;
