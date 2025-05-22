import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EmailABTestIncludeSchema } from '../inputTypeSchemas/EmailABTestIncludeSchema'
import { EmailABTestWhereUniqueInputSchema } from '../inputTypeSchemas/EmailABTestWhereUniqueInputSchema'
import { EmailTemplateArgsSchema } from "../outputTypeSchemas/EmailTemplateArgsSchema"
import { EmailABTestResultFindManyArgsSchema } from "../outputTypeSchemas/EmailABTestResultFindManyArgsSchema"
import { EmailABTestCountOutputTypeArgsSchema } from "../outputTypeSchemas/EmailABTestCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EmailABTestSelectSchema: z.ZodType<Prisma.EmailABTestSelect> = z.object({
  id: z.boolean().optional(),
  templateId: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  variantA: z.boolean().optional(),
  variantB: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  status: z.boolean().optional(),
  winningVariant: z.boolean().optional(),
  metrics: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => EmailTemplateArgsSchema)]).optional(),
  testResults: z.union([z.boolean(),z.lazy(() => EmailABTestResultFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailABTestCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EmailABTestDeleteArgsSchema: z.ZodType<Prisma.EmailABTestDeleteArgs> = z.object({
  select: EmailABTestSelectSchema.optional(),
  include: z.lazy(() => EmailABTestIncludeSchema).optional(),
  where: EmailABTestWhereUniqueInputSchema,
}).strict() ;

export default EmailABTestDeleteArgsSchema;
