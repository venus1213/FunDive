import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogWhereInputSchema } from '../inputTypeSchemas/EmailLogWhereInputSchema'
import { EmailLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/EmailLogOrderByWithAggregationInputSchema'
import { EmailLogScalarFieldEnumSchema } from '../inputTypeSchemas/EmailLogScalarFieldEnumSchema'
import { EmailLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/EmailLogScalarWhereWithAggregatesInputSchema'

export const EmailLogGroupByArgsSchema: z.ZodType<Prisma.EmailLogGroupByArgs> = z.object({
  where: EmailLogWhereInputSchema.optional(),
  orderBy: z.union([ EmailLogOrderByWithAggregationInputSchema.array(),EmailLogOrderByWithAggregationInputSchema ]).optional(),
  by: EmailLogScalarFieldEnumSchema.array(),
  having: EmailLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailLogGroupByArgsSchema;
