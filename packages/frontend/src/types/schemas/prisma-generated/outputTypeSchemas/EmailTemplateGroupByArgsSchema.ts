import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateWhereInputSchema } from '../inputTypeSchemas/EmailTemplateWhereInputSchema'
import { EmailTemplateOrderByWithAggregationInputSchema } from '../inputTypeSchemas/EmailTemplateOrderByWithAggregationInputSchema'
import { EmailTemplateScalarFieldEnumSchema } from '../inputTypeSchemas/EmailTemplateScalarFieldEnumSchema'
import { EmailTemplateScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/EmailTemplateScalarWhereWithAggregatesInputSchema'

export const EmailTemplateGroupByArgsSchema: z.ZodType<Prisma.EmailTemplateGroupByArgs> = z.object({
  where: EmailTemplateWhereInputSchema.optional(),
  orderBy: z.union([ EmailTemplateOrderByWithAggregationInputSchema.array(),EmailTemplateOrderByWithAggregationInputSchema ]).optional(),
  by: EmailTemplateScalarFieldEnumSchema.array(),
  having: EmailTemplateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailTemplateGroupByArgsSchema;
