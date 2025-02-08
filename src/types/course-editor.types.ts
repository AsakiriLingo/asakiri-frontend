// Database types that match Supabase schema
export interface DbChapter {
  id: string;
  title: string;
  subtitle: string | null;
  serial_number: number;
  course_id: string;
}

export interface DbSection {
  id: string;
  title: string;
  subtitle: string | null;
  content_html: string | null;
  content_json: never | null;
  serial_number: number;
  chapter_id: string;
}

// Frontend types for state management
export interface Chapter {
  id: string;
  title: string;
  subTitle: string;
  serial_number: number;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  serial_number: number;
}

// API request types
export interface CreateChapterRequest {
  title: string;
  subtitle?: string;
  course_id: string;
  serial_number: number;
}

export interface CreateSectionRequest {
  title: string;
  subtitle?: string;
  content_html?: string;
  chapter_id: string;
  serial_number: number;
}

export interface UpdateChapterRequest {
  title?: string;
  subtitle?: string;
  serial_number?: number;
}

export interface UpdateSectionRequest {
  title?: string;
  subtitle?: string;
  content_html?: string;
  serial_number?: number;
}

// Component props types
export interface ContentEditCardProps {
  variant: 'chapter' | 'section';
  title: string;
  subTitle: string;
  content: string;
  isEditable: boolean;
  onSave?: (data: {
    title: string;
    subTitle: string;
    content?: string;
  }) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export interface SideBarCardSection {
  id: string;
  title: string;
  subTitle: string;
}
