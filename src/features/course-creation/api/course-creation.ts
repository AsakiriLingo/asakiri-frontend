import { CreateCourseData } from '../types';

import { supabase } from '@/lib/supabase/client';
import { Language } from '@/types/language.types';

interface CourseResponse<T> {
  data: T | null;
  error: Error | null;
}

export const useCourseCreationAPI = () => {
  const createCourse = async (
    data: CreateCourseData
  ): Promise<CourseResponse<never>> => {
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
          course_language: data.courseLanguage.toLowerCase(),
          language_taught: data.languageTaught.toLowerCase(),
          is_published: false,
          author_id: user.id,
        })
        .select()
        .single();

      if (courseError) throw courseError;

      return { data: course, error: null };
    } catch (error) {
      console.error('Course creation error:', error);
      return { data: null, error: error as Error };
    }
  };

  const getLanguages = async (): Promise<CourseResponse<Language[]>> => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('name_en');

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
