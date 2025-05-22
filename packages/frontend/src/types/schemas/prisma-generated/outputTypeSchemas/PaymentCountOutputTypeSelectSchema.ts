import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const PaymentCountOutputTypeSelectSchema: z.ZodType<Prisma.PaymentCountOutputTypeSelect> = z.object({
  transactions: z.boolean().optional(),
}).strict();

export default PaymentCountOutputTypeSelectSchema;
