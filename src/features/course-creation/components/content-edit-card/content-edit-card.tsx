import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Editor } from '@/components/editor';
import { TextField } from '@/components/text-field';
import { ContentEditCardProps } from '@/types/course-editor.types';

const editCourseFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subTitle: z.string().min(1, 'Subtitle is required'),
  content: z.string().optional(),
});

type FormData = z.infer<typeof editCourseFormSchema>;

export const ContentEditCard: React.FC<ContentEditCardProps> = ({
  title,
  subTitle,
  variant,
  content,
  isEditable,
  onSave,
  onDelete,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editCourseFormSchema),
    defaultValues: {
      title,
      subTitle,
      content,
    },
  });

  const handleSaveClick = async (data: FormData) => {
    if (onSave) {
      await onSave(data);
      setIsEditMode(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSaveClick)} className="content-card">
      {isEditMode ? (
        <>
          <div className="content-card--header">
            <div className="content-card__content">
              <div
                className={
                  variant === 'chapter' ? 'chapter--title' : 'section--title'
                }
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      text={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                {errors.title && (
                  <span className="error">{errors.title.message}</span>
                )}
              </div>
              <div
                className={
                  variant === 'chapter'
                    ? 'chapter--subtitle'
                    : 'section--subtitle'
                }
              >
                <Controller
                  name="subTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      text={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                {errors.subTitle && (
                  <span className="error">{errors.subTitle.message}</span>
                )}
              </div>
            </div>
            <div className="content-card__actions">
              {onDelete && (
                <Button
                  size="small"
                  variant="ghost"
                  type="tertiary"
                  onPress={onDelete}
                >
                  <Trash2 size={24} />
                </Button>
              )}
              <Button
                size="small"
                type="primary"
                variant="ghost"
                actionType="submit"
              >
                <Save size={24} />
              </Button>
            </div>
          </div>
          {variant === 'section' && (
            <div>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Editor
                    content={field.value || ''}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
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
                {subTitle}
              </div>
            </div>
            <div className="content-card__actions">
              {isEditable && (
                <Button
                  onPress={() => setIsEditMode(true)}
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
            <Editor content={content} editable={false} />
          )}
        </>
      )}
    </form>
  );
};
