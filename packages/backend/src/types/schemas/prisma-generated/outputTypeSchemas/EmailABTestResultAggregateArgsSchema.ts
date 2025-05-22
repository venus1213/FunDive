import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultWhereInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereInputSchema'
import { EmailABTestResultOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailABTestResultOrderByWithRelationInputSchema'
import { EmailABTestResultWhereUniqueInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereUniqueInputSchema'

export const EmailABTestResultAggregateArgsSchema: z.ZodType<Prisma.EmailABTestResultAggregateArgs> = z.object({
  where: EmailABTestResultWhereInputSchema.optional(),
  orderBy: z.union([ EmailABTestResultOrderByWithRelationInputSchema.array(),EmailABTestResultOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailABTestResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default EmailABTestResultAggregateArgsSchema;
