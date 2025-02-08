import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client';
import {
  CreateChapterRequest,
  CreateSectionRequest,
  UpdateChapterRequest,
  UpdateSectionRequest,
} from '@/types/course-editor.types';

export const useCourseCreationAPI = () => {
  const createChapter = async (data: CreateChapterRequest) => {
    try {
      const { error } = await supabase
        .from('chapters')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      toast.success('Chapter created!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to create chapter');
    }
  };

  const createSection = async (data: CreateSectionRequest) => {
    try {
      const { error } = await supabase
        .from('sections')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      toast.success('Section created!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to create section');
    }
  };

  const updateChapter = async (id: string, data: UpdateChapterRequest) => {
    try {
      const { error } = await supabase
        .from('chapters')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Chapter updated!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update chapter');
    }
  };

  const updateSection = async (id: string, data: UpdateSectionRequest) => {
    try {
      const { error } = await supabase
        .from('sections')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Section updated!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update section');
    }
  };

  const deleteChapter = async (id: string) => {
    try {
      const { error } = await supabase.from('chapters').delete().eq('id', id);

      if (error) throw error;
      toast.success('Chapter deleted!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete chapter');
    }
  };

  const deleteSection = async (id: string) => {
    try {
      const { error } = await supabase.from('sections').delete().eq('id', id);

      if (error) throw error;
      toast.success('Section deleted!');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete section');
    }
  };

  return {
    createChapter,
    createSection,
    updateChapter,
    updateSection,
    deleteChapter,
    deleteSection,
  };
};
