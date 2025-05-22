import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
  bookmarks: z.boolean().optional(),
  reports: z.boolean().optional(),
}).strict();

export default ProjectCountOutputTypeSelectSchema;
