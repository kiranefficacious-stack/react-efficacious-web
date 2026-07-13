/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Benefits } from './components/Benefits';
import { DashboardPreview } from './components/DashboardPreview';
import { Roles } from './components/Roles';
import { Features } from './components/Features';
import { MobileAppSteps } from './components/MobileAppSteps';
import { Comparison } from './components/Comparison';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';

import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Benefits />
        <Comparison />
        <DashboardPreview />
        <MobileAppSteps />
        <Roles />
        <Features />
        <Testimonials />

        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
