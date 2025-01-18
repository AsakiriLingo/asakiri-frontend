import React, { JSX } from 'react';

import './hero-card.scss';
import { Button } from '@/components/button';
import { Image } from '@/components/image';

interface HeroCardProps {
  courseID: string;
  title: string;
  description: string;
  thumbnail: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  courseID,
  title,
  description,
  thumbnail,
}: HeroCardProps): JSX.Element => {
  const randomNum: number = +(Math.random() + 4).toFixed(2);
  return (
    <div>
      <header className="hero-card">
        <img
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          className="hero-card--thumbnail"
        />
        <div className="hero-card--content">
          <h1 className="hero-card--content--title">{title}</h1>
          <div className="hero-card--meta">
            <div className="hero-card--course-rating">
              <Image
                src="/star.svg"
                width="20px"
                height="20px"
                alt="star icon"
              ></Image>
              <div className="hero-card--course-rating-number">{randomNum}</div>
            </div>
            <div className="hero-card--course-cost">
              <Image
                src="/credit-card.svg"
                width="20px"
                height="20px"
                alt="credit card icon"
              ></Image>
              <div className="hero-card--course-cost--number">Free</div>
            </div>
          </div>
          <p className="hero-card--content--description">{description}</p>
          <div>
            <Button size="small"> Join Course </Button>
          </div>
        </div>
      </header>
      {courseID}
    </div>
  );
};
