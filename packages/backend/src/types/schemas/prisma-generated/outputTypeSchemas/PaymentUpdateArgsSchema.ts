import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentIncludeSchema } from '../inputTypeSchemas/PaymentIncludeSchema'
import { PaymentUpdateInputSchema } from '../inputTypeSchemas/PaymentUpdateInputSchema'
import { PaymentUncheckedUpdateInputSchema } from '../inputTypeSchemas/PaymentUncheckedUpdateInputSchema'
import { PaymentWhereUniqueInputSchema } from '../inputTypeSchemas/PaymentWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TransactionFindManyArgsSchema } from "../outputTypeSchemas/TransactionFindManyArgsSchema"
import { PaymentCountOutputTypeArgsSchema } from "../outputTypeSchemas/PaymentCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PaymentSelectSchema: z.ZodType<Prisma.PaymentSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  amount: z.boolean().optional(),
  currency: z.boolean().optional(),
  status: z.boolean().optional(),
  paymentMethod: z.boolean().optional(),
  stripePaymentId: z.boolean().optional(),
  description: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PaymentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PaymentUpdateArgsSchema: z.ZodType<Prisma.PaymentUpdateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: z.lazy(() => PaymentIncludeSchema).optional(),
  data: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export default PaymentUpdateArgsSchema;
