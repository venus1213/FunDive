import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectCreateWithoutBookmarksInputSchema } from './ProjectCreateWithoutBookmarksInputSchema';
import { ProjectUncheckedCreateWithoutBookmarksInputSchema } from './ProjectUncheckedCreateWithoutBookmarksInputSchema';

export const ProjectCreateOrConnectWithoutBookmarksInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutBookmarksInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBookmarksInputSchema) ]),
}).strict();

export default ProjectCreateOrConnectWithoutBookmarksInputSchema;
