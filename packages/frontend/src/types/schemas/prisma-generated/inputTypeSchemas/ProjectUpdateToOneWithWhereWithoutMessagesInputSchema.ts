import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';
import { ProjectUpdateWithoutMessagesInputSchema } from './ProjectUpdateWithoutMessagesInputSchema';
import { ProjectUncheckedUpdateWithoutMessagesInputSchema } from './ProjectUncheckedUpdateWithoutMessagesInputSchema';

export const ProjectUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export default ProjectUpdateToOneWithWhereWithoutMessagesInputSchema;
