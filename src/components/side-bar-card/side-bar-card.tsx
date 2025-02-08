import { Book, ChevronDown, ChevronUp, FileText, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import './side-bar-card.scss';
import { Button } from '@/components/button';

interface SideBarCardProps {
  title: string;
  subTitle: string;
  sections: Array<{
    id: string;
    title: string;
    subTitle: string;
  }>;
  isDeletable?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}

export const SideBarCard: React.FC<SideBarCardProps> = ({
  title,
  subTitle,
  sections,
  isDeletable = false,
  onSelect,
  onDelete,
}: SideBarCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onSelect?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onDelete?.();
  };

  return (
    <div className="sidebar-container">
      <div className="chapter" onClick={handleClick} role="button" tabIndex={0}>
        <Book className="section-icon" />
        <div className="chapter-content">
          <div className="chapter-title">{title}</div>
          <div className="chapter-subtitle">{subTitle}</div>
        </div>
        {isDeletable && (
          <Button
            size="small"
            variant="ghost"
            type="tertiary"
            onPress={handleDelete}
          >
            <Trash2 size={16} />
          </Button>
        )}
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
