import { Trash2 } from 'lucide-react';
import React from 'react';

import './side-bar-card.scss';
import { Button } from '@/components/button';

interface SideBarCardProps {
  title: string;
  subTitle: string;
  isDeletable?: boolean;
}

export const SideBarCard: React.FC<SideBarCardProps> = ({
  title,
  subTitle,
  isDeletable = false,
}: SideBarCardProps) => {
  return (
    <div className="sidebar-container">
      <div className="chapter" role="button" tabIndex={0}>
        {isDeletable && (
          <Button size="small" variant="ghost" type="tertiary">
            <Trash2 size={16} />
          </Button>
        )}
        <div className="chapter-content">
          <div className="chapter-title">{title}</div>
          <div className="chapter-subtitle">{subTitle}</div>
        </div>
      </div>
    </div>
  );
};
