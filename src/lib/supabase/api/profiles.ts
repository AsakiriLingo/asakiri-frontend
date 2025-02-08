import { supabase } from '../client';
import { Database } from '../types';

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profiles = {
  update: async (userId: string, updates: Omit<ProfileUpdate, 'id'>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  getById: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        *,
        courses(*)
      `
      )
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Get user's teaching activity
  getTeachingProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        *,
        teaching_courses:courses(*)
      `
      )
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Get user's learning activity
  getLearningProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        *,
        enrolled_courses:course_enrollments(
          course:courses(
            *,
            author:profiles(*)
          )
        )
      `
      )
      .eq('id', userId)
      .single();
    return { data, error };
  },
};
