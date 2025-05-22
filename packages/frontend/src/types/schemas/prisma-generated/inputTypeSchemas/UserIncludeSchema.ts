import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfileArgsSchema } from "../outputTypeSchemas/ProfileArgsSchema"
import { ProjectFindManyArgsSchema } from "../outputTypeSchemas/ProjectFindManyArgsSchema"
import { MessageFindManyArgsSchema } from "../outputTypeSchemas/MessageFindManyArgsSchema"
import { BookmarkFindManyArgsSchema } from "../outputTypeSchemas/BookmarkFindManyArgsSchema"
import { ReportFindManyArgsSchema } from "../outputTypeSchemas/ReportFindManyArgsSchema"
import { NotificationFindManyArgsSchema } from "../outputTypeSchemas/NotificationFindManyArgsSchema"
import { NotificationArchiveFindManyArgsSchema } from "../outputTypeSchemas/NotificationArchiveFindManyArgsSchema"
import { NotificationSettingArgsSchema } from "../outputTypeSchemas/NotificationSettingArgsSchema"
import { SubscriptionArgsSchema } from "../outputTypeSchemas/SubscriptionArgsSchema"
import { PendingSubscriptionArgsSchema } from "../outputTypeSchemas/PendingSubscriptionArgsSchema"
import { SubscriptionHistoryFindManyArgsSchema } from "../outputTypeSchemas/SubscriptionHistoryFindManyArgsSchema"
import { ActivityLogFindManyArgsSchema } from "../outputTypeSchemas/ActivityLogFindManyArgsSchema"
import { PaymentFindManyArgsSchema } from "../outputTypeSchemas/PaymentFindManyArgsSchema"
import { ErrorLogFindManyArgsSchema } from "../outputTypeSchemas/ErrorLogFindManyArgsSchema"
import { InvitationCodeFindManyArgsSchema } from "../outputTypeSchemas/InvitationCodeFindManyArgsSchema"
import { EmailTemplateFindManyArgsSchema } from "../outputTypeSchemas/EmailTemplateFindManyArgsSchema"
import { EmailLogFindManyArgsSchema } from "../outputTypeSchemas/EmailLogFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  receivedMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  reports: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  notificationArchives: z.union([z.boolean(),z.lazy(() => NotificationArchiveFindManyArgsSchema)]).optional(),
  notificationSetting: z.union([z.boolean(),z.lazy(() => NotificationSettingArgsSchema)]).optional(),
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
  pendingSubscription: z.union([z.boolean(),z.lazy(() => PendingSubscriptionArgsSchema)]).optional(),
  subscriptionHistory: z.union([z.boolean(),z.lazy(() => SubscriptionHistoryFindManyArgsSchema)]).optional(),
  activityLogs: z.union([z.boolean(),z.lazy(() => ActivityLogFindManyArgsSchema)]).optional(),
  payments: z.union([z.boolean(),z.lazy(() => PaymentFindManyArgsSchema)]).optional(),
  errorLogs: z.union([z.boolean(),z.lazy(() => ErrorLogFindManyArgsSchema)]).optional(),
  mentionedInMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  createdInvitations: z.union([z.boolean(),z.lazy(() => InvitationCodeFindManyArgsSchema)]).optional(),
  usedInvitations: z.union([z.boolean(),z.lazy(() => InvitationCodeFindManyArgsSchema)]).optional(),
  createdTemplates: z.union([z.boolean(),z.lazy(() => EmailTemplateFindManyArgsSchema)]).optional(),
  updatedTemplates: z.union([z.boolean(),z.lazy(() => EmailTemplateFindManyArgsSchema)]).optional(),
  sentEmails: z.union([z.boolean(),z.lazy(() => EmailLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserIncludeSchema;
