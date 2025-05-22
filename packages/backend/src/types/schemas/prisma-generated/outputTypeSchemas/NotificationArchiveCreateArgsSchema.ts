import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationArchiveIncludeSchema } from '../inputTypeSchemas/NotificationArchiveIncludeSchema'
import { NotificationArchiveCreateInputSchema } from '../inputTypeSchemas/NotificationArchiveCreateInputSchema'
import { NotificationArchiveUncheckedCreateInputSchema } from '../inputTypeSchemas/NotificationArchiveUncheckedCreateInputSchema'
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

export const NotificationArchiveCreateArgsSchema: z.ZodType<Prisma.NotificationArchiveCreateArgs> = z.object({
  select: NotificationArchiveSelectSchema.optional(),
  include: z.lazy(() => NotificationArchiveIncludeSchema).optional(),
  data: z.union([ NotificationArchiveCreateInputSchema,NotificationArchiveUncheckedCreateInputSchema ]),
}).strict() ;

export default NotificationArchiveCreateArgsSchema;
