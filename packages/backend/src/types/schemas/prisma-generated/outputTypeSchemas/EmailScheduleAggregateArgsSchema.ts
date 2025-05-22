import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailScheduleWhereInputSchema } from '../inputTypeSchemas/EmailScheduleWhereInputSchema'
import { EmailScheduleOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailScheduleOrderByWithRelationInputSchema'
import { EmailScheduleWhereUniqueInputSchema } from '../inputTypeSchemas/EmailScheduleWhereUniqueInputSchema'

export const EmailScheduleAggregateArgsSchema: z.ZodType<Prisma.EmailScheduleAggregateArgs> = z.object({
  where: EmailScheduleWhereInputSchema.optional(),
  orderBy: z.union([ EmailScheduleOrderByWithRelationInputSchema.array(),EmailScheduleOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailScheduleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailScheduleAggregateArgsSchema;
