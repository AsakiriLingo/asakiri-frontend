import { supabase } from '@/lib/supabase/client';
import { Language } from '@/types/language.types';

export const useLanguageAPI = () => {
  const getLanguagesByLetter = async (letter: string) => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .ilike('name_en', `${letter}%`)
        .order('name_en');

      if (error) {
        throw error;
      }

      return { data: data as Language[], error: null };
    } catch (e) {
      console.error('Error fetching languages:', e);
      return { data: null, error: e as Error };
    }
  };

  const searchLanguages = async (searchTerm: string) => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .or(`name_en.ilike.%${searchTerm}%,name_native.ilike.%${searchTerm}%`)
        .order('name_en');

      if (error) {
        throw error;
      }

      return { data: data as Language[], error: null };
    } catch (e) {
      console.error('Error searching languages:', e);
      return { data: null, error: e as Error };
    }
  };

  return {
    getLanguagesByLetter,
    searchLanguages,
  };
};
