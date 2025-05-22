import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TransactionIncludeSchema } from '../inputTypeSchemas/TransactionIncludeSchema'
import { TransactionWhereInputSchema } from '../inputTypeSchemas/TransactionWhereInputSchema'
import { TransactionOrderByWithRelationInputSchema } from '../inputTypeSchemas/TransactionOrderByWithRelationInputSchema'
import { TransactionWhereUniqueInputSchema } from '../inputTypeSchemas/TransactionWhereUniqueInputSchema'
import { TransactionScalarFieldEnumSchema } from '../inputTypeSchemas/TransactionScalarFieldEnumSchema'
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

export const TransactionFindManyArgsSchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default TransactionFindManyArgsSchema;
