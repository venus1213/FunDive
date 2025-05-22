import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/ErrorLogUpdateManyMutationInputSchema'
import { ErrorLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ErrorLogUncheckedUpdateManyInputSchema'
import { ErrorLogWhereInputSchema } from '../inputTypeSchemas/ErrorLogWhereInputSchema'

export const ErrorLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ErrorLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ErrorLogUpdateManyMutationInputSchema,ErrorLogUncheckedUpdateManyInputSchema ]),
  where: ErrorLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ErrorLogUpdateManyAndReturnArgsSchema;
