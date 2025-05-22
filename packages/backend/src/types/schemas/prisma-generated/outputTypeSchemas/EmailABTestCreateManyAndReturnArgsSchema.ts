import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestCreateManyInputSchema } from '../inputTypeSchemas/EmailABTestCreateManyInputSchema'

export const EmailABTestCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailABTestCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailABTestCreateManyInputSchema,EmailABTestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailABTestCreateManyAndReturnArgsSchema;
