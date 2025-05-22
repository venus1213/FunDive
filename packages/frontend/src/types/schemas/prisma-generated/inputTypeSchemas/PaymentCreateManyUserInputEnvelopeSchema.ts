import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentCreateManyUserInputSchema } from './PaymentCreateManyUserInputSchema';

export const PaymentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PaymentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PaymentCreateManyUserInputSchema),z.lazy(() => PaymentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default PaymentCreateManyUserInputEnvelopeSchema;
