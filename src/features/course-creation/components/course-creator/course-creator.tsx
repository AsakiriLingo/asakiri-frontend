import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog-trigger';
import { Modal } from '@/components/modal';
import { TextArea } from '@/components/text-area';
import { TextField } from '@/components/text-field';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { LanguageList } from '@/features/course-creation/components/language-list';
import { createCourseFormSchema } from '@/features/course-creation/config/form.ts';

import './course-creator.scss';

type FormData = z.infer<typeof createCourseFormSchema>;

export const CourseCreator: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createCourseFormSchema),
  });

  const { createCourse } = useCourseCreationAPI();

  const onSubmit = async (data: FormData) => {
    await createCourse({
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      courseLanguage: 'english',
      languageTaught: 'german',
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="creator-container">
        <Controller
          name={'title'}
          control={control}
          rules={{ required: true, maxLength: 4 }}
          render={({ field }) => (
            <TextField
              label="Course Name"
              text={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.title && <span className="error">Title is Required</span>}
        <Controller
          name="shortDescription"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              text={field.value}
              label="Course Short Description"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.shortDescription && (
          <span className="error">Short description is Required</span>
        )}
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextArea
              text={field.value}
              label="Course Description"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.description && (
          <span className="error">Description is Required</span>
        )}
        <div className="creator-section-container">
          <div className="label-bold">Language Taught</div>
          <div>
            <DialogTrigger>
              <Button size="small" variant="flat">
                Select Language Taught
              </Button>
              <Modal>
                <LanguageList heading="Language Taught" />
              </Modal>
            </DialogTrigger>
          </div>
        </div>
        <div className="section-container">
          <div className="label-bold">Course Language</div>
          <div>
            <DialogTrigger>
              <Button size="small" variant="flat">
                Select Course Language
              </Button>
              <Modal>
                <LanguageList heading="Course Language" />
              </Modal>
            </DialogTrigger>
          </div>
        </div>
        <div className="actions">
          <Button actionType="submit" type="secondary" size="small">
            Create Course
          </Button>
        </div>
      </div>
    </form>
  );
};
