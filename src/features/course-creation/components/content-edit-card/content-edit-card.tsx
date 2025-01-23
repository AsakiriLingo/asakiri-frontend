import { Pencil, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Editor } from 'src/components/editor';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';

import './content-edit-card.scss';

interface ContentCardProps {
  title: string;
  subtitle: string;
  variant: 'chapter' | 'section';
  content: string;
  isEditable: boolean;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContentEditCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  variant = 'chapter',
  content,
  isEditable,
  onTitleChange,
  onSubtitleChange,
}: ContentCardProps) => {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardSubtitle, setCardSubtitle] = useState(subtitle);
  const [cardContent, setCardContent] = useState(content);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const onSave = () => {
    setIsEditEnabled(false);
  };

  const onCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
    if (onTitleChange) {
      onTitleChange(e);
    }
  };

  const onCardSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardSubtitle(e.target.value);
    if (onSubtitleChange) {
      onSubtitleChange(e);
    }
  };

  const onCardContentChange = (html: string) => {
    setCardContent(html);
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
                <TextField text={cardTitle} onChange={onCardTitleChange} />
              </div>
              <div
                className={
                  variant === 'chapter'
                    ? 'chapter--subtitle'
                    : 'section--subtitle'
                }
              >
                <TextField
                  text={cardSubtitle}
                  onChange={onCardSubtitleChange}
                />
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
              <Editor content={cardContent} onChange={onCardContentChange} />
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
                {cardTitle}
              </div>
              <div
                className={
                  variant === 'chapter'
                    ? 'chapter--subtitle'
                    : 'section--subtitle'
                }
              >
                {cardSubtitle}
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
          {variant === 'section' && (
            <Editor content={cardContent} editable={false} />
          )}
        </>
      )}
    </div>
  );
};
