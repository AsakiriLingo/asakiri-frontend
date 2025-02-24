import React from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { Seo } from '@/components/seo';
import './about.scss';
import { AboutHero } from '@/features/about/components/about-hero';
import { AboutValues } from '@/features/about/components/about-values';

const AboutRoute: React.FC = () => {
  return (
    <>
      <Seo description={'About Asakiri'}></Seo>
      <NavBar />
      <div className="about-main">
        <div className="about-container">
          <AboutHero />
          <AboutValues />
        </div>
      </div>
      <Footer />
      <BottomNavBar />
    </>
  );
};

export default AboutRoute;
