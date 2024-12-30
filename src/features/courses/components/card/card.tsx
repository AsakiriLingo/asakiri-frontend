import Avatar from 'boring-avatars';
import React from 'react';
import { Link } from 'react-aria-components';

import { CourseCard } from '@/types/course.types.ts';

import './card.scss';

interface CardProps<T extends object> extends CourseCard {
  children?: React.ReactNode | ((item: T) => React.ReactNode);
}

export const Card = <T extends object>({
  title,
  link,
  description,
  author,
  courseLanguage,
  languageTaught,
}: CardProps<T>) => {
  const card = (
    <div className="card">
      <div className="card--header">
        {author.avatar ? (
          <img
            className="card--avatar"
            src={author.avatar}
            alt={`${author.name}`}
          />
        ) : (
          <Avatar
            size={48}
            name={author.name}
            colors={['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']}
          />
        )}
        <div className="card--teacher-details">
          <h2 className="card--teacher-name">{author.name}</h2>
          <p className="card--teacher-subtitle">{author.subTitle}</p>
        </div>
      </div>
      <div className="card--content">
        <h2 className="card--content--course-title">{title}</h2>
        <div className="card--content--language">
          <p className="card--content--from-language">{languageTaught}</p>
          <p className="card--content--from-text">From</p>
          <p className="card--content--language-taught">{courseLanguage}</p>
        </div>
        <div className="card--content--course-description">{description}</div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
};
