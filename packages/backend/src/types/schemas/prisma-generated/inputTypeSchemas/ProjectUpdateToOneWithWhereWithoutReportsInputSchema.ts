import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';
import { ProjectUpdateWithoutReportsInputSchema } from './ProjectUpdateWithoutReportsInputSchema';
import { ProjectUncheckedUpdateWithoutReportsInputSchema } from './ProjectUncheckedUpdateWithoutReportsInputSchema';

export const ProjectUpdateToOneWithWhereWithoutReportsInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutReportsInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutReportsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutReportsInputSchema) ]),
}).strict();

export default ProjectUpdateToOneWithWhereWithoutReportsInputSchema;
