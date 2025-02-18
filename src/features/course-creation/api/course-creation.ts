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
  const updateCourse = async (
    courseId: string,
    data: Partial<Course>,
    thumbnailFile?: File | null
  ): Promise<CourseResponse<Course>> => {
    try {
      if (!courseId) throw new Error('Course ID is required.');
      let thumbnailUrl = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'thumbnails');
      }
      if (thumbnailUrl) {
        data.thumbnail = thumbnailUrl;
      }
      const { data: updatedCourse, error } = await supabase
        .from('courses')
        .update({ ...data })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;

      return { data: updatedCourse as Course, error: null };
    } catch (error) {
      console.error('Error updating course:', error);
      return { data: null, error: error as Error };
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
          course_id: data.course_id,
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
          ...(data.course_id && { course_id: data.course_id }),
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
          chapter_id: data.chapter_id,
          title: data.title,
          sub_title: data.sub_title || '',
          content_html: data.content_html,
          content_json: data.content_json,
          serial_number: data.serial_number,
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
          ...(data.chapter_id && { chapter_id: data.chapter_id }),
          ...(data.title && { title: data.title }),
          ...(data.sub_title && { sub_title: data.sub_title }),
          ...(data.content_html && { content_html: data.content_html }),
          ...(data.content_json && { content_json: data.content_json }),
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
  const getCourseDetail = async (
    courseId: string
  ): Promise<CourseResponse<Course>> => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(
          `
          *,
          profiles (
            id,
            name,
            subtitle,
            avatar_url,
            bio
          ),
          chapters (
            *
          )
        `
        )
        .eq('id', courseId)
        .order('serial_number', { foreignTable: 'chapters' })
        .single();
      if (error) throw error;
      if (data && data.profiles) {
        data.author = { ...data.profiles };
        delete data.profiles;
      }
      console.log(data);
      return { data: data as Course, error: null };
    } catch (error) {
      console.error('Error fetching course details:', error);
      return { data: null, error: error as Error };
    }
  };

  const getLanguageById = async (
    id: number
  ): Promise<CourseResponse<Language>> => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select(
          `
          *
        `
        )
        .eq('id', id)
        .single();
      if (error) throw error;
      return { data: data as Language, error: null };
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
      const sanitizedFileName = file.name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();
      const filePath = `${folder}/${Date.now()}-${sanitizedFileName}`;
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
    updateCourse,
    getLanguages,
    getLanguageById,
    getCourseById,
    getCourseDetail,
    createChapter,
    updateChapter,
    createSection,
    updateSection,
    deleteChapter,
    deleteSection,
    uploadFile,
  };
};
