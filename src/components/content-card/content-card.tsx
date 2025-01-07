import { Save, Trash2 } from 'lucide-react';
import React from 'react';
import './content-card.scss';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';

interface ContentCardProps {
  title: string;
  subtitle: string;
  variant: 'chapter' | 'section';
  children?: React.ReactNode;
  onTitleChange?: (value: string) => void;
  onSubtitleChange?: (value: string) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  variant = 'chapter',
  children,
  onTitleChange,
  onSubtitleChange,
}: ContentCardProps) => {
  return (
    <div className="content-card">
      <header className="content-card--header">
        <div className="content-card__content">
          <div
            className={
              variant === 'chapter' ? 'chapter--title' : 'section--title'
            }
          >
            <TextField text={title} onChange={onTitleChange} />
          </div>
          <div
            className={
              variant === 'chapter' ? 'chapter--subtitle' : 'section--subtitle'
            }
          >
            <TextField text={subtitle} onChange={onSubtitleChange} />
          </div>
        </div>
        <div className="content-card__actions">
          <Button size="small" variant="ghost" type="tertiary">
            <Trash2 size={24} />
          </Button>
          <Button size="small" type="primary" variant="ghost">
            <Save size={24} />
          </Button>
        </div>
      </header>

      <div>{children}</div>
    </div>
  );
};
