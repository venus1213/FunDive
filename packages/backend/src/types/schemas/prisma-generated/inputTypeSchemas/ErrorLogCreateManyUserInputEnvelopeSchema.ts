import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ErrorLogCreateManyUserInputSchema } from './ErrorLogCreateManyUserInputSchema';

export const ErrorLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ErrorLogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ErrorLogCreateManyUserInputSchema),z.lazy(() => ErrorLogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ErrorLogCreateManyUserInputEnvelopeSchema;
