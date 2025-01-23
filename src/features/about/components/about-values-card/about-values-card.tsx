import React from 'react';

import { Image } from '@/components/image';
import './about-values-card.scss';

interface AboutValuesCardProps {
  heading: string;
  subheading: string;
  iconSrc: string;
}

export const AboutValuesCard: React.FC<AboutValuesCardProps> = ({
  heading,
  subheading,
  iconSrc,
}: AboutValuesCardProps) => {
  return (
    <div className="value-card-main">
      <Image width="24px" height="24px" src={iconSrc} alt=""></Image>
      <h3 className="value-card-heading">{heading}</h3>
      <h4 className="value-card-subheading">{subheading}</h4>
    </div>
  );
};
