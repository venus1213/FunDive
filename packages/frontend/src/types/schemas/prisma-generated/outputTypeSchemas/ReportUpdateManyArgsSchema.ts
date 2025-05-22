import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportUpdateManyMutationInputSchema } from '../inputTypeSchemas/ReportUpdateManyMutationInputSchema'
import { ReportUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ReportUncheckedUpdateManyInputSchema'
import { ReportWhereInputSchema } from '../inputTypeSchemas/ReportWhereInputSchema'

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ReportUpdateManyArgsSchema;
