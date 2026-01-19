import React from 'react';
import { motion as m } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useContent } from '../hooks/useContent';

const motion = m as any;

const OfficeGallery: React.FC = () => {
  const { data } = useContent();
  const galleryImages = data.gallery;

  const getLayoutSize = (index: number) => {
    const sizes = [
      "md:col-span-2 md:row-span-2",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1"
    ];
    return sizes[index % sizes.length];
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default OfficeGallery;
