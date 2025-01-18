import React from 'react';
import { Link } from 'react-aria-components';

import { Avatar } from '@/components/avatar';
import { Image } from '@/components/image';
import { Course } from '@/types/course.types.ts';
import './card.scss';

interface CardProps
  extends Omit<Course, 'id' | 'description' | 'chapters' | 'isPublished'> {
  link: string;
  isPublished?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  link,
  shortDescription,
  author,
  courseLanguage,
  languageTaught,
  thumbnail,
  isPublished = false,
}: CardProps) => {
  const randomNum: number = +(Math.random() + 4).toFixed(2);
  const card = (
    <div className="card">
      <Image src={thumbnail} alt={title} className="card--thumbnail"></Image>
      <div className="card--header">
        {author.avatar ? (
          <img
            className="card--avatar"
            src={author.avatar}
            alt={`${author.name}`}
          />
        ) : (
          <Avatar size={42} username={author.name} />
        )}
        <div className="card--teacher-details">
          <h2 className="card--teacher-name">{author.name}</h2>
          <p className="card--teacher-subtitle">{author.subTitle}</p>
        </div>
      </div>
      <div className="card--content">
        <h2 className="card--content--course-title">{title}</h2>
        <div className="card--content--course-description">
          {shortDescription}
        </div>
        <div className="card--content--language">
          <p className="card--content--language-taught">{languageTaught} - </p>
          <p className="card--content--from-text">Language Taught</p>
        </div>
        <div className="card--content--language">
          <p className="card--content--from-language">{courseLanguage} - </p>
          <p className="card--content--from-text">Course Language</p>
        </div>
      </div>
      <div className="card--footer">
        <div className="card--footer--left">
          <div className="card--course-rating">
            <Image
              src="/icons/star.svg"
              alt="star-icon"
              width="20px"
              height="20px"
            ></Image>
            <div className="card--course-rating-number">{randomNum}</div>
          </div>
          <div className="card--course-cost">
            <Image
              src="/icons/credit-card.svg"
              alt="star-icon"
              width="20px"
              height="20px"
            ></Image>
            <div className="card--course-cost--number">Free</div>
            <div className="card--course-cost--number">{isPublished}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
};
