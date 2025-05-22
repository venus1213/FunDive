import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleWhereInputSchema } from '../inputTypeSchemas/EmailScheduleWhereInputSchema'
import { EmailScheduleOrderByWithAggregationInputSchema } from '../inputTypeSchemas/EmailScheduleOrderByWithAggregationInputSchema'
import { EmailScheduleScalarFieldEnumSchema } from '../inputTypeSchemas/EmailScheduleScalarFieldEnumSchema'
import { EmailScheduleScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/EmailScheduleScalarWhereWithAggregatesInputSchema'

export const EmailScheduleGroupByArgsSchema: z.ZodType<Prisma.EmailScheduleGroupByArgs> = z.object({
  where: EmailScheduleWhereInputSchema.optional(),
  orderBy: z.union([ EmailScheduleOrderByWithAggregationInputSchema.array(),EmailScheduleOrderByWithAggregationInputSchema ]).optional(),
  by: EmailScheduleScalarFieldEnumSchema.array(),
  having: EmailScheduleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailScheduleGroupByArgsSchema;
