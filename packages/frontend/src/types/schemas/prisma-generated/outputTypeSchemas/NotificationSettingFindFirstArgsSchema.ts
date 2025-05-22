import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationSettingIncludeSchema } from '../inputTypeSchemas/NotificationSettingIncludeSchema'
import { NotificationSettingWhereInputSchema } from '../inputTypeSchemas/NotificationSettingWhereInputSchema'
import { NotificationSettingOrderByWithRelationInputSchema } from '../inputTypeSchemas/NotificationSettingOrderByWithRelationInputSchema'
import { NotificationSettingWhereUniqueInputSchema } from '../inputTypeSchemas/NotificationSettingWhereUniqueInputSchema'
import { NotificationSettingScalarFieldEnumSchema } from '../inputTypeSchemas/NotificationSettingScalarFieldEnumSchema'
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

export const NotificationSettingFindFirstArgsSchema: z.ZodType<Prisma.NotificationSettingFindFirstArgs> = z.object({
  select: NotificationSettingSelectSchema.optional(),
  include: z.lazy(() => NotificationSettingIncludeSchema).optional(),
  where: NotificationSettingWhereInputSchema.optional(),
  orderBy: z.union([ NotificationSettingOrderByWithRelationInputSchema.array(),NotificationSettingOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationSettingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationSettingScalarFieldEnumSchema,NotificationSettingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default NotificationSettingFindFirstArgsSchema;
