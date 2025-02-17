import {
  CreateChapterData,
  CreateCourseData,
  CreateSectionData,
} from '../types';

import { supabase } from '@/lib/supabase/client';
import { Chapter } from '@/types/chapter.types.ts';
import { Course } from '@/types/course.types.ts';
import { Language } from '@/types/language.types';
import { Section } from '@/types/section.types.ts';

export interface CourseResponse<T> {
  data: T | null;
  error: Error | null;
}

export const useCourseCreationAPI = () => {
  const createCourse = async (
    data: CreateCourseData
  ): Promise<CourseResponse<Course>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: data.title,
          short_description: data.shortDescription,
          description: data.description || '',
          course_language: data.courseLanguage,
          language_taught: data.languageTaught,
          is_published: false,
          profile_id: user.id,
        })
        .select()
        .single();

      if (courseError) throw courseError;

      return { data: course, error: null };
    } catch (error) {
      console.error('Course creation error:', error);
      throw { data: null, error: error as Error };
    }
  };
  const createChapter = async (
    data: CreateChapterData
  ): Promise<CourseResponse<Chapter>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data: chapter, error: chapterError } = await supabase
        .from('chapters')
        .insert({
          course_id: data.courseId,
          title: data.title,
          sub_title: data.sub_title,
          description: data.description || '',
          created_at: new Date(),
          updated_at: new Date(),
        })
        .select(
          `
            *,
            sections (*)
          `
        )
        .single();

      if (chapterError) throw chapterError;

      return { data: chapter, error: null };
    } catch (error) {
      console.error('Chapter creation error:', error);
      throw { data: null, error: error as Error };
    }
  };
  const updateChapter = async (
    chapterId: string,
    data: Partial<CreateChapterData>
  ): Promise<CourseResponse<Chapter>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data: updatedChapter, error: updateError } = await supabase
        .from('chapters')
        .update({
          ...(data.courseId && { course_id: data.courseId }),
          ...(data.title && { title: data.title }),
          ...(data.sub_title && { sub_title: data.sub_title }),
          ...(data.description && { description: data.description }),
          updated_at: new Date(),
        })
        .eq('id', chapterId)
        .select(
          `
            *,
            sections (*)
          `
        )
        .single();

      if (updateError) throw updateError;

      return { data: updatedChapter, error: null };
    } catch (error) {
      console.error('Chapter update error:', error);
      throw { data: null, error: error as Error };
    }
  };

  const createSection = async (
    data: CreateSectionData
  ): Promise<CourseResponse<Section>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data: section, error: sectionError } = await supabase
        .from('sections')
        .insert({
          chapter_id: data.chapterId,
          title: data.title,
          sub_title: data.sub_title || '',
          content_html: data.contentHtml,
          content_json: data.contentJson,
          serial_number: data.serialNumber,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .select(
          'id, chapter_id, title, content_html, content_json, serial_number, sub_title'
        )
        .single();

      if (sectionError) throw sectionError;

      return {
        data: { ...section, sub_title: section.sub_title },
        error: null,
      };
    } catch (error) {
      console.error('Section creation error:', error);
      throw { data: null, error: error as Error };
    }
  };
  const updateSection = async (
    sectionId: string,
    data: Partial<CreateSectionData>
  ): Promise<CourseResponse<Section>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data: updatedSection, error: updateError } = await supabase
        .from('sections')
        .update({
          ...(data.chapterId && { chapter_id: data.chapterId }),
          ...(data.title && { title: data.title }),
          ...(data.sub_title && { sub_title: data.sub_title }),
          ...(data.contentHtml && { content_html: data.contentHtml }),
          ...(data.contentJson && { content_json: data.contentJson }),
          updated_at: new Date(),
        })
        .eq('id', sectionId)
        .select(
          'id, chapter_id, title, content_html, content_json, serial_number, sub_title'
        )
        .single();

      if (updateError) throw updateError;

      return { data: updatedSection, error: null };
    } catch (error) {
      console.error('Section update error:', error);
      throw { data: null, error: error as Error };
    }
  };

  const getLanguages = async (
    searchTerm: string = ''
  ): Promise<CourseResponse<Language[]>> => {
    try {
      let query = supabase.from('languages').select('*').order('name_en');

      if (searchTerm) {
        query = query.or(
          `name_en.ilike.%${searchTerm}%,name_native.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as Language[], error: null };
    } catch (error) {
      console.error('Error fetching languages:', error);
      return { data: null, error: error as Error };
    }
  };

  const getCourseById = async (
    courseId: string
  ): Promise<CourseResponse<Course>> => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(
          `
          *,
          chapters (
            *,
            sections (*)
          )
        `
        )
        .eq('id', courseId)
        .order('serial_number', { foreignTable: 'chapters' })
        .order('serial_number', { foreignTable: 'chapters.sections' })
        .single();

      if (error) throw error;

      return { data: data as Course, error: null };
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      return { data: null, error: error as Error };
    }
  };
  const deleteChapter = async (
    chapterId: string
  ): Promise<CourseResponse<null>> => {
    try {
      const { error: sectionError } = await supabase
        .from('sections')
        .delete()
        .eq('chapter_id', chapterId);

      if (sectionError) throw sectionError;

      const { error: chapterError } = await supabase
        .from('chapters')
        .delete()
        .eq('id', chapterId);

      if (chapterError) throw chapterError;

      return { data: null, error: null };
    } catch (error) {
      console.error('Error deleting chapter:', error);
      return { data: null, error: error as Error };
    }
  };
  const deleteSection = async (
    sectionId: string
  ): Promise<CourseResponse<null>> => {
    try {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error('Error deleting section:', error);
      return { data: null, error: error as Error };
    }
  };
  const uploadFile = async (
    file: File,
    folder: string
  ): Promise<string | null> => {
    try {
      const filePath = `${folder}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('media')
        .upload(filePath, file);
      if (error) throw error;
      const { data } = supabase.storage.from('media').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  };

  return {
    createCourse,
    getLanguages,
    getCourseById,
    createChapter,
    updateChapter,
    createSection,
    updateSection,
    deleteChapter,
    deleteSection,
    uploadFile,
  };
};
