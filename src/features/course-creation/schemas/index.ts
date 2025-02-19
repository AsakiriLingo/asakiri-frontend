import { z } from 'zod';

export const createCourseFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title must be less than 150 characters'),
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
