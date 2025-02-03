import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Save, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from 'src/components/editor';
import { z } from 'zod';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { editCourseFormSchema } from '@/features/course-creation/config/form.ts';

import './content-edit-card.scss';

type FormData = z.infer<typeof editCourseFormSchema>;

interface ContentCardProps {
  title: string;
  subtitle: string;
  variant: 'chapter' | 'section';
  content: string;
  isEditable: boolean;
}

export const ContentEditCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  variant = 'chapter',
  content,
  isEditable,
}: ContentCardProps) => {
  // const [cardTitle, setCardTitle] = useState(title);
  // const [cardSubtitle, setCardSubtitle] = useState(subtitle);
  // const [cardContent, setCardContent] = useState(content);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editCourseFormSchema),
    defaultValues: {
      title,
      subtitle,
      content,
    },
  });

  // const onCardContentChange = (html: string) => {
  //   setCardContent(html);
  // };

  const onSave = async (data: FormData) => {
    setIsEditEnabled(false);
    console.log(data.subtitle);
    // if (false) {
    //   setCardTitle('test');
    //   setCardSubtitle('test');
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="content-card">
      {isEditEnabled ? (
        <>
          <div className="content-card--header">
            <div className="content-card__content">
              <div
                className={
                  variant === 'chapter' ? 'chapter--title' : 'section--title'
                }
              >
                <Controller
                  name={'title'}
                  control={control}
                  rules={{ required: true, maxLength: 150 }}
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
                  name={'subtitle'}
                  control={control}
                  rules={{ required: true, maxLength: 150 }}
                  render={({ field }) => (
                    <TextField
                      text={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
                {errors.subtitle && (
                  <span className="error">{errors.subtitle.message}</span>
                )}
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
                actionType="submit"
              >
                <Save size={24} />
              </Button>
            </div>
          </div>
          {variant === 'section' && (
            <div>
              <Controller
                name={'content'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Editor
                    content={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
              {/*<Editor content={cardContent} onChange={onCardContentChange} />*/}
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
          {variant === 'section' && (
            <Editor content={content} editable={false} />
          )}
        </>
      )}
    </form>
  );
};
