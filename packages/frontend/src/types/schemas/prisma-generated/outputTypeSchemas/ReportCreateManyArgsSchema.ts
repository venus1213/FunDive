import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportCreateManyInputSchema } from '../inputTypeSchemas/ReportCreateManyInputSchema'

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ReportCreateManyArgsSchema;
