import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </Layout>
  );
};

export default Home;