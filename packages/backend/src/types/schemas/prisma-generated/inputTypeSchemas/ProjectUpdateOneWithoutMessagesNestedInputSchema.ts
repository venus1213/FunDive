import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutMessagesInputSchema } from './ProjectCreateWithoutMessagesInputSchema';
import { ProjectUncheckedCreateWithoutMessagesInputSchema } from './ProjectUncheckedCreateWithoutMessagesInputSchema';
import { ProjectCreateOrConnectWithoutMessagesInputSchema } from './ProjectCreateOrConnectWithoutMessagesInputSchema';
import { ProjectUpsertWithoutMessagesInputSchema } from './ProjectUpsertWithoutMessagesInputSchema';
import { ProjectWhereInputSchema } from './ProjectWhereInputSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectUpdateToOneWithWhereWithoutMessagesInputSchema } from './ProjectUpdateToOneWithWhereWithoutMessagesInputSchema';
import { ProjectUpdateWithoutMessagesInputSchema } from './ProjectUpdateWithoutMessagesInputSchema';
import { ProjectUncheckedUpdateWithoutMessagesInputSchema } from './ProjectUncheckedUpdateWithoutMessagesInputSchema';

export const ProjectUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => ProjectUpdateWithoutMessagesInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export default ProjectUpdateOneWithoutMessagesNestedInputSchema;
