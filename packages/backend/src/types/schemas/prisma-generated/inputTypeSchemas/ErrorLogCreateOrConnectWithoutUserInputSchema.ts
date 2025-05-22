import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogWhereUniqueInputSchema } from './ErrorLogWhereUniqueInputSchema';
import { ErrorLogCreateWithoutUserInputSchema } from './ErrorLogCreateWithoutUserInputSchema';
import { ErrorLogUncheckedCreateWithoutUserInputSchema } from './ErrorLogUncheckedCreateWithoutUserInputSchema';

export const ErrorLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ErrorLogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ErrorLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ErrorLogCreateWithoutUserInputSchema),z.lazy(() => ErrorLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ErrorLogCreateOrConnectWithoutUserInputSchema;
