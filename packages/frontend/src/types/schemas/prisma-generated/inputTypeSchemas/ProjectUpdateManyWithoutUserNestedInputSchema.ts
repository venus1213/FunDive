import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateWithoutUserInputSchema } from './ProjectCreateWithoutUserInputSchema';
import { ProjectUncheckedCreateWithoutUserInputSchema } from './ProjectUncheckedCreateWithoutUserInputSchema';
import { ProjectCreateOrConnectWithoutUserInputSchema } from './ProjectCreateOrConnectWithoutUserInputSchema';
import { ProjectUpsertWithWhereUniqueWithoutUserInputSchema } from './ProjectUpsertWithWhereUniqueWithoutUserInputSchema';
import { ProjectCreateManyUserInputEnvelopeSchema } from './ProjectCreateManyUserInputEnvelopeSchema';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectUpdateWithWhereUniqueWithoutUserInputSchema } from './ProjectUpdateWithWhereUniqueWithoutUserInputSchema';
import { ProjectUpdateManyWithWhereWithoutUserInputSchema } from './ProjectUpdateManyWithWhereWithoutUserInputSchema';
import { ProjectScalarWhereInputSchema } from './ProjectScalarWhereInputSchema';

export const ProjectUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ProjectUpdateManyWithoutUserNestedInputSchema;
