import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Save, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from 'src/components/editor';
import { z } from 'zod';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { editCourseFormSchema } from '@/features/course-creation/config/form.ts';
import { CreateSectionData } from '@/features/course-creation/types';
import { Chapter } from '@/types/chapter.types.ts';
import { Section } from '@/types/section.types.ts';
import './content-edit-card.scss';

type FormData = z.infer<typeof editCourseFormSchema>;

interface ExtendedForm extends FormData {
  id?: string;
}

interface ContentCardProps {
  title: string;
  sub_title: string;
  variant: 'chapter' | 'section';
  content_html: string;
  content_json?: object;
  isEditable: boolean;
  editEnabled?: boolean;
  data: Chapter | Section;
  onEditClicked?: () => void;
  onSave?: (form: ExtendedForm) => Promise<void>;
  onDelete?: () => Promise<void>;
  updateSectionLocally?: (
    sectionId: string,
    updates: Partial<CreateSectionData>
  ) => void;
}

export const ContentEditCard: React.FC<ContentCardProps> = ({
  title,
  sub_title,
  variant = 'chapter',
  content_html,
  content_json,
  isEditable,
  data,
  editEnabled = false,
  onEditClicked,
  onSave,
  onDelete,
  updateSectionLocally,
}: ContentCardProps) => {
  const [isEditEnabled, setIsEditEnabled] = useState(editEnabled);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editCourseFormSchema),
    defaultValues: {
      title,
      sub_title,
      content_html,
      content_json,
      serial_number: data.serial_number || 0,
    },
  });

  const handleSave = async (formData: FormData) => {
    if (onSave) {
      await onSave({
        ...formData,
        id: data.id,
        serial_number: data.serial_number || 0,
      });
    }
  };
  useEffect(() => {
    setIsEditEnabled(editEnabled);
  }, [editEnabled]);
  return (
    <form onSubmit={handleSubmit(handleSave)} className="content-card">
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
                      onChange={(e) => {
                        field.onChange(e);
                        if (variant === 'section' && updateSectionLocally) {
                          updateSectionLocally(data.id || 'new', {
                            title: e.target.value,
                          });
                        }
                      }}
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
                  name={'sub_title'}
                  control={control}
                  rules={{ required: true, maxLength: 150 }}
                  render={({ field }) => (
                    <TextField
                      text={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (variant === 'section' && updateSectionLocally) {
                          updateSectionLocally(data.id || 'new', {
                            sub_title: e.target.value,
                          });
                        }
                      }}
                    />
                  )}
                />
                {errors.sub_title && (
                  <span className="error">{errors.sub_title.message}</span>
                )}
              </div>
            </div>
            <div className="content-card__actions">
              <Button
                size="small"
                variant="ghost"
                type="tertiary"
                onPress={() => (onDelete ? onDelete() : {})}
              >
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
                name={'content_html'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Editor
                    content_html={field.value}
                    content_json={{}}
                    onEditorChange={(e) => {
                      field.onChange(e.html);
                      setValue('content_json', e.json, {
                        shouldValidate: true,
                      });
                      if (updateSectionLocally) {
                        updateSectionLocally(data.id || 'new', {
                          content_html: e.html,
                          content_json: e.json,
                        });
                      }
                    }}
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
                {sub_title}
              </div>
            </div>
            <div className="content-card__actions">
              {isEditable && (
                <Button
                  onPress={() => {
                    setIsEditEnabled((state) => !state);
                    if (onEditClicked) {
                      onEditClicked();
                    }
                  }}
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
            <Editor
              content_html={content_html}
              content_json={{}}
              editable={false}
              onEditorChange={() => {}}
            />
          )}
        </>
      )}
    </form>
  );
};
