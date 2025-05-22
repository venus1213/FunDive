import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportCreateManyInputSchema } from '../inputTypeSchemas/ReportCreateManyInputSchema'

export const ReportCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReportCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ReportCreateManyAndReturnArgsSchema;
