import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentWhereInputSchema } from './PaymentWhereInputSchema';

export const PaymentRelationFilterSchema: z.ZodType<Prisma.PaymentRelationFilter> = z.object({
  is: z.lazy(() => PaymentWhereInputSchema).optional(),
  isNot: z.lazy(() => PaymentWhereInputSchema).optional()
}).strict();

export default PaymentRelationFilterSchema;
