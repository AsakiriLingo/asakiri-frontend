import React from 'react';
import { Link } from 'react-aria-components';

import { CourseCard } from '@/types/course.types.ts';

import './card.scss';

interface CardProps<T extends object> extends CourseCard {
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export const Card = <T extends object>({
  title,
  link,
  description,
  author,
  courseLanguage,
  languageTaught,
  children,
}: CardProps<T>) => {
  const card = <div></div>;

  console.log(
    title,
    description,
    author,
    courseLanguage,
    languageTaught,
    children
  );

  return link ? <Link href={link}>{card}</Link> : card;
};
