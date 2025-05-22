import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportWhereInputSchema } from '../inputTypeSchemas/ReportWhereInputSchema'

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ReportDeleteManyArgsSchema;
