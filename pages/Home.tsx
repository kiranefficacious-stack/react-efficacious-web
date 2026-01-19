
import React from 'react';
import { motion } from 'framer-motion';
import SoftwareHero from '../components/SoftwareHero';
import TechExcellence from '../components/TechExcellence';
import Hero from '../components/Hero'; // Product Slider (Original Hero)
import KeyBenefits from '../components/KeyBenefits';
import About from '../components/About';
import Features from '../components/Features';
import Services from '../components/Services';
import Products from '../components/Products';
import Partners from '../components/Partners';
import NewsEvents from '../components/NewsEvents';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Main Agenda: Leading Software Developer */}
      <div id="home">
        <SoftwareHero />
      </div>

      {/* 2. Technical Expertise / Capabilities */}
      <TechExcellence />

      {/* 3. Product Showcase (Original Hero moved here) */}
      <div className="bg-slate-50 dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 -mb-20 text-center">
           <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              Our Flagship <span className="text-brand-600 dark:text-brand-400">Products</span>
           </h2>
           <p className="text-slate-600 dark:text-slate-400 mt-4">
              Besides custom development, we offer a suite of powerful ERP solutions.
           </p>
        </div>
        <Hero />
      </div>

      {/* 4. Rest of the content */}
      <KeyBenefits />
      <About />
      <Features />
      <Services />
      <Products />
      <Partners />
      <NewsEvents />
      <Contact />
    </div>
  );
};

export default Home;
