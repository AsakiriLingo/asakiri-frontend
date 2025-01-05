import React from 'react';

import './content-card.scss';

interface ContentCardProps {
  title: string;
  subtitle: string;
  variant: 'chapter' | 'section';
  children?: React.ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  variant = 'chapter',
  children,
}: ContentCardProps) => {
  return (
    <div>
      <div>
        <div
          className={variant === 'chapter' ? 'chapter-title' : 'section-title'}
        >
          {title}
        </div>
        <div
          className={
            variant === 'chapter' ? 'chapter-subtitle' : 'section-subitle'
          }
        >
          {subtitle}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
