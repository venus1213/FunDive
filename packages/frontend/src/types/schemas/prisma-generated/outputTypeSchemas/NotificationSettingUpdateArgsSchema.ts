import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingIncludeSchema } from '../inputTypeSchemas/NotificationSettingIncludeSchema'
import { NotificationSettingUpdateInputSchema } from '../inputTypeSchemas/NotificationSettingUpdateInputSchema'
import { NotificationSettingUncheckedUpdateInputSchema } from '../inputTypeSchemas/NotificationSettingUncheckedUpdateInputSchema'
import { NotificationSettingWhereUniqueInputSchema } from '../inputTypeSchemas/NotificationSettingWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NotificationSettingSelectSchema: z.ZodType<Prisma.NotificationSettingSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  emailEnabled: z.boolean().optional(),
  directMessageEnabled: z.boolean().optional(),
  projectMessageEnabled: z.boolean().optional(),
  mentionEnabled: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const NotificationSettingUpdateArgsSchema: z.ZodType<Prisma.NotificationSettingUpdateArgs> = z.object({
  select: NotificationSettingSelectSchema.optional(),
  include: z.lazy(() => NotificationSettingIncludeSchema).optional(),
  data: z.union([ NotificationSettingUpdateInputSchema,NotificationSettingUncheckedUpdateInputSchema ]),
  where: NotificationSettingWhereUniqueInputSchema,
}).strict() ;

export default NotificationSettingUpdateArgsSchema;
