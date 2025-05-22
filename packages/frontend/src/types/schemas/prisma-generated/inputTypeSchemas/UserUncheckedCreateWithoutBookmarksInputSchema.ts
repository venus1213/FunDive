import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { ProfileUncheckedCreateNestedOneWithoutUserInputSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInputSchema';
import { ProjectUncheckedCreateNestedManyWithoutUserInputSchema } from './ProjectUncheckedCreateNestedManyWithoutUserInputSchema';
import { MessageUncheckedCreateNestedManyWithoutSenderInputSchema } from './MessageUncheckedCreateNestedManyWithoutSenderInputSchema';
import { MessageUncheckedCreateNestedManyWithoutReceiverInputSchema } from './MessageUncheckedCreateNestedManyWithoutReceiverInputSchema';
import { ReportUncheckedCreateNestedManyWithoutReporterInputSchema } from './ReportUncheckedCreateNestedManyWithoutReporterInputSchema';
import { NotificationUncheckedCreateNestedManyWithoutUserInputSchema } from './NotificationUncheckedCreateNestedManyWithoutUserInputSchema';
import { NotificationArchiveUncheckedCreateNestedManyWithoutUserInputSchema } from './NotificationArchiveUncheckedCreateNestedManyWithoutUserInputSchema';
import { NotificationSettingUncheckedCreateNestedOneWithoutUserInputSchema } from './NotificationSettingUncheckedCreateNestedOneWithoutUserInputSchema';
import { SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema } from './SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema';
import { PendingSubscriptionUncheckedCreateNestedOneWithoutUserInputSchema } from './PendingSubscriptionUncheckedCreateNestedOneWithoutUserInputSchema';
import { SubscriptionHistoryUncheckedCreateNestedManyWithoutUserInputSchema } from './SubscriptionHistoryUncheckedCreateNestedManyWithoutUserInputSchema';
import { ActivityLogUncheckedCreateNestedManyWithoutUserInputSchema } from './ActivityLogUncheckedCreateNestedManyWithoutUserInputSchema';
import { PaymentUncheckedCreateNestedManyWithoutUserInputSchema } from './PaymentUncheckedCreateNestedManyWithoutUserInputSchema';
import { ErrorLogUncheckedCreateNestedManyWithoutUserInputSchema } from './ErrorLogUncheckedCreateNestedManyWithoutUserInputSchema';
import { MessageUncheckedCreateNestedManyWithoutMentionedUsersInputSchema } from './MessageUncheckedCreateNestedManyWithoutMentionedUsersInputSchema';
import { InvitationCodeUncheckedCreateNestedManyWithoutCreatedByInputSchema } from './InvitationCodeUncheckedCreateNestedManyWithoutCreatedByInputSchema';
import { InvitationCodeUncheckedCreateNestedManyWithoutUsedByInputSchema } from './InvitationCodeUncheckedCreateNestedManyWithoutUsedByInputSchema';
import { EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputSchema } from './EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputSchema';
import { EmailTemplateUncheckedCreateNestedManyWithoutUpdaterInputSchema } from './EmailTemplateUncheckedCreateNestedManyWithoutUpdaterInputSchema';
import { EmailLogUncheckedCreateNestedManyWithoutSenderInputSchema } from './EmailLogUncheckedCreateNestedManyWithoutSenderInputSchema';

export const UserUncheckedCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBookmarksInput> = z.object({
  id: z.string().uuid().optional(),
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
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedCreateNestedManyWithoutReporterInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  notificationArchives: z.lazy(() => NotificationArchiveUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  notificationSetting: z.lazy(() => NotificationSettingUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  pendingSubscription: z.lazy(() => PendingSubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  subscriptionHistory: z.lazy(() => SubscriptionHistoryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  activityLogs: z.lazy(() => ActivityLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  payments: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  errorLogs: z.lazy(() => ErrorLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  mentionedInMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutMentionedUsersInputSchema).optional(),
  createdInvitations: z.lazy(() => InvitationCodeUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  usedInvitations: z.lazy(() => InvitationCodeUncheckedCreateNestedManyWithoutUsedByInputSchema).optional(),
  createdTemplates: z.lazy(() => EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  updatedTemplates: z.lazy(() => EmailTemplateUncheckedCreateNestedManyWithoutUpdaterInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutBookmarksInputSchema;
