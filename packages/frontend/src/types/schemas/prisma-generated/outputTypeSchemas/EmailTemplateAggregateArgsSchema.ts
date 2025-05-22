import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailTemplateWhereInputSchema } from '../inputTypeSchemas/EmailTemplateWhereInputSchema'
import { EmailTemplateOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailTemplateOrderByWithRelationInputSchema'
import { EmailTemplateWhereUniqueInputSchema } from '../inputTypeSchemas/EmailTemplateWhereUniqueInputSchema'

export const EmailTemplateAggregateArgsSchema: z.ZodType<Prisma.EmailTemplateAggregateArgs> = z.object({
  where: EmailTemplateWhereInputSchema.optional(),
  orderBy: z.union([ EmailTemplateOrderByWithRelationInputSchema.array(),EmailTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailTemplateAggregateArgsSchema;
