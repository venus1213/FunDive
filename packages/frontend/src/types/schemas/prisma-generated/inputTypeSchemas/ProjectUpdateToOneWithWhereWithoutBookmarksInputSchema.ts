import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';
import { ProjectUpdateWithoutBookmarksInputSchema } from './ProjectUpdateWithoutBookmarksInputSchema';
import { ProjectUncheckedUpdateWithoutBookmarksInputSchema } from './ProjectUncheckedUpdateWithoutBookmarksInputSchema';

export const ProjectUpdateToOneWithWhereWithoutBookmarksInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutBookmarksInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutBookmarksInputSchema) ]),
}).strict();

export default ProjectUpdateToOneWithWhereWithoutBookmarksInputSchema;
