import { PostgrestError } from '@supabase/supabase-js';

import { supabase } from '../client';

import { Chapter } from '@/types/chapter.types';
import { Course } from '@/types/course.types';
import { Section } from '@/types/section.types';
import { Teacher } from '@/types/teacher.types';

// Input types
interface CreateCourseInput {
  title: string;
  shortDescription: string;
  description?: string;
  thumbnailUrl?: string;
  courseLanguage: string;
  languageTaught: string;
  authorId: string;
}

interface CreateChapterInput {
  title: string;
  subtitle?: string;
  serialNumber: number;
  courseId: string;
}

interface CreateSectionInput {
  title: string;
  subtitle?: string;
  contentHtml?: string;
  contentJson?: Record<string, unknown>;
  serialNumber: number;
  chapterId: string;
}

// Response types
interface ApiResponse<T> {
  data: T | null;
  error: PostgrestError | null;
}

interface CourseWithAuthor extends Course {
  author: Teacher;
}

interface FullCourse extends CourseWithAuthor {
  chapters: (Chapter & {
    sections: Section[];
  })[];
}

interface CourseFilters {
  authorId?: string;
  languageTaught?: string;
  courseLanguage?: string;
  publishedOnly?: boolean;
}

export const courseApi = {
  createCourse: async (
    input: CreateCourseInput
  ): Promise<ApiResponse<CourseWithAuthor>> => {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        title: input.title,
        short_description: input.shortDescription,
        description: input.description,
        thumbnail_url: input.thumbnailUrl,
        course_language: input.courseLanguage,
        language_taught: input.languageTaught,
        author_id: input.authorId,
        is_published: false,
      })
      .select()
      .single();

    return { data, error };
  },

  addChapter: async (
    input: CreateChapterInput
  ): Promise<ApiResponse<Chapter>> => {
    const { data, error } = await supabase
      .from('chapters')
      .insert({
        title: input.title,
        subtitle: input.subtitle,
        serial_number: input.serialNumber,
        course_id: input.courseId,
      })
      .select()
      .single();

    return { data, error };
  },

  addSection: async (
    input: CreateSectionInput
  ): Promise<ApiResponse<Section>> => {
    const { data, error } = await supabase
      .from('sections')
      .insert({
        title: input.title,
        subtitle: input.subtitle,
        content_html: input.contentHtml,
        content_json: input.contentJson,
        serial_number: input.serialNumber,
        chapter_id: input.chapterId,
      })
      .select()
      .single();

    return { data, error };
  },

  getCourse: async (courseId: string): Promise<ApiResponse<FullCourse>> => {
    const { data, error } = await supabase.rpc('get_full_course', {
      p_course_id: courseId,
    });

    return { data, error };
  },

  updateCourse: async (
    courseId: string,
    updates: Partial<CreateCourseInput>
  ): Promise<ApiResponse<CourseWithAuthor>> => {
    const { data, error } = await supabase
      .from('courses')
      .update({
        title: updates.title,
        short_description: updates.shortDescription,
        description: updates.description,
        thumbnail_url: updates.thumbnailUrl,
        course_language: updates.courseLanguage,
        language_taught: updates.languageTaught,
      })
      .eq('id', courseId)
      .select()
      .single();

    return { data, error };
  },

  updateChapter: async (
    chapterId: string,
    updates: Partial<CreateChapterInput>
  ): Promise<ApiResponse<Chapter>> => {
    const { data, error } = await supabase
      .from('chapters')
      .update({
        title: updates.title,
        subtitle: updates.subtitle,
        serial_number: updates.serialNumber,
      })
      .eq('id', chapterId)
      .select()
      .single();

    return { data, error };
  },

  updateSection: async (
    sectionId: string,
    updates: Partial<CreateSectionInput>
  ): Promise<ApiResponse<Section>> => {
    const { data, error } = await supabase
      .from('sections')
      .update({
        title: updates.title,
        subtitle: updates.subtitle,
        content_html: updates.contentHtml,
        content_json: updates.contentJson,
        serial_number: updates.serialNumber,
      })
      .eq('id', sectionId)
      .select()
      .single();

    return { data, error };
  },

  deleteCourse: async (courseId: string): Promise<ApiResponse<null>> => {
    const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    return { data, error };
  },

  deleteChapter: async (chapterId: string): Promise<ApiResponse<null>> => {
    const { data, error } = await supabase
      .from('chapters')
      .delete()
      .eq('id', chapterId);

    return { data, error };
  },

  deleteSection: async (sectionId: string): Promise<ApiResponse<null>> => {
    const { data, error } = await supabase
      .from('sections')
      .delete()
      .eq('id', sectionId);

    return { data, error };
  },

  togglePublishStatus: async (
    courseId: string,
    publish: boolean
  ): Promise<ApiResponse<CourseWithAuthor>> => {
    const { data, error } = await supabase
      .from('courses')
      .update({ is_published: publish })
      .eq('id', courseId)
      .select()
      .single();

    return { data, error };
  },

  listCourses: async (
    filters?: CourseFilters
  ): Promise<ApiResponse<CourseWithAuthor[]>> => {
    let query = supabase.from('courses').select(`
        *,
        author:profiles (
          id,
          name,
          subtitle,
          avatar_url
        )
      `);

    if (filters?.authorId) {
      query = query.eq('author_id', filters.authorId);
    }
    if (filters?.languageTaught) {
      query = query.eq('language_taught', filters.languageTaught);
    }
    if (filters?.courseLanguage) {
      query = query.eq('course_language', filters.courseLanguage);
    }
    if (filters?.publishedOnly) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query;
    return { data, error };
  },
};
