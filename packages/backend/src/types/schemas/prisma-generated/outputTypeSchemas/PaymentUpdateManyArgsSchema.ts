import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentUpdateManyMutationInputSchema } from '../inputTypeSchemas/PaymentUpdateManyMutationInputSchema'
import { PaymentUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PaymentUncheckedUpdateManyInputSchema'
import { PaymentWhereInputSchema } from '../inputTypeSchemas/PaymentWhereInputSchema'

export const PaymentUpdateManyArgsSchema: z.ZodType<Prisma.PaymentUpdateManyArgs> = z.object({
  data: z.union([ PaymentUpdateManyMutationInputSchema,PaymentUncheckedUpdateManyInputSchema ]),
  where: PaymentWhereInputSchema.optional(),
}).strict() ;

export default PaymentUpdateManyArgsSchema;
