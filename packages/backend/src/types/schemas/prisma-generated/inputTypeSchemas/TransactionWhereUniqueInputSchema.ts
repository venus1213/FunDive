import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionWhereInputSchema } from './TransactionWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumTransactionTypeFilterSchema } from './EnumTransactionTypeFilterSchema';
import { TransactionTypeSchema } from './TransactionTypeSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { EnumTransactionStatusFilterSchema } from './EnumTransactionStatusFilterSchema';
import { TransactionStatusSchema } from './TransactionStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { PaymentRelationFilterSchema } from './PaymentRelationFilterSchema';
import { PaymentWhereInputSchema } from './PaymentWhereInputSchema';

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  paymentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumTransactionStatusFilterSchema),z.lazy(() => TransactionStatusSchema) ]).optional(),
  stripeTransactionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  payment: z.union([ z.lazy(() => PaymentRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional(),
}).strict());

export default TransactionWhereUniqueInputSchema;
