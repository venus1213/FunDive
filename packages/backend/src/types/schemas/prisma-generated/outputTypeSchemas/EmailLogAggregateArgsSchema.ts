import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailLogWhereInputSchema } from '../inputTypeSchemas/EmailLogWhereInputSchema'
import { EmailLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailLogOrderByWithRelationInputSchema'
import { EmailLogWhereUniqueInputSchema } from '../inputTypeSchemas/EmailLogWhereUniqueInputSchema'

export const EmailLogAggregateArgsSchema: z.ZodType<Prisma.EmailLogAggregateArgs> = z.object({
  where: EmailLogWhereInputSchema.optional(),
  orderBy: z.union([ EmailLogOrderByWithRelationInputSchema.array(),EmailLogOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailLogAggregateArgsSchema;
