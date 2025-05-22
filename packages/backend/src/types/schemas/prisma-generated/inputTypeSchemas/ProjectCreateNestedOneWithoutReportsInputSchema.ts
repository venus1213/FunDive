import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutReportsInputSchema } from './ProjectCreateWithoutReportsInputSchema';
import { ProjectUncheckedCreateWithoutReportsInputSchema } from './ProjectUncheckedCreateWithoutReportsInputSchema';
import { ProjectCreateOrConnectWithoutReportsInputSchema } from './ProjectCreateOrConnectWithoutReportsInputSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';

export const ProjectCreateNestedOneWithoutReportsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutReportsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutReportsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export default ProjectCreateNestedOneWithoutReportsInputSchema;
