import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationIncludeSchema } from '../inputTypeSchemas/NotificationIncludeSchema'
import { NotificationUpdateInputSchema } from '../inputTypeSchemas/NotificationUpdateInputSchema'
import { NotificationUncheckedUpdateInputSchema } from '../inputTypeSchemas/NotificationUncheckedUpdateInputSchema'
import { NotificationWhereUniqueInputSchema } from '../inputTypeSchemas/NotificationWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  isRead: z.boolean().optional(),
  relatedId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: z.lazy(() => NotificationIncludeSchema).optional(),
  data: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export default NotificationUpdateArgsSchema;
