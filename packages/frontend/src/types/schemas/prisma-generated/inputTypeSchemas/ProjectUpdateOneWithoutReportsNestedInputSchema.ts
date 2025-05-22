import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutReportsInputSchema } from './ProjectCreateWithoutReportsInputSchema';
import { ProjectUncheckedCreateWithoutReportsInputSchema } from './ProjectUncheckedCreateWithoutReportsInputSchema';
import { ProjectCreateOrConnectWithoutReportsInputSchema } from './ProjectCreateOrConnectWithoutReportsInputSchema';
import { ProjectUpsertWithoutReportsInputSchema } from './ProjectUpsertWithoutReportsInputSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectUpdateToOneWithWhereWithoutReportsInputSchema } from './ProjectUpdateToOneWithWhereWithoutReportsInputSchema';
import { ProjectUpdateWithoutReportsInputSchema } from './ProjectUpdateWithoutReportsInputSchema';
import { ProjectUncheckedUpdateWithoutReportsInputSchema } from './ProjectUncheckedUpdateWithoutReportsInputSchema';

export const ProjectUpdateOneWithoutReportsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneWithoutReportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutReportsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutReportsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutReportsInputSchema),z.lazy(() => ProjectUpdateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReportsInputSchema) ]).optional(),
}).strict();

export default ProjectUpdateOneWithoutReportsNestedInputSchema;
