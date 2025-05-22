import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutUserInputSchema } from './ProjectCreateWithoutUserInputSchema';
import { ProjectUncheckedCreateWithoutUserInputSchema } from './ProjectUncheckedCreateWithoutUserInputSchema';
import { ProjectCreateOrConnectWithoutUserInputSchema } from './ProjectCreateOrConnectWithoutUserInputSchema';
import { ProjectCreateManyUserInputEnvelopeSchema } from './ProjectCreateManyUserInputEnvelopeSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';

export const ProjectCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ProjectCreateNestedManyWithoutUserInputSchema;
