import { supabase } from '../client';
import { Database } from '../types';

type ChapterInsert = Database['public']['Tables']['chapters']['Insert'];
type ChapterUpdate = Database['public']['Tables']['chapters']['Update'];

export const chapters = {
  create: async (chapterData: ChapterInsert) => {
    const { data, error } = await supabase
      .from('chapters')
      .insert(chapterData)
      .select()
      .single();
    return { data, error };
  },

  getByCourseId: async (courseId: string) => {
    const { data, error } = await supabase
      .from('chapters')
      .select(
        `
        *,
        sections(*)
      `
      )
      .eq('course_id', courseId)
      .order('serial_number');
    return { data, error };
  },

  update: async (id: string, updates: ChapterUpdate) => {
    const { data, error } = await supabase
      .from('chapters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('chapters').delete().eq('id', id);
    return { error };
  },

  reorder: async (chapters: { id: string; serial_number: number }[]) => {
    const { error } = await supabase.from('chapters').upsert(chapters);
    return { error };
  },
};
