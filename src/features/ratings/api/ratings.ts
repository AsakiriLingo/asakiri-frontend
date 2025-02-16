import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client';

interface CourseRating {
  rating: number;
  comment?: string;
}

interface RatingResponse<T> {
  data: T | null;
  error: Error | null;
}

export const useRatingsAPI = () => {
  const rateContent = async (
    courseId: string,
    rating: CourseRating
  ): Promise<RatingResponse<CourseRating>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('course_ratings')
        .upsert({
          course_id: courseId,
          user_id: user.id,
          rating: rating.rating,
          comment: rating.comment,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Rating submitted successfully!');
      return { data, error: null };
    } catch (error) {
      console.error('Rating error:', error);
      toast.error('Failed to submit rating');
      return { data: null, error: error as Error };
    }
  };

  const getCourseRating = async (
    courseId: string
  ): Promise<RatingResponse<number>> => {
    try {
      const { data, error } = await supabase.rpc('get_course_rating', {
        course_id: courseId,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching course rating:', error);
      return { data: null, error: error as Error };
    }
  };

  const getUserRating = async (
    courseId: string
  ): Promise<RatingResponse<CourseRating>> => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) return { data: null, error: null };

      const { data, error } = await supabase
        .from('course_ratings')
        .select('rating, comment')
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user rating:', error);
      return { data: null, error: error as Error };
    }
  };

  return {
    rateContent,
    getCourseRating,
    getUserRating,
  };
};
