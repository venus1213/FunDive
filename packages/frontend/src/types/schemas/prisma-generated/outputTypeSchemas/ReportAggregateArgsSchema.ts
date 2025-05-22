import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportWhereInputSchema } from '../inputTypeSchemas/ReportWhereInputSchema'
import { ReportOrderByWithRelationInputSchema } from '../inputTypeSchemas/ReportOrderByWithRelationInputSchema'
import { ReportWhereUniqueInputSchema } from '../inputTypeSchemas/ReportWhereUniqueInputSchema'

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ReportAggregateArgsSchema;
