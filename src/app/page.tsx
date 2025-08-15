'use client';
import { useState } from 'react';
import Head from 'next/head';
import SplashScreen from './splash/SplashScreen';
import HeroSection from '@/components/HeroSection/HeroSection';
import OurServicesSection from '@/components/OurServices/OurServicesSection';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const businessName = "The Aethon Group";
  const pageTitle = `${businessName} | Brand Building, AI, and Digital Strategy Experts`;
  const pageDescription =
    "The Aethon Group helps businesses grow with brand building, AI-powered solutions, digital marketing, and complete strategy. Serving clients globally with innovation and expertise.";
  const pageUrl = "https://www.theaethongroup.com";
  const pageImage = "https://www.theaethongroup.com/og-image.jpg"; // Replace with real OG image

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="brand building, AI, digital marketing, business strategy, web development, SEO, The Aethon Group" />
        <meta name="author" content={businessName} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href={pageUrl} />

        {/* Local Business JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: businessName,
              image: pageImage,
              "@id": pageUrl,
              url: pageUrl,
              telephone: "+91-7439315210",
              address: {
                "@type": "PostalAddress",
                streetAddress: "11/H/16, Moulana Md Ali Road,Khidirpur,Kolkata - 700023.",
                addressLocality: "Kolkata",
                addressRegion: "WB",
                postalCode: "700023",
                addressCountry: "IN"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "19.0760",
                longitude: "72.8777"
              },
              openingHours: "Mo-Sa 09:00-19:00",
              sameAs: [
                "https://www.facebook.com/theaethongroup",
                "https://www.instagram.com/theaethongroup",
                "https://www.linkedin.com/company/theaethongroup"
              ]
            }),
          }}
        />
      </Head>

      {!isLoaded && <SplashScreen onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <main className="min-h-screen bg-black text-[#f1c75b] items-center justify-center">
          <h1 className="sr-only">The Aethon Group</h1> {/* Hidden for SEO */}
          <HeroSection />
          <OurServicesSection />
          <AboutUs />
          <Footer />
        </main>
      )}
    </>
  );
}
