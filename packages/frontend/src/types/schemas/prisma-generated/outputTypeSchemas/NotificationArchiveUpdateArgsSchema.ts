import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveIncludeSchema } from '../inputTypeSchemas/NotificationArchiveIncludeSchema'
import { NotificationArchiveUpdateInputSchema } from '../inputTypeSchemas/NotificationArchiveUpdateInputSchema'
import { NotificationArchiveUncheckedUpdateInputSchema } from '../inputTypeSchemas/NotificationArchiveUncheckedUpdateInputSchema'
import { NotificationArchiveWhereUniqueInputSchema } from '../inputTypeSchemas/NotificationArchiveWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NotificationArchiveSelectSchema: z.ZodType<Prisma.NotificationArchiveSelect> = z.object({
  id: z.boolean().optional(),
  originalId: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  isRead: z.boolean().optional(),
  relatedId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  archivedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const NotificationArchiveUpdateArgsSchema: z.ZodType<Prisma.NotificationArchiveUpdateArgs> = z.object({
  select: NotificationArchiveSelectSchema.optional(),
  include: z.lazy(() => NotificationArchiveIncludeSchema).optional(),
  data: z.union([ NotificationArchiveUpdateInputSchema,NotificationArchiveUncheckedUpdateInputSchema ]),
  where: NotificationArchiveWhereUniqueInputSchema,
}).strict() ;

export default NotificationArchiveUpdateArgsSchema;
