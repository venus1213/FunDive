import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { PaymentMethodSchema } from './PaymentMethodSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { TransactionUncheckedCreateNestedManyWithoutPaymentInputSchema } from './TransactionUncheckedCreateNestedManyWithoutPaymentInputSchema';

export const PaymentUncheckedCreateInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  stripePaymentId: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutPaymentInputSchema).optional()
}).strict();

export default PaymentUncheckedCreateInputSchema;
