import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentArgsSchema } from "../outputTypeSchemas/PaymentArgsSchema"

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  paymentId: z.boolean().optional(),
  type: z.boolean().optional(),
  amount: z.boolean().optional(),
  status: z.boolean().optional(),
  stripeTransactionId: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
}).strict()

export default TransactionSelectSchema;
