import React from 'react';

import './about-hero.scss';
import { Button } from '@/components/button';

export const AboutHero: React.FC = () => {
  return (
    <div className="about-hero-main">
      <h1 className="about-header">Our Vision</h1>
      <div className="subheader-container">
        <h3 className="about-subheader">
          Our Vision We're building the platform that revolutionizes language
          preservation and education in the digital age. Our mission is to
          empower language teachers worldwide to create and monetize courses for
          any language, no matter how rare or widely spoken
        </h3>
      </div>

      <Button isLink={true} href="https://ko-fi.com/asakiri" target="_blank">
        Join Our Mission
      </Button>
    </div>
  );
};
