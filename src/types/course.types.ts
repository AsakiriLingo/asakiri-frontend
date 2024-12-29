import { Chapter } from '@/types/chapter.types.ts';
import { Teacher } from '@/types/teacher.types.ts';

interface Course {
  id: string;
  title: string;
  author: Teacher;
  description: string;
  thumbnail: string;
  courseLanguage: string;
  languageTaught: string;
  isPublished: boolean;
  chapters: Array<Chapter>;
}

interface CourseCard
  extends Omit<Course, 'id' | 'thumbnail' | 'chapters' | 'isPublished'> {
  link: string | undefined;
}

export type { Course, CourseCard };
