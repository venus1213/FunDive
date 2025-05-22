import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/ErrorLogUpdateManyMutationInputSchema'
import { ErrorLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ErrorLogUncheckedUpdateManyInputSchema'
import { ErrorLogWhereInputSchema } from '../inputTypeSchemas/ErrorLogWhereInputSchema'

export const ErrorLogUpdateManyArgsSchema: z.ZodType<Prisma.ErrorLogUpdateManyArgs> = z.object({
  data: z.union([ ErrorLogUpdateManyMutationInputSchema,ErrorLogUncheckedUpdateManyInputSchema ]),
  where: ErrorLogWhereInputSchema.optional(),
}).strict() ;

export default ErrorLogUpdateManyArgsSchema;
