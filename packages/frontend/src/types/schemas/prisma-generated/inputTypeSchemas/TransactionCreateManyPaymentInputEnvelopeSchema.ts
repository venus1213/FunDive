import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionCreateManyPaymentInputSchema } from './TransactionCreateManyPaymentInputSchema';

export const TransactionCreateManyPaymentInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyPaymentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyPaymentInputSchema),z.lazy(() => TransactionCreateManyPaymentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TransactionCreateManyPaymentInputEnvelopeSchema;
