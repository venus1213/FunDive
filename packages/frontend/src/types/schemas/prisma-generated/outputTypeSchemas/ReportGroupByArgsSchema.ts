import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportWhereInputSchema } from '../inputTypeSchemas/ReportWhereInputSchema'
import { ReportOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ReportOrderByWithAggregationInputSchema'
import { ReportScalarFieldEnumSchema } from '../inputTypeSchemas/ReportScalarFieldEnumSchema'
import { ReportScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ReportScalarWhereWithAggregatesInputSchema'

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ReportGroupByArgsSchema;
