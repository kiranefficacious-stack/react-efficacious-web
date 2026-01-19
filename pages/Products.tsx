import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import ProductsComponent from '../components/Products';
import KeyBenefits from '../components/KeyBenefits';
import Contact from '../components/Contact';

const Products: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Our Solutions" 
        subtitle="Innovative ERP products designed for security, efficiency, and growth."
        bgGradient="from-brand-600 to-teal-600"
      />
      <ProductsComponent />
      <KeyBenefits />
      <Contact />
    </div>
  );
};

export default Products;