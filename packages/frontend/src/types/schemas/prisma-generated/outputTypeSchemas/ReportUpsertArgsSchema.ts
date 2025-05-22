import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ReportIncludeSchema } from '../inputTypeSchemas/ReportIncludeSchema'
import { ReportWhereUniqueInputSchema } from '../inputTypeSchemas/ReportWhereUniqueInputSchema'
import { ReportCreateInputSchema } from '../inputTypeSchemas/ReportCreateInputSchema'
import { ReportUncheckedCreateInputSchema } from '../inputTypeSchemas/ReportUncheckedCreateInputSchema'
import { ReportUpdateInputSchema } from '../inputTypeSchemas/ReportUpdateInputSchema'
import { ReportUncheckedUpdateInputSchema } from '../inputTypeSchemas/ReportUncheckedUpdateInputSchema'
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

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() ;

export default ReportUpsertArgsSchema;
