import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestResultIncludeSchema } from '../inputTypeSchemas/EmailABTestResultIncludeSchema'
import { EmailABTestResultWhereUniqueInputSchema } from '../inputTypeSchemas/EmailABTestResultWhereUniqueInputSchema'
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

export const EmailABTestResultDeleteArgsSchema: z.ZodType<Prisma.EmailABTestResultDeleteArgs> = z.object({
  select: EmailABTestResultSelectSchema.optional(),
  include: z.lazy(() => EmailABTestResultIncludeSchema).optional(),
  where: EmailABTestResultWhereUniqueInputSchema,
}).strict() ;

export default EmailABTestResultDeleteArgsSchema;
