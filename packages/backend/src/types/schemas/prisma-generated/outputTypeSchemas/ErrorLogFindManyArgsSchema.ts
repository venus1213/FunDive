import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ErrorLogIncludeSchema } from '../inputTypeSchemas/ErrorLogIncludeSchema'
import { ErrorLogWhereInputSchema } from '../inputTypeSchemas/ErrorLogWhereInputSchema'
import { ErrorLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/ErrorLogOrderByWithRelationInputSchema'
import { ErrorLogWhereUniqueInputSchema } from '../inputTypeSchemas/ErrorLogWhereUniqueInputSchema'
import { ErrorLogScalarFieldEnumSchema } from '../inputTypeSchemas/ErrorLogScalarFieldEnumSchema'
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

export const ErrorLogFindManyArgsSchema: z.ZodType<Prisma.ErrorLogFindManyArgs> = z.object({
  select: ErrorLogSelectSchema.optional(),
  include: z.lazy(() => ErrorLogIncludeSchema).optional(),
  where: ErrorLogWhereInputSchema.optional(),
  orderBy: z.union([ ErrorLogOrderByWithRelationInputSchema.array(),ErrorLogOrderByWithRelationInputSchema ]).optional(),
  cursor: ErrorLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ErrorLogScalarFieldEnumSchema,ErrorLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ErrorLogFindManyArgsSchema;
