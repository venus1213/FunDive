import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectUpdateWithoutReportsInputSchema } from './ProjectUpdateWithoutReportsInputSchema';
import { ProjectUncheckedUpdateWithoutReportsInputSchema } from './ProjectUncheckedUpdateWithoutReportsInputSchema';
import { ProjectCreateWithoutReportsInputSchema } from './ProjectCreateWithoutReportsInputSchema';
import { ProjectUncheckedCreateWithoutReportsInputSchema } from './ProjectUncheckedCreateWithoutReportsInputSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const ProjectUpsertWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutReportsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReportsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutReportsInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export default ProjectUpsertWithoutReportsInputSchema;
