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
        };
        Insert: {
          id: string;
          name?: string | null;
          bio?: string | null;
          subtitle?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          bio?: string | null;
          subtitle?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          short_description: string;
          description: string | null;
          thumbnail_url: string | null;
          course_language: string;
          language_taught: string;
          is_published: boolean;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          short_description: string;
          description?: string | null;
          thumbnail_url?: string | null;
          course_language: string;
          language_taught: string;
          is_published?: boolean;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          short_description?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          course_language?: string;
          language_taught?: string;
          is_published?: boolean;
          author_id?: string;
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
    };
  };
}
