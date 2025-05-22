import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogIncludeSchema } from '../inputTypeSchemas/ErrorLogIncludeSchema'
import { ErrorLogCreateInputSchema } from '../inputTypeSchemas/ErrorLogCreateInputSchema'
import { ErrorLogUncheckedCreateInputSchema } from '../inputTypeSchemas/ErrorLogUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ErrorLogSelectSchema: z.ZodType<Prisma.ErrorLogSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  error: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ErrorLogCreateArgsSchema: z.ZodType<Prisma.ErrorLogCreateArgs> = z.object({
  select: ErrorLogSelectSchema.optional(),
  include: z.lazy(() => ErrorLogIncludeSchema).optional(),
  data: z.union([ ErrorLogCreateInputSchema,ErrorLogUncheckedCreateInputSchema ]),
}).strict() ;

export default ErrorLogCreateArgsSchema;
