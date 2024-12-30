import React, { JSX } from 'react';

import { Teacher } from '@/types/teacher.types.ts';
import './instructor-card.scss';

type InstructorCardProps = Teacher;

export const InstructorCard: React.FC<InstructorCardProps> = ({
  id,
  name,
  subTitle,
  avatar,
  description,
}: InstructorCardProps): JSX.Element => {
  return (
    <div>
      {id}
      {name}
      {subTitle}
      {avatar}
      {description}
    </div>
  );
};
