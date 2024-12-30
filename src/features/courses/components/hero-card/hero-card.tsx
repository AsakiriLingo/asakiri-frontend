import React, { JSX } from 'react';

import './hero-card.scss';

interface HeroCardProps {
  courseID: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  courseID,
  title,
  shortDescription,
  thumbnail,
}: HeroCardProps): JSX.Element => {
  return (
    <div>
      {courseID}
      {title}
      {shortDescription}
      {thumbnail}
    </div>
  );
};
