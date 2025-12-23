import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ContactSection from '../components/sections/ContactSection';
import AboutSection from '../components/sections/AboutSection';
import FAQSection from '../components/sections/FAQSection';


const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
        <BenefitsSection />
      <HowItWorksSection />
      <FAQSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
};

export default Home;