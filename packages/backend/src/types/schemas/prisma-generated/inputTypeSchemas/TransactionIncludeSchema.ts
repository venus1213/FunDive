import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentArgsSchema } from "../outputTypeSchemas/PaymentArgsSchema"

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
}).strict()

export default TransactionIncludeSchema;
