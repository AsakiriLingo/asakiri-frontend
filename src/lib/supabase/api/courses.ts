import { supabase } from '../client';
import { Database } from '../types';

type CourseInsert = Database['public']['Tables']['courses']['Insert'];
type CourseUpdate = Database['public']['Tables']['courses']['Update'];

export const courses = {
  create: async (courseData: CourseInsert) => {
    const { data, error } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();
    return { data, error };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase.rpc('get_full_course', {
      p_course_id: id,
    });
    return { data, error };
  },

  list: async (filters?: {
    published_only?: boolean;
    author_id?: string;
    language_taught?: string;
    course_language?: string;
  }) => {
    let query = supabase.from('courses').select(`
        *,
        author:profiles(*)
      `);

    if (filters?.published_only) {
      query = query.eq('is_published', true);
    }

    if (filters?.author_id) {
      query = query.eq('author_id', filters.author_id);
    }

    if (filters?.language_taught) {
      query = query.eq('language_taught', filters.language_taught);
    }

    if (filters?.course_language) {
      query = query.eq('course_language', filters.course_language);
    }

    const { data, error } = await query;
    return { data, error };
  },

  update: async (id: string, updates: CourseUpdate) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    return { error };
  },

  // Course enrollment functions
  enroll: async (userId: string, courseId: string) => {
    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
      })
      .select()
      .single();
    return { data, error };
  },

  getEnrollments: async (userId: string) => {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select(
        `
        *,
        course:courses(
          *,
          author:profiles(*)
        )
      `
      )
      .eq('user_id', userId);
    return { data, error };
  },

  isEnrolled: async (userId: string, courseId: string) => {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select()
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
    return { exists: !!data, error };
  },
};
