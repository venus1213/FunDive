import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentIncludeSchema } from '../inputTypeSchemas/PaymentIncludeSchema'
import { PaymentWhereInputSchema } from '../inputTypeSchemas/PaymentWhereInputSchema'
import { PaymentOrderByWithRelationInputSchema } from '../inputTypeSchemas/PaymentOrderByWithRelationInputSchema'
import { PaymentWhereUniqueInputSchema } from '../inputTypeSchemas/PaymentWhereUniqueInputSchema'
import { PaymentScalarFieldEnumSchema } from '../inputTypeSchemas/PaymentScalarFieldEnumSchema'
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

export const PaymentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindFirstOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: z.lazy(() => PaymentIncludeSchema).optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default PaymentFindFirstOrThrowArgsSchema;
