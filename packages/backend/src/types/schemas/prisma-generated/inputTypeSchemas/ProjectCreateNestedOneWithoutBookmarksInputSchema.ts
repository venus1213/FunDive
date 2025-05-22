import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutBookmarksInputSchema } from './ProjectCreateWithoutBookmarksInputSchema';
import { ProjectUncheckedCreateWithoutBookmarksInputSchema } from './ProjectUncheckedCreateWithoutBookmarksInputSchema';
import { ProjectCreateOrConnectWithoutBookmarksInputSchema } from './ProjectCreateOrConnectWithoutBookmarksInputSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';

export const ProjectCreateNestedOneWithoutBookmarksInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutBookmarksInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export default ProjectCreateNestedOneWithoutBookmarksInputSchema;
