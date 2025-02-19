export interface Language {
  id: number;
  code: string;
  name_en: string;
  name_native: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseFormData {
  title: string;
  shortDescription: string;
  description: string;
  languageTaught: Language | null;
  courseLanguage: Language | null;
}

export interface CreateCourseData {
  title: string;
  shortDescription?: string;
  description?: string;
  courseLanguage: number;
  languageTaught: number;
}

export interface CreateChapterData {
  id?: string;
  course_id: string;
  title?: string;
  sub_title?: string;
  description: string;
  serial_number: number;
}
export interface CreateSectionData {
  id?: string;
  chapter_id?: string;
  title?: string;
  sub_title?: string;
  serial_number?: number;
  content_html?: string;
  content_json?: object;
}
