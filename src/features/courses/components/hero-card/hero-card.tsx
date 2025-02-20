import React, { JSX } from 'react';

import './hero-card.scss';
import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { Course } from '@/types/course.types';

interface HeroCardProps {
  courseID: string;
  course: Course;
  isEnrolled: boolean;
  enrollInCourse: () => void;
  goToCourse: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  courseID,
  course,
  isEnrolled,
  enrollInCourse,
  goToCourse,
}: HeroCardProps): JSX.Element => {
  return (
    <div key={`course-detail-${courseID}`}>
      <header className="hero-card">
        <img
          src={course.thumbnail}
          alt={`Thumbnail for ${course.title}`}
          className="hero-card--thumbnail"
        />
        <div className="hero-card--content">
          <h1 className="hero-card--content--title">{course.title}</h1>
          <div className="hero-card--meta">
            <div className="hero-card--course-cost">
              <Image
                src="/icons/users.svg"
                alt="star-icon"
                width="20px"
                height="20px"
              ></Image>
              <div className="card--course-cost--number">
                {course.enrolled_students}
              </div>
            </div>
          </div>
          <div className="hero-card--content--description">
            {course.short_description}
          </div>
          {!isEnrolled && (
            <div>
              <Button size="small" onPress={enrollInCourse}>
                Join Course
              </Button>
            </div>
          )}
          {isEnrolled && (
            <div>
              <Button size="small" onPress={goToCourse}>
                Go To Course
              </Button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
