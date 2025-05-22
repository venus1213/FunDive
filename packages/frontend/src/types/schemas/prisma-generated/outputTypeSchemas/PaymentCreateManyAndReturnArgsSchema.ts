import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateManyInputSchema } from '../inputTypeSchemas/PaymentCreateManyInputSchema'

export const PaymentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PaymentCreateManyAndReturnArgs> = z.object({
  data: z.union([ PaymentCreateManyInputSchema,PaymentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default PaymentCreateManyAndReturnArgsSchema;
