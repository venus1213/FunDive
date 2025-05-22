import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestCreateManyInputSchema } from '../inputTypeSchemas/EmailABTestCreateManyInputSchema'

export const EmailABTestCreateManyArgsSchema: z.ZodType<Prisma.EmailABTestCreateManyArgs> = z.object({
  data: z.union([ EmailABTestCreateManyInputSchema,EmailABTestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailABTestCreateManyArgsSchema;
