import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestWhereInputSchema } from '../inputTypeSchemas/EmailABTestWhereInputSchema'
import { EmailABTestOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailABTestOrderByWithRelationInputSchema'
import { EmailABTestWhereUniqueInputSchema } from '../inputTypeSchemas/EmailABTestWhereUniqueInputSchema'

export const EmailABTestAggregateArgsSchema: z.ZodType<Prisma.EmailABTestAggregateArgs> = z.object({
  where: EmailABTestWhereInputSchema.optional(),
  orderBy: z.union([ EmailABTestOrderByWithRelationInputSchema.array(),EmailABTestOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailABTestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailABTestAggregateArgsSchema;
