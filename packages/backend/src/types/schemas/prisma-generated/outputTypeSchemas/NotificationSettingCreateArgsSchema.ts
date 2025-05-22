import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingIncludeSchema } from '../inputTypeSchemas/NotificationSettingIncludeSchema'
import { NotificationSettingCreateInputSchema } from '../inputTypeSchemas/NotificationSettingCreateInputSchema'
import { NotificationSettingUncheckedCreateInputSchema } from '../inputTypeSchemas/NotificationSettingUncheckedCreateInputSchema'
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

export const NotificationSettingCreateArgsSchema: z.ZodType<Prisma.NotificationSettingCreateArgs> = z.object({
  select: NotificationSettingSelectSchema.optional(),
  include: z.lazy(() => NotificationSettingIncludeSchema).optional(),
  data: z.union([ NotificationSettingCreateInputSchema,NotificationSettingUncheckedCreateInputSchema ]),
}).strict() ;

export default NotificationSettingCreateArgsSchema;
