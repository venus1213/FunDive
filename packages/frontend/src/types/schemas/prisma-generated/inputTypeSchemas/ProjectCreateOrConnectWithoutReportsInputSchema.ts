import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectCreateWithoutReportsInputSchema } from './ProjectCreateWithoutReportsInputSchema';
import { ProjectUncheckedCreateWithoutReportsInputSchema } from './ProjectUncheckedCreateWithoutReportsInputSchema';

export const ProjectCreateOrConnectWithoutReportsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutReportsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema) ]),
}).strict();

export default ProjectCreateOrConnectWithoutReportsInputSchema;
