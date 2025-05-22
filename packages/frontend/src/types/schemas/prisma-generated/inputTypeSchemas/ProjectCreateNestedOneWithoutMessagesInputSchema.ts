import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutMessagesInputSchema } from './ProjectCreateWithoutMessagesInputSchema';
import { ProjectUncheckedCreateWithoutMessagesInputSchema } from './ProjectUncheckedCreateWithoutMessagesInputSchema';
import { ProjectCreateOrConnectWithoutMessagesInputSchema } from './ProjectCreateOrConnectWithoutMessagesInputSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';

export const ProjectCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export default ProjectCreateNestedOneWithoutMessagesInputSchema;
