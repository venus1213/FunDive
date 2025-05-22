import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentSelectSchema } from '../inputTypeSchemas/PaymentSelectSchema';
import { PaymentIncludeSchema } from '../inputTypeSchemas/PaymentIncludeSchema';

export const PaymentArgsSchema: z.ZodType<Prisma.PaymentDefaultArgs> = z.object({
  select: z.lazy(() => PaymentSelectSchema).optional(),
  include: z.lazy(() => PaymentIncludeSchema).optional(),
}).strict();

export default PaymentArgsSchema;
