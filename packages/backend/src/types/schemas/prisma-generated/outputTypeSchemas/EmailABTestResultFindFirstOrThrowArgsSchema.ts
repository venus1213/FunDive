import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultIncludeSchema } from '../inputTypeSchemas/EmailABTestResultIncludeSchema'
import { EmailABTestResultWhereInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereInputSchema'
import { EmailABTestResultOrderByWithRelationInputSchema } from '../inputTypeSchemas/EmailABTestResultOrderByWithRelationInputSchema'
import { EmailABTestResultWhereUniqueInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereUniqueInputSchema'
import { EmailABTestResultScalarFieldEnumSchema } from '../inputTypeSchemas/EmailABTestResultScalarFieldEnumSchema'
import { EmailABTestArgsSchema } from "../outputTypeSchemas/EmailABTestArgsSchema"
import { EmailLogArgsSchema } from "../outputTypeSchemas/EmailLogArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EmailABTestResultSelectSchema: z.ZodType<Prisma.EmailABTestResultSelect> = z.object({
  id: z.boolean().optional(),
  testId: z.boolean().optional(),
  variant: z.boolean().optional(),
  emailId: z.boolean().optional(),
  opened: z.boolean().optional(),
  clicked: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  test: z.union([z.boolean(),z.lazy(() => EmailABTestArgsSchema)]).optional(),
  email: z.union([z.boolean(),z.lazy(() => EmailLogArgsSchema)]).optional(),
}).strict()

export const EmailABTestResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmailABTestResultFindFirstOrThrowArgs> = z.object({
  select: EmailABTestResultSelectSchema.optional(),
  include: z.lazy(() => EmailABTestResultIncludeSchema).optional(),
  where: EmailABTestResultWhereInputSchema.optional(),
  orderBy: z.union([ EmailABTestResultOrderByWithRelationInputSchema.array(),EmailABTestResultOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailABTestResultWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailABTestResultScalarFieldEnumSchema,EmailABTestResultScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default EmailABTestResultFindFirstOrThrowArgsSchema;
