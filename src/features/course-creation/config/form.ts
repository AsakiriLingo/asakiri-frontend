import { z } from 'zod';

const createCourseFormSchema = z.object({
  title: z.string().max(150),
  shortDescription: z.string().max(500),
  description: z.string().max(10000),
});

const editCourseFormSchema = z.object({
  title: z.string().min(150),
  subtitle: z.string().min(150),
});

export { createCourseFormSchema, editCourseFormSchema };
