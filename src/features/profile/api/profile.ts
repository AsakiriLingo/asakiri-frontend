import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/types/domain.types.ts';

export interface ProfileResponse<T> {
  data: T | null;
  error: Error | null;
}

export const useProfileAPI = () => {
  const getProfile = async (): Promise<ProfileResponse<Profile>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');
      const { data, error } = await supabase
        .from('profiles')
        .select(
          `
          *
        `
        )
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return { data: data as Profile, error: null };
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      return { data: null, error: error as Error };
    }
  };
  const updateProfile = async (
    data: Partial<Profile>,
    profileImage?: File | null
  ): Promise<ProfileResponse<Profile>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');
      if (profileImage) {
        data.avatar_url = await uploadImage(profileImage);
      }
      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update({ ...data })
        .eq('id', user.id)
        .select('*')
        .single();

      if (error) throw error;

      return { data: updatedProfile as Profile, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error: error as Error };
    }
  };
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const sanitizedFileName = file.name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();
      const filePath = `profile/${Date.now()}-${sanitizedFileName}`;
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
    updateProfile,
    getProfile,
  };
};
