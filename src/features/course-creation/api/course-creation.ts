// import { useQueryClient } from 'react-query';

import { toast } from '@/components/toast';
import { useAxios } from '@/hooks/use-axios.tsx';
import { Chapter } from '@/types/chapter.types.ts';
import { Course } from '@/types/course.types.ts';
import { Section } from '@/types/section.types.ts';

type CreateCourse = Omit<
  Course,
  'id' | 'chapters' | 'thumbnail' | 'author' | 'isPublished'
>;

type CreateChapter = Omit<Chapter, 'id' | 'sections' | 'serialNumber'>;

type CreateSection = Omit<Section, 'id' | 'serialNumber'>;

const useCourseCreationAPI = () => {
  const axiosInstance = useAxios();

  const createCourse = async (data: CreateCourse) => {
    try {
      const payload = {
        title: data.title,
        short_description: data.shortDescription,
        description: data.description,
        course_language: data.courseLanguage,
        language_taught: data.languageTaught,
      };
      await axiosInstance.post('courses/', payload);
      toast.success('Course created!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to create course');
    }
  };

  const createChapter = async (data: CreateChapter) => {
    try {
      await axiosInstance.post('chapters/', data);
      toast.success('Chapter created!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to create chapter');
    }
  };

  const createSection = async (payload: CreateSection) => {
    try {
      await axiosInstance.post('sections/', payload);
      toast.success('Section created!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to create section');
    }
  };

  const updateCourse = async (courseId: string, payload: CreateCourse) => {
    try {
      await axiosInstance.patch(`courses/${courseId}`, payload);
      toast.success('Course updated!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to update course');
    }
  };

  const updateChapter = async (chapterId: string, payload: CreateChapter) => {
    try {
      await axiosInstance.patch(`chapters/${chapterId}`, payload);
      toast.success('Chapter updated!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to update chapter');
    }
  };

  const updateSection = async (sectionId: string, payload: CreateSection) => {
    try {
      await axiosInstance.patch(`sections/${sectionId}`, payload);
      toast.success('Section updated!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to update section');
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await axiosInstance.delete(`courses/${courseId}`);
      toast.success('Course deleted!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to delete course');
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      await axiosInstance.delete(`chapters/${chapterId}`);
      toast.success('Chapter deleted!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to delete chapter');
    }
  };

  const deleteSection = async (sectionId: string) => {
    try {
      await axiosInstance.delete(`sections/${sectionId}`);
      toast.success('Section deleted!');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Failed to delete section');
    }
  };

  return {
    createChapter,
    createCourse,
    createSection,
    updateCourse,
    updateChapter,
    updateSection,
    deleteCourse,
    deleteChapter,
    deleteSection,
  };
};

export { useCourseCreationAPI };
