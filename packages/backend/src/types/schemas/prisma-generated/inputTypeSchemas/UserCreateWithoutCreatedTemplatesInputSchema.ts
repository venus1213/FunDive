import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { ProfileCreateNestedOneWithoutUserInputSchema } from './ProfileCreateNestedOneWithoutUserInputSchema';
import { ProjectCreateNestedManyWithoutUserInputSchema } from './ProjectCreateNestedManyWithoutUserInputSchema';
import { MessageCreateNestedManyWithoutSenderInputSchema } from './MessageCreateNestedManyWithoutSenderInputSchema';
import { MessageCreateNestedManyWithoutReceiverInputSchema } from './MessageCreateNestedManyWithoutReceiverInputSchema';
import { BookmarkCreateNestedManyWithoutUserInputSchema } from './BookmarkCreateNestedManyWithoutUserInputSchema';
import { ReportCreateNestedManyWithoutReporterInputSchema } from './ReportCreateNestedManyWithoutReporterInputSchema';
import { NotificationCreateNestedManyWithoutUserInputSchema } from './NotificationCreateNestedManyWithoutUserInputSchema';
import { NotificationArchiveCreateNestedManyWithoutUserInputSchema } from './NotificationArchiveCreateNestedManyWithoutUserInputSchema';
import { NotificationSettingCreateNestedOneWithoutUserInputSchema } from './NotificationSettingCreateNestedOneWithoutUserInputSchema';
import { SubscriptionCreateNestedOneWithoutUserInputSchema } from './SubscriptionCreateNestedOneWithoutUserInputSchema';
import { PendingSubscriptionCreateNestedOneWithoutUserInputSchema } from './PendingSubscriptionCreateNestedOneWithoutUserInputSchema';
import { SubscriptionHistoryCreateNestedManyWithoutUserInputSchema } from './SubscriptionHistoryCreateNestedManyWithoutUserInputSchema';
import { ActivityLogCreateNestedManyWithoutUserInputSchema } from './ActivityLogCreateNestedManyWithoutUserInputSchema';
import { PaymentCreateNestedManyWithoutUserInputSchema } from './PaymentCreateNestedManyWithoutUserInputSchema';
import { ErrorLogCreateNestedManyWithoutUserInputSchema } from './ErrorLogCreateNestedManyWithoutUserInputSchema';
import { MessageCreateNestedManyWithoutMentionedUsersInputSchema } from './MessageCreateNestedManyWithoutMentionedUsersInputSchema';
import { InvitationCodeCreateNestedManyWithoutCreatedByInputSchema } from './InvitationCodeCreateNestedManyWithoutCreatedByInputSchema';
import { InvitationCodeCreateNestedManyWithoutUsedByInputSchema } from './InvitationCodeCreateNestedManyWithoutUsedByInputSchema';
import { EmailTemplateCreateNestedManyWithoutUpdaterInputSchema } from './EmailTemplateCreateNestedManyWithoutUpdaterInputSchema';
import { EmailLogCreateNestedManyWithoutSenderInputSchema } from './EmailLogCreateNestedManyWithoutSenderInputSchema';
import { ArticleCreateNestedManyWithoutAuthorInputSchema } from './ArticleCreateNestedManyWithoutAuthorInputSchema';

export const UserCreateWithoutCreatedTemplatesInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedTemplatesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  firebaseUid: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  planType: z.lazy(() => PlanTypeSchema).optional(),
  isAdmin: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  verificationToken: z.string().optional().nullable(),
  resetPasswordToken: z.string().optional().nullable(),
  resetPasswordExpires: z.coerce.date().optional().nullable(),
  invitationExpires: z.coerce.date().optional().nullable(),
  invitedBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFirstLogin: z.boolean().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutUserInputSchema).optional(),
  reports: z.lazy(() => ReportCreateNestedManyWithoutReporterInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  notificationArchives: z.lazy(() => NotificationArchiveCreateNestedManyWithoutUserInputSchema).optional(),
  notificationSetting: z.lazy(() => NotificationSettingCreateNestedOneWithoutUserInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  pendingSubscription: z.lazy(() => PendingSubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  subscriptionHistory: z.lazy(() => SubscriptionHistoryCreateNestedManyWithoutUserInputSchema).optional(),
  activityLogs: z.lazy(() => ActivityLogCreateNestedManyWithoutUserInputSchema).optional(),
  payments: z.lazy(() => PaymentCreateNestedManyWithoutUserInputSchema).optional(),
  errorLogs: z.lazy(() => ErrorLogCreateNestedManyWithoutUserInputSchema).optional(),
  mentionedInMessages: z.lazy(() => MessageCreateNestedManyWithoutMentionedUsersInputSchema).optional(),
  createdInvitations: z.lazy(() => InvitationCodeCreateNestedManyWithoutCreatedByInputSchema).optional(),
  usedInvitations: z.lazy(() => InvitationCodeCreateNestedManyWithoutUsedByInputSchema).optional(),
  updatedTemplates: z.lazy(() => EmailTemplateCreateNestedManyWithoutUpdaterInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogCreateNestedManyWithoutSenderInputSchema).optional(),
  articles: z.lazy(() => ArticleCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export default UserCreateWithoutCreatedTemplatesInputSchema;
