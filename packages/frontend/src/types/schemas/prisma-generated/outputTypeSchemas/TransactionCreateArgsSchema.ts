import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionIncludeSchema } from '../inputTypeSchemas/TransactionIncludeSchema'
import { TransactionCreateInputSchema } from '../inputTypeSchemas/TransactionCreateInputSchema'
import { TransactionUncheckedCreateInputSchema } from '../inputTypeSchemas/TransactionUncheckedCreateInputSchema'
import { PaymentArgsSchema } from "../outputTypeSchemas/PaymentArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const TransactionCreateArgsSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
  data: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
}).strict() ;

export default TransactionCreateArgsSchema;
