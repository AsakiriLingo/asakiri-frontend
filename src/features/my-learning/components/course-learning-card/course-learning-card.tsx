import React from 'react';

import './course-learning-card.scss';

interface CourseLearningCardProps {
  children?: React.ReactNode;
}

export const CourseLearningCard: React.FC<CourseLearningCardProps> = ({
  children,
}: CourseLearningCardProps) => {
  return <div>{children}</div>;
};
