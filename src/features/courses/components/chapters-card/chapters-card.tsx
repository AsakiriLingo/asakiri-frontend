import React, { JSX } from 'react';

import './chapters-card.scss';
import { Chapter } from '@/types/chapter.types.ts';

interface ChaptersCardProps {
  chapters: Array<Omit<Chapter, 'id' | 'sections' | 'serialNumber'>>;
}

export const ChaptersCard: React.FC<ChaptersCardProps> = ({
  chapters,
}: ChaptersCardProps): JSX.Element => {
  return (
    <>
      {chapters.map((chapter, index) => (
        <div key={index}>
          {chapter.title}
          {chapter.subTitle}
        </div>
      ))}
    </>
  );
};
