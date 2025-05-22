import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActivityLogCreateWithoutUserInputSchema } from './ActivityLogCreateWithoutUserInputSchema';
import { ActivityLogUncheckedCreateWithoutUserInputSchema } from './ActivityLogUncheckedCreateWithoutUserInputSchema';
import { ActivityLogCreateOrConnectWithoutUserInputSchema } from './ActivityLogCreateOrConnectWithoutUserInputSchema';
import { ActivityLogCreateManyUserInputEnvelopeSchema } from './ActivityLogCreateManyUserInputEnvelopeSchema';
import { ActivityLogWhereUniqueInputSchema } from './ActivityLogWhereUniqueInputSchema';

export const ActivityLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ActivityLogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ActivityLogCreateWithoutUserInputSchema),z.lazy(() => ActivityLogCreateWithoutUserInputSchema).array(),z.lazy(() => ActivityLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => ActivityLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActivityLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => ActivityLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActivityLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ActivityLogWhereUniqueInputSchema),z.lazy(() => ActivityLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ActivityLogCreateNestedManyWithoutUserInputSchema;
