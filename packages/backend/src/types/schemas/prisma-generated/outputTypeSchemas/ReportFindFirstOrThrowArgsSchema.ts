import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportIncludeSchema } from '../inputTypeSchemas/ReportIncludeSchema'
import { ReportWhereInputSchema } from '../inputTypeSchemas/ReportWhereInputSchema'
import { ReportOrderByWithRelationInputSchema } from '../inputTypeSchemas/ReportOrderByWithRelationInputSchema'
import { ReportWhereUniqueInputSchema } from '../inputTypeSchemas/ReportWhereUniqueInputSchema'
import { ReportScalarFieldEnumSchema } from '../inputTypeSchemas/ReportScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProjectArgsSchema } from "../outputTypeSchemas/ProjectArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  reporterId: z.boolean().optional(),
  targetType: z.boolean().optional(),
  targetId: z.boolean().optional(),
  reason: z.boolean().optional(),
  status: z.boolean().optional(),
  comment: z.boolean().optional(),
  adminComment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  reporter: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ReportFindFirstOrThrowArgsSchema;
