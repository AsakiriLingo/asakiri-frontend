import { Book } from 'lucide-react';
import React from 'react';

import './side-bar-card.scss';

interface SideBarCardProps {
  title: string;
  subTitle: string;
  selected: boolean | undefined;
  onClick: () => void;
}

export const SideBarCard: React.FC<SideBarCardProps> = ({
  title,
  subTitle,
  selected,
  onClick,
}: SideBarCardProps) => {
  return (
    <div className="sidebar-container" onClick={onClick}>
      <div
        className={`chapter ${selected ? 'selected-chapter' : ''}`}
        role="button"
        tabIndex={0}
      >
        <Book className="section-icon" />
        <div className="chapter-content">
          <div className="chapter-title">{title}</div>
          <div className="chapter-subtitle">{subTitle}</div>
        </div>
      </div>
    </div>
  );
};
