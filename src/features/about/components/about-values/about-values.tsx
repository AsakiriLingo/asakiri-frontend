import React from 'react';

import './about-values.scss';
import { AboutValuesCard } from '@/features/about/components/about-values-card';

export const AboutValues: React.FC = () => {
  return (
    <div className="about-value-main">
      <h2 className="about-values-header">Our Values</h2>
      <h3 className="about-values-subheader">
        Guided by our commitment to language preservation and cultural
        connection
      </h3>
      <div className="cards-container">
        <AboutValuesCard
          heading="Language Preservation"
          subheading="We believe every language deserves to be preserved and taught in the digital age, from major languages to endangered indigenous ones."
          iconSrc="/icons/flag.svg"
        />
        <AboutValuesCard
          heading="Empowering Teachers"
          subheading="By providing powerful yet simple tools, we enable language teachers worldwide to create engaging courses and build sustainable teaching businesses."
          iconSrc="/icons/book.svg"
        />
        <AboutValuesCard
          heading="Cultural Connection"
          subheading="Languages are bridges to cultures, communities, and heritage. We're committed to keeping these connections alive for future generations."
          iconSrc="/icons/users.svg"
        />
      </div>
    </div>
  );
};
