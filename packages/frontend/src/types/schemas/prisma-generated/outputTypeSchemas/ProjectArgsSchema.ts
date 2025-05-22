import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProjectSelectSchema } from '../inputTypeSchemas/ProjectSelectSchema';
import { ProjectIncludeSchema } from '../inputTypeSchemas/ProjectIncludeSchema';

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export default ProjectArgsSchema;
