import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { RoleSchema } from './RoleSchema';
import { EnumRoleFieldUpdateOperationsInputSchema } from './EnumRoleFieldUpdateOperationsInputSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { EnumPlanTypeFieldUpdateOperationsInputSchema } from './EnumPlanTypeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ProfileUncheckedUpdateOneWithoutUserNestedInputSchema } from './ProfileUncheckedUpdateOneWithoutUserNestedInputSchema';
import { ProjectUncheckedUpdateManyWithoutUserNestedInputSchema } from './ProjectUncheckedUpdateManyWithoutUserNestedInputSchema';
import { MessageUncheckedUpdateManyWithoutSenderNestedInputSchema } from './MessageUncheckedUpdateManyWithoutSenderNestedInputSchema';
import { MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema } from './MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema';
import { BookmarkUncheckedUpdateManyWithoutUserNestedInputSchema } from './BookmarkUncheckedUpdateManyWithoutUserNestedInputSchema';
import { ReportUncheckedUpdateManyWithoutReporterNestedInputSchema } from './ReportUncheckedUpdateManyWithoutReporterNestedInputSchema';
import { NotificationUncheckedUpdateManyWithoutUserNestedInputSchema } from './NotificationUncheckedUpdateManyWithoutUserNestedInputSchema';
import { NotificationArchiveUncheckedUpdateManyWithoutUserNestedInputSchema } from './NotificationArchiveUncheckedUpdateManyWithoutUserNestedInputSchema';
import { NotificationSettingUncheckedUpdateOneWithoutUserNestedInputSchema } from './NotificationSettingUncheckedUpdateOneWithoutUserNestedInputSchema';
import { PendingSubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema } from './PendingSubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema';
import { SubscriptionHistoryUncheckedUpdateManyWithoutUserNestedInputSchema } from './SubscriptionHistoryUncheckedUpdateManyWithoutUserNestedInputSchema';
import { ActivityLogUncheckedUpdateManyWithoutUserNestedInputSchema } from './ActivityLogUncheckedUpdateManyWithoutUserNestedInputSchema';
import { PaymentUncheckedUpdateManyWithoutUserNestedInputSchema } from './PaymentUncheckedUpdateManyWithoutUserNestedInputSchema';
import { ErrorLogUncheckedUpdateManyWithoutUserNestedInputSchema } from './ErrorLogUncheckedUpdateManyWithoutUserNestedInputSchema';
import { MessageUncheckedUpdateManyWithoutMentionedUsersNestedInputSchema } from './MessageUncheckedUpdateManyWithoutMentionedUsersNestedInputSchema';
import { InvitationCodeUncheckedUpdateManyWithoutCreatedByNestedInputSchema } from './InvitationCodeUncheckedUpdateManyWithoutCreatedByNestedInputSchema';
import { InvitationCodeUncheckedUpdateManyWithoutUsedByNestedInputSchema } from './InvitationCodeUncheckedUpdateManyWithoutUsedByNestedInputSchema';
import { EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputSchema } from './EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputSchema';
import { EmailTemplateUncheckedUpdateManyWithoutUpdaterNestedInputSchema } from './EmailTemplateUncheckedUpdateManyWithoutUpdaterNestedInputSchema';
import { EmailLogUncheckedUpdateManyWithoutSenderNestedInputSchema } from './EmailLogUncheckedUpdateManyWithoutSenderNestedInputSchema';

export const UserUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriptionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  planType: z.union([ z.lazy(() => PlanTypeSchema),z.lazy(() => EnumPlanTypeFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resetPasswordToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resetPasswordExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invitationExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invitedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isFirstLogin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedUpdateManyWithoutReporterNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  notificationArchives: z.lazy(() => NotificationArchiveUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  notificationSetting: z.lazy(() => NotificationSettingUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  pendingSubscription: z.lazy(() => PendingSubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriptionHistory: z.lazy(() => SubscriptionHistoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  activityLogs: z.lazy(() => ActivityLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  payments: z.lazy(() => PaymentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  errorLogs: z.lazy(() => ErrorLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  mentionedInMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutMentionedUsersNestedInputSchema).optional(),
  createdInvitations: z.lazy(() => InvitationCodeUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  usedInvitations: z.lazy(() => InvitationCodeUncheckedUpdateManyWithoutUsedByNestedInputSchema).optional(),
  createdTemplates: z.lazy(() => EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  updatedTemplates: z.lazy(() => EmailTemplateUncheckedUpdateManyWithoutUpdaterNestedInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict();

export default UserUncheckedUpdateWithoutSubscriptionInputSchema;
