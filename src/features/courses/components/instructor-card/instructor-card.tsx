import Avatar from 'boring-avatars';
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
      <div className="instructor-card">
        <div className="instructor-card--title">Your Instructor</div>
        <div className="instructor-card--avatar">
          {avatar ? (
            <img className="card--avatar" src={avatar} alt={`${name}`} />
          ) : (
            <Avatar
              size={42}
              name={name}
              colors={['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']}
            />
          )}
        </div>
        <div className="instructor-card--name">{name}</div>
        <div className="instructor-card--subtitle">{subTitle}</div>
        <div className="instructor-card--description">{description}</div>

        {id}
        {avatar}
      </div>
    </div>
  );
};
