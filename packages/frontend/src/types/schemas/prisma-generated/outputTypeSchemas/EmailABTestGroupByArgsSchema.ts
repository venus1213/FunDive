import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestWhereInputSchema } from '../inputTypeSchemas/EmailABTestWhereInputSchema'
import { EmailABTestOrderByWithAggregationInputSchema } from '../inputTypeSchemas/EmailABTestOrderByWithAggregationInputSchema'
import { EmailABTestScalarFieldEnumSchema } from '../inputTypeSchemas/EmailABTestScalarFieldEnumSchema'
import { EmailABTestScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/EmailABTestScalarWhereWithAggregatesInputSchema'

export const EmailABTestGroupByArgsSchema: z.ZodType<Prisma.EmailABTestGroupByArgs> = z.object({
  where: EmailABTestWhereInputSchema.optional(),
  orderBy: z.union([ EmailABTestOrderByWithAggregationInputSchema.array(),EmailABTestOrderByWithAggregationInputSchema ]).optional(),
  by: EmailABTestScalarFieldEnumSchema.array(),
  having: EmailABTestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailABTestGroupByArgsSchema;
