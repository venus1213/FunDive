import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectUpdateWithoutMessagesInputSchema } from './ProjectUpdateWithoutMessagesInputSchema';
import { ProjectUncheckedUpdateWithoutMessagesInputSchema } from './ProjectUncheckedUpdateWithoutMessagesInputSchema';
import { ProjectCreateWithoutMessagesInputSchema } from './ProjectCreateWithoutMessagesInputSchema';
import { ProjectUncheckedCreateWithoutMessagesInputSchema } from './ProjectUncheckedCreateWithoutMessagesInputSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';

export const ProjectUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export default ProjectUpsertWithoutMessagesInputSchema;
