import React from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import './about.scss';
import { AboutHero } from '@/features/about/components/about-hero';
import { AboutValues } from '@/features/about/components/about-values';

const AboutRoute: React.FC = () => {
  return (
    <>
      <Head description={'About Asakiri'}></Head>
      <NavBar />
      <div className="about-main">
        <div className="about-container">
          <AboutHero />
          <AboutValues />
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default AboutRoute;
