import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const ProjectNullableRelationFilterSchema: z.ZodType<Prisma.ProjectNullableRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional().nullable()
}).strict();

export default ProjectNullableRelationFilterSchema;
