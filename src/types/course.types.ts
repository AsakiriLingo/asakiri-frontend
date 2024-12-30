import { Chapter } from '@/types/chapter.types.ts';
import { Teacher } from '@/types/teacher.types.ts';

interface Course {
  id: string;
  title: string;
  author: Teacher;
  shortDescription: string;
  description: string;
  thumbnail: string;
  courseLanguage: string;
  languageTaught: string;
  isPublished: boolean;
  chapters: Array<Chapter>;
}

export type { Course };
