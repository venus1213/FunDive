import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectCreateWithoutMessagesInputSchema } from './ProjectCreateWithoutMessagesInputSchema';
import { ProjectUncheckedCreateWithoutMessagesInputSchema } from './ProjectUncheckedCreateWithoutMessagesInputSchema';

export const ProjectCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export default ProjectCreateOrConnectWithoutMessagesInputSchema;
