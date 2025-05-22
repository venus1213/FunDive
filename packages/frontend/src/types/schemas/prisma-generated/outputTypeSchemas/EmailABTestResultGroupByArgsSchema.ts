import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultWhereInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereInputSchema'
import { EmailABTestResultOrderByWithAggregationInputSchema } from '../inputTypeSchemas/EmailABTestResultOrderByWithAggregationInputSchema'
import { EmailABTestResultScalarFieldEnumSchema } from '../inputTypeSchemas/EmailABTestResultScalarFieldEnumSchema'
import { EmailABTestResultScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/EmailABTestResultScalarWhereWithAggregatesInputSchema'

export const EmailABTestResultGroupByArgsSchema: z.ZodType<Prisma.EmailABTestResultGroupByArgs> = z.object({
  where: EmailABTestResultWhereInputSchema.optional(),
  orderBy: z.union([ EmailABTestResultOrderByWithAggregationInputSchema.array(),EmailABTestResultOrderByWithAggregationInputSchema ]).optional(),
  by: EmailABTestResultScalarFieldEnumSchema.array(),
  having: EmailABTestResultScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailABTestResultGroupByArgsSchema;
