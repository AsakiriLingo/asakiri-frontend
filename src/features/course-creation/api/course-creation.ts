import { CreateCourseData } from '../types';

import { supabase } from '@/lib/supabase/client';
import { Course } from '@/types/course.types.ts';
import { Language } from '@/types/language.types';

interface CourseResponse<T> {
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

  return {
    createCourse,
    getLanguages,
  };
};
