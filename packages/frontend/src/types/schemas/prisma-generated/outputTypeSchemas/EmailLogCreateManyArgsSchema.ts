import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogCreateManyInputSchema } from '../inputTypeSchemas/EmailLogCreateManyInputSchema'

export const EmailLogCreateManyArgsSchema: z.ZodType<Prisma.EmailLogCreateManyArgs> = z.object({
  data: z.union([ EmailLogCreateManyInputSchema,EmailLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailLogCreateManyArgsSchema;
