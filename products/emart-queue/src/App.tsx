import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppPreview } from './components/AppPreview';
import { Workflow } from './components/Workflow';
import { Services } from './components/Services';
import { Features } from './components/Features';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { PrivacyPolicyContent } from './components/PrivacyPolicyContent';
import { TermsContent } from './components/TermsContent';

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <AppPreview />
        <Workflow />
        <Services />
        <Features />
        <WhyUs />
        <Testimonials />
        <About />
        <Contact />
        <Footer
          onPrivacyClick={() => setPrivacyOpen(true)}
          onTermsClick={() => setTermsOpen(true)}
        />
      </main>

      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms & Conditions"
      >
        <TermsContent />
      </Modal>
    </>
  );
}
