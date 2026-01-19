import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import ServicesComponent from '../components/Services';
import Contact from '../components/Contact';

const Services: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive digital solutions tailored to your business needs."
        bgGradient="from-blue-600 to-indigo-700"
      />
      <ServicesComponent />
      <Contact />
    </div>
  );
};

export default Services;