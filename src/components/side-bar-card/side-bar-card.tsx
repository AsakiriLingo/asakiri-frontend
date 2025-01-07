import { Book, ChevronDown, ChevronUp, FileText, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import './side-bar-card.scss';
import { Button } from '@/components/button';

type Section = {
  id: string;
  title: string;
  subTitle: string;
};

interface SideBarCardProps {
  title: string;
  subTitle: string;
  sections: Array<Section>;
}

export const SideBarCard: React.FC<SideBarCardProps> = ({
  title,
  subTitle,
  sections,
}: SideBarCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="sidebar-container">
      <div
        className="chapter"
        onClick={toggleExpand}
        role="button"
        tabIndex={0}
      >
        <Book className="section-icon" />
        <div className="chapter-content">
          <div className="chapter-title">{title}</div>
          <div className="chapter-subtitle">{subTitle}</div>
        </div>
        <Button size="small" variant="ghost" type="tertiary">
          <Trash2 size={16} />
        </Button>
        {isExpanded ? (
          <ChevronUp className="chapter-icon" />
        ) : (
          <ChevronDown className="chapter-icon" />
        )}
      </div>
      <div className={`sections ${isExpanded ? 'expanded' : ''}`}>
        {sections.map((section) => (
          <div className="section" key={section.id} role="button" tabIndex={0}>
            <FileText className="section-icon" />
            <div className="section-content">
              <div className="section-title">{section.title}</div>
              <div className="section-subtitle">{section.subTitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
