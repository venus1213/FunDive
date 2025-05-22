import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogCreateWithoutUserInputSchema } from './ErrorLogCreateWithoutUserInputSchema';
import { ErrorLogUncheckedCreateWithoutUserInputSchema } from './ErrorLogUncheckedCreateWithoutUserInputSchema';
import { ErrorLogCreateOrConnectWithoutUserInputSchema } from './ErrorLogCreateOrConnectWithoutUserInputSchema';
import { ErrorLogCreateManyUserInputEnvelopeSchema } from './ErrorLogCreateManyUserInputEnvelopeSchema';
import { ErrorLogWhereUniqueInputSchema } from './ErrorLogWhereUniqueInputSchema';

export const ErrorLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ErrorLogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ErrorLogCreateWithoutUserInputSchema),z.lazy(() => ErrorLogCreateWithoutUserInputSchema).array(),z.lazy(() => ErrorLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => ErrorLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ErrorLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => ErrorLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ErrorLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ErrorLogWhereUniqueInputSchema),z.lazy(() => ErrorLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ErrorLogCreateNestedManyWithoutUserInputSchema;
