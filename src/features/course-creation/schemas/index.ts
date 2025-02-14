import { z } from 'zod';

export const createCourseFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title must be less than 150 characters'),
  shortDescription: z
    .string()
    .min(20, 'Short description must be at least 20 characters')
    .max(500, 'Short description must be less than 500 characters'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(10000, 'Description must be less than 10000 characters'),
  languageTaught: z
    .object({
      id: z.number(),
      code: z.string(),
      name_en: z.string(),
      name_native: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
    })
    .nullable(),
  courseLanguage: z
    .object({
      id: z.number(),
      code: z.string(),
      name_en: z.string(),
      name_native: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
    })
    .nullable(),
});
