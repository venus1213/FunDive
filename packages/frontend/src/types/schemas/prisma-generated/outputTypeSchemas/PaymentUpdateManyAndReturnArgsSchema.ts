import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentUpdateManyMutationInputSchema } from '../inputTypeSchemas/PaymentUpdateManyMutationInputSchema'
import { PaymentUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PaymentUncheckedUpdateManyInputSchema'
import { PaymentWhereInputSchema } from '../inputTypeSchemas/PaymentWhereInputSchema'

export const PaymentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PaymentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PaymentUpdateManyMutationInputSchema,PaymentUncheckedUpdateManyInputSchema ]),
  where: PaymentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default PaymentUpdateManyAndReturnArgsSchema;
