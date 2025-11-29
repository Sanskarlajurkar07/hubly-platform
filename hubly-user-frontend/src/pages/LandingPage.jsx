import React from 'react';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import TrustedBy from '../components/Landing/TrustedBy';
import Features from '../components/Landing/Features';
import Pricing from '../components/Landing/Pricing';
import Footer from '../components/Landing/Footer';
import ChatWidget from '../components/ChatWidget';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Header />
      <Hero />
      <TrustedBy />
      <Features />
      <Pricing />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default LandingPage;