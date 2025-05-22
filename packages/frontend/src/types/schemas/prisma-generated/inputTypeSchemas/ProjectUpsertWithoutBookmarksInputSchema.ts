import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectUpdateWithoutBookmarksInputSchema } from './ProjectUpdateWithoutBookmarksInputSchema';
import { ProjectUncheckedUpdateWithoutBookmarksInputSchema } from './ProjectUncheckedUpdateWithoutBookmarksInputSchema';
import { ProjectCreateWithoutBookmarksInputSchema } from './ProjectCreateWithoutBookmarksInputSchema';
import { ProjectUncheckedCreateWithoutBookmarksInputSchema } from './ProjectUncheckedCreateWithoutBookmarksInputSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const ProjectUpsertWithoutBookmarksInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutBookmarksInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutBookmarksInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBookmarksInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export default ProjectUpsertWithoutBookmarksInputSchema;
