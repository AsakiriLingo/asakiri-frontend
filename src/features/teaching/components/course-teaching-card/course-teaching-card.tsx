import React from 'react';

import './course-teaching-card.scss';

interface CourseTeachingCardProps {
  children?: React.ReactNode;
}

export const CourseTeachingCard: React.FC<CourseTeachingCardProps> = ({
  children,
}: CourseTeachingCardProps) => {
  return <div>{children}</div>;
};
