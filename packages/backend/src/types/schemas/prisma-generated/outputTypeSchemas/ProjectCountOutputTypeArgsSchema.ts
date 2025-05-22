import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProjectCountOutputTypeSelectSchema } from './ProjectCountOutputTypeSelectSchema';

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ProjectCountOutputTypeSelectSchema;
