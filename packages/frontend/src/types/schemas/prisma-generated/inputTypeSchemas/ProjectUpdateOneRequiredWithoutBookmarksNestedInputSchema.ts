import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutBookmarksInputSchema } from './ProjectCreateWithoutBookmarksInputSchema';
import { ProjectUncheckedCreateWithoutBookmarksInputSchema } from './ProjectUncheckedCreateWithoutBookmarksInputSchema';
import { ProjectCreateOrConnectWithoutBookmarksInputSchema } from './ProjectCreateOrConnectWithoutBookmarksInputSchema';
import { ProjectUpsertWithoutBookmarksInputSchema } from './ProjectUpsertWithoutBookmarksInputSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectUpdateToOneWithWhereWithoutBookmarksInputSchema } from './ProjectUpdateToOneWithWhereWithoutBookmarksInputSchema';
import { ProjectUpdateWithoutBookmarksInputSchema } from './ProjectUpdateWithoutBookmarksInputSchema';
import { ProjectUncheckedUpdateWithoutBookmarksInputSchema } from './ProjectUncheckedUpdateWithoutBookmarksInputSchema';

export const ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutBookmarksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutBookmarksInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutBookmarksInputSchema),z.lazy(() => ProjectUpdateWithoutBookmarksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutBookmarksInputSchema) ]).optional(),
}).strict();

export default ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema;
