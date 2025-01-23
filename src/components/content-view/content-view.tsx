import React from 'react';

import { Editor } from '@/features/course-creation/components/editor';

import './content-view.scss';

interface ContentViewProps {
  title?: string;
  subtitle?: string;
  variant: 'chapter' | 'section';
  content: string;
}

export const ContentViewCard: React.FC<ContentViewProps> = ({
  title,
  subtitle,
  variant = 'chapter',
  content,
}: ContentViewProps) => {
  return (
    <div className="view-card">
      <header className="view-card--header">
        <div className="view-card__content">
          <div
            className={
              variant === 'chapter' ? 'chapter--title' : 'section--title'
            }
          >
            {title}
          </div>
          <div
            className={
              variant === 'chapter' ? 'chapter--subtitle' : 'section--subtitle'
            }
          >
            {subtitle}
          </div>
        </div>
      </header>
      {variant === 'section' && <Editor content={content} editable={false} />}
    </div>
  );
};
