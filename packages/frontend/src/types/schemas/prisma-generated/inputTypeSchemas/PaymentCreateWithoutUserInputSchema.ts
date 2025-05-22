import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { PaymentMethodSchema } from './PaymentMethodSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { TransactionCreateNestedManyWithoutPaymentInputSchema } from './TransactionCreateNestedManyWithoutPaymentInputSchema';

export const PaymentCreateWithoutUserInputSchema: z.ZodType<Prisma.PaymentCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusSchema),
  paymentMethod: z.lazy(() => PaymentMethodSchema),
  stripePaymentId: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutPaymentInputSchema).optional()
}).strict();

export default PaymentCreateWithoutUserInputSchema;
