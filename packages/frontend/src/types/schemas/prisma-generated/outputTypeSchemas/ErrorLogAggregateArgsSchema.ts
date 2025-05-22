import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogWhereInputSchema } from '../inputTypeSchemas/ErrorLogWhereInputSchema'
import { ErrorLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/ErrorLogOrderByWithRelationInputSchema'
import { ErrorLogWhereUniqueInputSchema } from '../inputTypeSchemas/ErrorLogWhereUniqueInputSchema'

export const ErrorLogAggregateArgsSchema: z.ZodType<Prisma.ErrorLogAggregateArgs> = z.object({
  where: ErrorLogWhereInputSchema.optional(),
  orderBy: z.union([ ErrorLogOrderByWithRelationInputSchema.array(),ErrorLogOrderByWithRelationInputSchema ]).optional(),
  cursor: ErrorLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ErrorLogAggregateArgsSchema;
