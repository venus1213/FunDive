import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailABTestResultUpdateManyMutationInputSchema'
import { EmailABTestResultUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailABTestResultUncheckedUpdateManyInputSchema'
import { EmailABTestResultWhereInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereInputSchema'

export const EmailABTestResultUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailABTestResultUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EmailABTestResultUpdateManyMutationInputSchema,EmailABTestResultUncheckedUpdateManyInputSchema ]),
  where: EmailABTestResultWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default EmailABTestResultUpdateManyAndReturnArgsSchema;
