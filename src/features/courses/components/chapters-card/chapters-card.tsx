import { FileText } from 'lucide-react';
import React from 'react';

import './chapters-card.scss';
import { Chapter } from '@/types/chapter.types.ts';

interface ChaptersCardProps {
  chapters: Array<Chapter>;
}

export const ChaptersCard: React.FC<ChaptersCardProps> = ({ chapters }) => {
  return (
    <div className="chapters-container">
      <h2 className="heading">Chapters in this Course</h2>
      {chapters.map((chapter) => (
        <div key={chapter.id} className="chapter-item">
          <div className="icon-wrapper">
            <FileText size={20} color="var(--on-surface-variant)" />
          </div>
          <div className="content">
            <h3 className="title">{chapter.title}</h3>
            <p className="subtitle">{chapter.sub_title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
