import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionTypeSchema } from './TransactionTypeSchema';
import { TransactionStatusSchema } from './TransactionStatusSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const TransactionCreateWithoutPaymentInputSchema: z.ZodType<Prisma.TransactionCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  amount: z.number(),
  status: z.lazy(() => TransactionStatusSchema),
  stripeTransactionId: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default TransactionCreateWithoutPaymentInputSchema;
