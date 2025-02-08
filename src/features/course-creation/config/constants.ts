import { z } from 'zod';

export const SUPPORTED_LANGUAGES = [
  'English',
  'Spanish',
  'Japanese',
  'Chinese',
  'Korean',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Arabic',
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const createCourseFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title must be less than 150 characters'),
  shortDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(10000, 'Description must be less than 10000 characters'),
  courseLanguage: z.enum(SUPPORTED_LANGUAGES, {
    errorMap: () => ({ message: 'Please select a course language' }),
  }),
  languageTaught: z.enum(SUPPORTED_LANGUAGES, {
    errorMap: () => ({ message: 'Please select a language to teach' }),
  }),
});
