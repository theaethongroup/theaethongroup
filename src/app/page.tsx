'use client';
import { useState } from 'react';
import SplashScreen from './splash/SplashScreen';
import HeroSection from '@/components/HeroSection/HeroSection';
import { main } from 'framer-motion/client';
import { ParticleTextEffect } from '@/components/particles-text-effect';
import ServicesSection from '@/components/OurServices/OurServicesSection';
import OurServicesSection from '@/components/OurServices/OurServicesSection';
import AboutUs from '@/components/AboutUs';
import Footer from  '@/components/Footer'


export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <SplashScreen onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <main className="min-h-screen bg-black text-[#f1c75b]  items-center justify-center">
          <HeroSection />
          <OurServicesSection />
          <AboutUs />
          <Footer/>
        </main>
      )}
    </>
  );
}
