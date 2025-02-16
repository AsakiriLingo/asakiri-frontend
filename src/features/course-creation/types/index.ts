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
  shortDescription: string;
  description?: string;
  courseLanguage: number;
  languageTaught: number;
}

export interface CreateChapterData {
  id?: string;
  courseId: string;
  title?: string;
  sub_title?: string;
  description: string;
  serialNumber: number;
}
export interface CreateSectionData {
  id?: string;
  chapterId?: string;
  title?: string;
  sub_title?: string;
  serialNumber?: number;
  contentHtml?: string;
  contentJson?: object;
}
