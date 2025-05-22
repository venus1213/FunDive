import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumTransactionTypeFilterSchema } from './EnumTransactionTypeFilterSchema';
import { TransactionTypeSchema } from './TransactionTypeSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { EnumTransactionStatusFilterSchema } from './EnumTransactionStatusFilterSchema';
import { TransactionStatusSchema } from './TransactionStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { PaymentScalarRelationFilterSchema } from './PaymentScalarRelationFilterSchema';
import { PaymentWhereInputSchema } from './PaymentWhereInputSchema';

export const TransactionWhereInputSchema: z.ZodType<Prisma.TransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumTransactionStatusFilterSchema),z.lazy(() => TransactionStatusSchema) ]).optional(),
  stripeTransactionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  payment: z.union([ z.lazy(() => PaymentScalarRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional(),
}).strict();

export default TransactionWhereInputSchema;
