import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereInputSchema } from '../inputTypeSchemas/PaymentWhereInputSchema'

export const PaymentDeleteManyArgsSchema: z.ZodType<Prisma.PaymentDeleteManyArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
}).strict() ;

export default PaymentDeleteManyArgsSchema;
