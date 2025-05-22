import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultUpdateManyMutationInputSchema } from '../inputTypeSchemas/EmailABTestResultUpdateManyMutationInputSchema'
import { EmailABTestResultUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/EmailABTestResultUncheckedUpdateManyInputSchema'
import { EmailABTestResultWhereInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereInputSchema'

export const EmailABTestResultUpdateManyArgsSchema: z.ZodType<Prisma.EmailABTestResultUpdateManyArgs> = z.object({
  data: z.union([ EmailABTestResultUpdateManyMutationInputSchema,EmailABTestResultUncheckedUpdateManyInputSchema ]),
  where: EmailABTestResultWhereInputSchema.optional(),
}).strict() ;

export default EmailABTestResultUpdateManyArgsSchema;
