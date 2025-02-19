import React from 'react';
import { Link } from 'react-aria-components';

import { Avatar } from '@/components/avatar';
import { Image } from '@/components/image';
import './card.scss';
import { CourseCard } from '@/features/course-creation/types/course-card-type.ts';

interface CourseCardProps extends CourseCard {
  link?: string;
  showTotalEnrolled?: boolean;
}
export const Card: React.FC<CourseCardProps> = ({
  title,
  author_avatar_url,
  author_name,
  author_subtitle,
  id,
  short_description,
  course_language,
  language_taught,
  thumbnail,
  enrolled_students,
  link,
  showTotalEnrolled,
}: CourseCardProps) => {
  const card = (
    <div className="card">
      <Image src={thumbnail} alt={title} className="card--thumbnail"></Image>
      <div className="card--header">
        {author_avatar_url ? (
          <img
            className="card--avatar"
            src={author_avatar_url}
            alt={`${author_name}`}
          />
        ) : (
          <Avatar size={42} username={author_name} />
        )}
        <div className="card--teacher-details">
          <h2 className="card--teacher-name">{author_name}</h2>
          <p className="card--teacher-subtitle">{author_subtitle}</p>
        </div>
      </div>
      <div className="card--content">
        <h2 className="card--content--course-title">{title}</h2>
        <div className="card--content--course-description">
          {short_description}
        </div>
        <div className="card--content--language">
          <p className="card--content--from-text">Language Taught - </p>
          <p className="card--content--language-taught">{language_taught}</p>
        </div>
        <div className="card--content--language">
          <p className="card--content--from-text">Course Language - </p>
          <p className="card--content--from-language">{course_language}</p>
        </div>
      </div>
      {showTotalEnrolled && (
        <div className="card--footer">
          <div className="card--footer--left">
            <div className="card--course-cost">
              <Image
                src="/icons/users.svg"
                alt="star-icon"
                width="20px"
                height="20px"
              ></Image>
              <div className="card--course-cost--number">
                {enrolled_students}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return link ? (
    <Link href={link}>{card}</Link>
  ) : (
    <Link href={`/course/details/${id}`}>{card}</Link>
  );
};
