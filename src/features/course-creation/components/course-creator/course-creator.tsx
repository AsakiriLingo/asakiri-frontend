import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createCourseFormSchema } from '../../schemas';
import { CourseFormData } from '../../types';

import './course-creator.scss';

import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog-trigger';
import { Modal } from '@/components/modal';
import { TextField } from '@/components/text-field';
import { toast } from '@/components/toast';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation';
import { LanguageList } from '@/features/course-creation/components/language-list';
import { Language } from '@/types/language.types';

export const CourseCreator: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLanguageTaughtOpen, setIsLanguageTaughtOpen] = useState(false);
  const [isCourseLanguageOpen, setIsCourseLanguageOpen] = useState(false);
  const { createCourse } = useCourseCreationAPI();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      title: '',
      languageTaught: null,
      courseLanguage: null,
    },
  });

  const onLanguageTaughtSelect = (language: Language) => {
    setValue('languageTaught', language, { shouldValidate: true });
    setIsLanguageTaughtOpen(false);
  };

  const onCourseLanguageSelect = (language: Language) => {
    setValue('courseLanguage', language, { shouldValidate: true });
    setIsCourseLanguageOpen(false);
  };

  const onSubmit = async (data: CourseFormData) => {
    try {
      setIsSubmitting(true);

      if (!data.languageTaught || !data.courseLanguage) {
        toast.error('Please select both languages');
        return;
      }

      const courseResponse = await createCourse({
        title: data.title,
        courseLanguage: data.courseLanguage.id,
        languageTaught: data.languageTaught.id,
      });

      toast.success('Course created successfully!');
      navigate(`/course/editor/${courseResponse.data?.id}`);
    } catch (error) {
      console.error('Failed to create course:', error);
      toast.error('Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
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

      <div className="creator-section-container">
        <div className="label-bold">Language Taught</div>
        <DialogTrigger>
          <Button
            size="small"
            variant="flat"
            onPress={() => setIsLanguageTaughtOpen(true)}
          >
            {control._formValues.languageTaught?.name_en ??
              'Select Language Taught'}
          </Button>
          <Modal
            isOpen={isLanguageTaughtOpen}
            setIsOpen={setIsLanguageTaughtOpen}
          >
            <LanguageList
              heading="Language Taught"
              onSelect={onLanguageTaughtSelect}
            />
          </Modal>
        </DialogTrigger>
        {errors.languageTaught && (
          <span className="error">Please select a language to teach</span>
        )}
      </div>

      <div className="creator-section-container">
        <div className="label-bold">Course Language</div>
        <DialogTrigger>
          <Button
            size="small"
            variant="flat"
            onPress={() => setIsCourseLanguageOpen(true)}
          >
            {control._formValues.courseLanguage?.name_en ??
              'Select Course Language'}
          </Button>
          <Modal
            isOpen={isCourseLanguageOpen}
            setIsOpen={setIsCourseLanguageOpen}
          >
            <LanguageList
              heading="Course Language"
              onSelect={onCourseLanguageSelect}
            />
          </Modal>
        </DialogTrigger>
        {errors.courseLanguage && (
          <span className="error">Please select a course language</span>
        )}
      </div>

      <div className="actions">
        <Button type="secondary" size="small" actionType="submit">
          {isSubmitting ? 'Creating Course...' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
};
