import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogIncludeSchema } from '../inputTypeSchemas/ErrorLogIncludeSchema'
import { ErrorLogWhereUniqueInputSchema } from '../inputTypeSchemas/ErrorLogWhereUniqueInputSchema'
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

export const ErrorLogFindUniqueArgsSchema: z.ZodType<Prisma.ErrorLogFindUniqueArgs> = z.object({
  select: ErrorLogSelectSchema.optional(),
  include: z.lazy(() => ErrorLogIncludeSchema).optional(),
  where: ErrorLogWhereUniqueInputSchema,
}).strict() ;

export default ErrorLogFindUniqueArgsSchema;
