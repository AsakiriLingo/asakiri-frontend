import { z } from 'zod';

const createCourseFormSchema = z.object({
  title: z.string().max(150),
  shortDescription: z.string().max(500),
  description: z.string().max(10000),
});

const editCourseFormSchema = z.object({
  title: z.string().min(5),
  sub_title: z.string().min(5),
  contentHtml: z.string().max(10000),
  contentJson: z.any(),
  serialNumber: z.number().default(0),
});

export { createCourseFormSchema, editCourseFormSchema };
