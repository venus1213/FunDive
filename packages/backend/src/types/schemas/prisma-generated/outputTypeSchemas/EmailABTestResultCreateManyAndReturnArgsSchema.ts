import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultCreateManyInputSchema } from '../inputTypeSchemas/EmailABTestResultCreateManyInputSchema'

export const EmailABTestResultCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailABTestResultCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailABTestResultCreateManyInputSchema,EmailABTestResultCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default EmailABTestResultCreateManyAndReturnArgsSchema;
