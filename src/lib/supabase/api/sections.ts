import { supabase } from '../client';
import { Database } from '../types';

type SectionInsert = Database['public']['Tables']['sections']['Insert'];
type SectionUpdate = Database['public']['Tables']['sections']['Update'];

export const sections = {
  create: async (sectionData: SectionInsert) => {
    const { data, error } = await supabase
      .from('sections')
      .insert(sectionData)
      .select()
      .single();
    return { data, error };
  },

  getByChapterId: async (chapterId: string) => {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('serial_number');
    return { data, error };
  },

  update: async (id: string, updates: SectionUpdate) => {
    const { data, error } = await supabase
      .from('sections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('sections').delete().eq('id', id);
    return { error };
  },

  reorder: async (sections: { id: string; serial_number: number }[]) => {
    const { error } = await supabase.from('sections').upsert(sections);
    return { error };
  },
};
