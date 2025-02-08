import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/button';
import { TextArea } from '@/components/text-area';
import { TextField } from '@/components/text-field';
import { toast } from '@/components/toast';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation';
import {
  SUPPORTED_LANGUAGES,
  createCourseFormSchema,
} from '@/features/course-creation/config/constants';

type FormData = z.infer<typeof createCourseFormSchema>;

export const CourseCreator: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { createCourse } = useCourseCreationAPI();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
      courseLanguage: 'English',
      languageTaught: 'Spanish',
    },
  });

  const selectedLanguageTaught = watch('languageTaught');
  const selectedCourseLanguage = watch('courseLanguage');

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('You must be logged in to create a course');
      return;
    }

    const { data: course, error } = await createCourse({
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      courseLanguage: data.courseLanguage,
      languageTaught: data.languageTaught,
    });

    if (error) {
      console.error('Error creating course:', error);
      return;
    }

    if (course?.id) {
      // Redirect to the course editor with the new course ID
      navigate(`/course/editor/${course.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="creator-container">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            label="Course Name"
            text={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {errors.title && <span className="error">{errors.title.message}</span>}

      <Controller
        name="shortDescription"
        control={control}
        render={({ field }) => (
          <TextField
            label="Course Short Description"
            text={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {errors.shortDescription && (
        <span className="error">{errors.shortDescription.message}</span>
      )}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Course Description"
            text={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {errors.description && (
        <span className="error">{errors.description.message}</span>
      )}

      <div className="creator-section-container">
        <div className="label-bold">Language Taught</div>
        <div className="language-grid">
          {SUPPORTED_LANGUAGES.map((language) => (
            <Button
              key={language}
              type={
                selectedLanguageTaught === language ? 'primary' : 'tertiary'
              }
              size="small"
              onPress={() => setValue('languageTaught', language)}
            >
              {language}
            </Button>
          ))}
        </div>
        {errors.languageTaught && (
          <span className="error">{errors.languageTaught.message}</span>
        )}
      </div>

      <div className="creator-section-container">
        <div className="label-bold">Course Language</div>
        <div className="language-grid">
          {SUPPORTED_LANGUAGES.map((language) => (
            <Button
              key={language}
              type={
                selectedCourseLanguage === language ? 'primary' : 'tertiary'
              }
              size="small"
              onPress={() => setValue('courseLanguage', language)}
            >
              {language}
            </Button>
          ))}
        </div>
        {errors.courseLanguage && (
          <span className="error">{errors.courseLanguage.message}</span>
        )}
      </div>

      <div className="actions">
        <Button actionType="submit" type="secondary" size="small">
          {isSubmitting ? 'Creating Course...' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
};
