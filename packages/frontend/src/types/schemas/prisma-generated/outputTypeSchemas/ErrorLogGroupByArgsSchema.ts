import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogWhereInputSchema } from '../inputTypeSchemas/ErrorLogWhereInputSchema'
import { ErrorLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ErrorLogOrderByWithAggregationInputSchema'
import { ErrorLogScalarFieldEnumSchema } from '../inputTypeSchemas/ErrorLogScalarFieldEnumSchema'
import { ErrorLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ErrorLogScalarWhereWithAggregatesInputSchema'

export const ErrorLogGroupByArgsSchema: z.ZodType<Prisma.ErrorLogGroupByArgs> = z.object({
  where: ErrorLogWhereInputSchema.optional(),
  orderBy: z.union([ ErrorLogOrderByWithAggregationInputSchema.array(),ErrorLogOrderByWithAggregationInputSchema ]).optional(),
  by: ErrorLogScalarFieldEnumSchema.array(),
  having: ErrorLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ErrorLogGroupByArgsSchema;
