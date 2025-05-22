import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TransactionFindManyArgsSchema } from "../outputTypeSchemas/TransactionFindManyArgsSchema"
import { PaymentCountOutputTypeArgsSchema } from "../outputTypeSchemas/PaymentCountOutputTypeArgsSchema"

export const PaymentIncludeSchema: z.ZodType<Prisma.PaymentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PaymentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default PaymentIncludeSchema;
