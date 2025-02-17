import { Chapter } from '@/types/chapter.types.ts';
import { Teacher } from '@/types/teacher.types.ts';

interface Course {
  id: string;
  title: string;
  author: Teacher;
  short_description: string;
  description_html: string;
  description_json: object;
  support_link: string;
  thumbnail: string;
  course_language: number;
  language_taught: number;
  is_published: boolean;
  published_at: Date;
  chapters: Array<Chapter>;
}

export type { Course };
