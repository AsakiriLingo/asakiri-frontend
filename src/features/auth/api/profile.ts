import { useQuery, useMutation, useQueryClient } from 'react-query';

import { toast } from '@/components/toast';
import { AuthUser } from '@/features/auth/types/auth.ts';
import { useAxios } from '@/hooks/use-axios.tsx';

interface UpdateUserProfile {
  user_id: string;
  name?: string;
  bio?: string;
  subTitle?: string;
  // avatar: string;
}

const useUserProfileAPI = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  const fetchProfile = async (userId: string) => {
    const response = await axiosInstance.get<AuthUser>(`/profiles/${userId}`);
    return response.data;
  };

  const updateProfile = async ({
    user_id,
    name,
    bio,
    subTitle,
  }: UpdateUserProfile): Promise<void> => {
    try {
      const payload: Omit<UpdateUserProfile, 'user_id'> = {};
      if (name) {
        payload.name = name;
      }
      if (bio) {
        payload.bio = bio;
      }
      if (subTitle) {
        payload.subTitle = subTitle;
      }
      await axiosInstance.patch(`/profile/${user_id}`, payload);
      toast.success('Profile updated successfully.');
    } catch (error: unknown) {
      console.log(error);
      toast.error(`Failed to update profile`);
    }
  };

  return {
    fetch: (userId: string) =>
      useQuery(['user-profile', userId], () => fetchProfile(userId)),
    update: useMutation(updateProfile, {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['user-profile', variables.user_id]);
      },
    }),
  };
};

export { useUserProfileAPI };
