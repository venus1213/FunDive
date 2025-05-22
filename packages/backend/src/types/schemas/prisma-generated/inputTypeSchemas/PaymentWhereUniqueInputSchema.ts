import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereInputSchema } from './PaymentWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { EnumPaymentStatusFilterSchema } from './EnumPaymentStatusFilterSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { EnumPaymentMethodFilterSchema } from './EnumPaymentMethodFilterSchema';
import { PaymentMethodSchema } from './PaymentMethodSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { TransactionListRelationFilterSchema } from './TransactionListRelationFilterSchema';

export const PaymentWhereUniqueInputSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPaymentStatusFilterSchema),z.lazy(() => PaymentStatusSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => EnumPaymentMethodFilterSchema),z.lazy(() => PaymentMethodSchema) ]).optional(),
  stripePaymentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict());

export default PaymentWhereUniqueInputSchema;
