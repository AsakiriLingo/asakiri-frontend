export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          bio: string | null;
          subtitle: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          is_admin: boolean;
        };
        Insert: {
          id: string;
          name?: string | null;
          bio?: string | null;
          subtitle?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          name?: string | null;
          bio?: string | null;
          subtitle?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          is_admin?: boolean;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          short_description: string;
          description: string | null;
          thumbnail_url: string | null;
          is_published: boolean;
          author_id: string;
          created_at: string;
          updated_at: string;
          course_language_id: number | null;
          language_taught_id: number | null;
          total_enrollments: number;
          average_rating: number | null;
          total_ratings: number;
          total_chapters: number;
          estimated_hours: number | null;
        };
        Insert: {
          id?: string;
          title: string;
          short_description: string;
          description?: string | null;
          thumbnail_url?: string | null;
          is_published?: boolean;
          author_id: string;
          created_at?: string;
          updated_at?: string;
          course_language_id?: number | null;
          language_taught_id?: number | null;
          total_enrollments?: number;
          average_rating?: number | null;
          total_ratings?: number;
          total_chapters?: number;
          estimated_hours?: number | null;
        };
        Update: {
          id?: string;
          title?: string;
          short_description?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          is_published?: boolean;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
          course_language_id?: number | null;
          language_taught_id?: number | null;
          total_enrollments?: number;
          average_rating?: number | null;
          total_ratings?: number;
          total_chapters?: number;
          estimated_hours?: number | null;
        };
      };
      chapters: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          serial_number: number;
          course_id: string;
          created_at: string;
          updated_at: string;
          completion_count: number;
          average_time_spent: number | null;
          description: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          serial_number: number;
          course_id: string;
          created_at?: string;
          updated_at?: string;
          completion_count?: number;
          average_time_spent?: number | null;
          description: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          serial_number?: number;
          course_id?: string;
          created_at?: string;
          updated_at?: string;
          completion_count?: number;
          average_time_spent?: number | null;
          description?: string;
        };
      };
      sections: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          content_html: string | null;
          content_json: Json | null;
          serial_number: number;
          chapter_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          content_html?: string | null;
          content_json?: Json | null;
          serial_number: number;
          chapter_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          content_html?: string | null;
          content_json?: Json | null;
          serial_number?: number;
          chapter_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      languages: {
        Row: {
          id: number;
          code: string;
          name_en: string;
          name_native: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          code: string;
          name_en: string;
          name_native?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          code?: string;
          name_en?: string;
          name_native?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      course_enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          created_at?: string;
        };
      };
      course_ratings: {
        Row: {
          id: string;
          course_id: string;
          user_id: string;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          user_id: string;
          rating: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          user_id?: string;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      course_reviews: {
        Row: {
          id: string;
          course_id: string;
          user_id: string;
          review_text: string;
          is_verified_purchase: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          user_id: string;
          review_text: string;
          is_verified_purchase?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          user_id?: string;
          review_text?: string;
          is_verified_purchase?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      get_full_course: {
        Args: {
          p_course_id: string;
        };
        Returns: Json;
      };
      get_course_completion_percentage: {
        Args: {
          p_course_id: string;
          p_user_id: string;
        };
        Returns: number;
      };
      import_language: {
        Args: {
          p_code: string;
          p_name_en: string;
          p_name_native: string;
        };
        Returns: number;
      };
      reorder_chapter_vocabulary: {
        Args: {
          p_chapter_id: string;
          p_vocabulary_orders: Json[];
        };
        Returns: void;
      };
    };
  };
}
