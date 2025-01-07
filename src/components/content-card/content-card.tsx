import { Pencil, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/button';
import { ContentView } from '@/components/content-view';
import { TextField } from '@/components/text-field';
import { Editor } from '@/features/course-creation/components/editor';

import './content-card.scss';

interface ContentCardProps {
  title: string;
  subtitle: string;
  variant: 'chapter' | 'section';
  content: string;
  isEditable: boolean;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  variant = 'chapter',
  content,
  isEditable,
  onTitleChange,
  onSubtitleChange,
}: ContentCardProps) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const onSave = () => {
    setIsEditEnabled(false);
  };

  return (
    <div className="content-card">
      {isEditEnabled ? (
        <>
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
                  variant === 'chapter'
                    ? 'chapter--subtitle'
                    : 'section--subtitle'
                }
              >
                <TextField text={subtitle} onChange={onSubtitleChange} />
              </div>
            </div>
            <div className="content-card__actions">
              <Button size="small" variant="ghost" type="tertiary">
                <Trash2 size={24} />
              </Button>
              <Button
                size="small"
                type="primary"
                variant="ghost"
                onPress={onSave}
              >
                <Save size={24} />
              </Button>
            </div>
          </header>
          {variant === 'section' && (
            <div>
              <Editor content={content} />
            </div>
          )}
        </>
      ) : (
        <>
          <header className="content-card--header">
            <div className="content-card__content">
              <div
                className={
                  variant === 'chapter' ? 'chapter--title' : 'section--title'
                }
              >
                {title}
              </div>
              <div
                className={
                  variant === 'chapter'
                    ? 'chapter--subtitle'
                    : 'section--subtitle'
                }
              >
                {subtitle}
              </div>
            </div>
            <div className="content-card__actions">
              {isEditable && (
                <Button
                  onPress={() => setIsEditEnabled((state) => !state)}
                  size="small"
                  type="primary"
                  variant="ghost"
                >
                  <Pencil size={24} />
                </Button>
              )}
            </div>
          </header>
          <ContentView content={content} />
        </>
      )}
    </div>
  );
};
