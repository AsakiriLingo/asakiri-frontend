import Avatar from 'boring-avatars';
import React, { JSX } from 'react';

import { Teacher } from '@/types/teacher.types.ts';
import './instructor-card.scss';

type InstructorCardProps = Teacher;

export const InstructorCard: React.FC<InstructorCardProps> = ({
  id,
  name,
  subtitle,
  avatar_url,
  bio,
}: InstructorCardProps): JSX.Element => {
  return (
    <div key={`instructor${id}`}>
      <div className="instructor-card">
        <div className="instructor-card--title">Your Instructor</div>
        <div className="instructor-card--header">
          <div className="instructor-card--avatar">
            {avatar_url ? (
              <Avatar
                username={name || ''}
                imageUrl={avatar_url || undefined}
                size={42}
              />
            ) : (
              <Avatar size={42} name={name} />
            )}
          </div>
          <div className="instructor-card--details">
            <div className="instructor-card--name">{name}</div>
            <div className="instructor-card--subtitle">{subtitle}</div>
          </div>
        </div>
        <div className="instructor-card--description">{bio}</div>
      </div>
    </div>
  );
};
