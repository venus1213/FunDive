import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const ProjectListRelationFilterSchema: z.ZodType<Prisma.ProjectListRelationFilter> = z.object({
  every: z.lazy(() => ProjectWhereInputSchema).optional(),
  some: z.lazy(() => ProjectWhereInputSchema).optional(),
  none: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export default ProjectListRelationFilterSchema;
