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
import { ProjectUpdateManyWithoutUserNestedInputSchema } from './ProjectUpdateManyWithoutUserNestedInputSchema';
import { MessageUpdateManyWithoutSenderNestedInputSchema } from './MessageUpdateManyWithoutSenderNestedInputSchema';
import { MessageUpdateManyWithoutReceiverNestedInputSchema } from './MessageUpdateManyWithoutReceiverNestedInputSchema';
import { BookmarkUpdateManyWithoutUserNestedInputSchema } from './BookmarkUpdateManyWithoutUserNestedInputSchema';
import { ReportUpdateManyWithoutReporterNestedInputSchema } from './ReportUpdateManyWithoutReporterNestedInputSchema';
import { NotificationUpdateManyWithoutUserNestedInputSchema } from './NotificationUpdateManyWithoutUserNestedInputSchema';
import { NotificationArchiveUpdateManyWithoutUserNestedInputSchema } from './NotificationArchiveUpdateManyWithoutUserNestedInputSchema';
import { NotificationSettingUpdateOneWithoutUserNestedInputSchema } from './NotificationSettingUpdateOneWithoutUserNestedInputSchema';
import { SubscriptionUpdateOneWithoutUserNestedInputSchema } from './SubscriptionUpdateOneWithoutUserNestedInputSchema';
import { PendingSubscriptionUpdateOneWithoutUserNestedInputSchema } from './PendingSubscriptionUpdateOneWithoutUserNestedInputSchema';
import { SubscriptionHistoryUpdateManyWithoutUserNestedInputSchema } from './SubscriptionHistoryUpdateManyWithoutUserNestedInputSchema';
import { ActivityLogUpdateManyWithoutUserNestedInputSchema } from './ActivityLogUpdateManyWithoutUserNestedInputSchema';
import { PaymentUpdateManyWithoutUserNestedInputSchema } from './PaymentUpdateManyWithoutUserNestedInputSchema';
import { ErrorLogUpdateManyWithoutUserNestedInputSchema } from './ErrorLogUpdateManyWithoutUserNestedInputSchema';
import { MessageUpdateManyWithoutMentionedUsersNestedInputSchema } from './MessageUpdateManyWithoutMentionedUsersNestedInputSchema';
import { InvitationCodeUpdateManyWithoutCreatedByNestedInputSchema } from './InvitationCodeUpdateManyWithoutCreatedByNestedInputSchema';
import { InvitationCodeUpdateManyWithoutUsedByNestedInputSchema } from './InvitationCodeUpdateManyWithoutUsedByNestedInputSchema';
import { EmailTemplateUpdateManyWithoutCreatorNestedInputSchema } from './EmailTemplateUpdateManyWithoutCreatorNestedInputSchema';
import { EmailTemplateUpdateManyWithoutUpdaterNestedInputSchema } from './EmailTemplateUpdateManyWithoutUpdaterNestedInputSchema';
import { EmailLogUpdateManyWithoutSenderNestedInputSchema } from './EmailLogUpdateManyWithoutSenderNestedInputSchema';

export const UserUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileInput> = z.object({
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
  projects: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutUserNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUpdateManyWithoutReporterNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  notificationArchives: z.lazy(() => NotificationArchiveUpdateManyWithoutUserNestedInputSchema).optional(),
  notificationSetting: z.lazy(() => NotificationSettingUpdateOneWithoutUserNestedInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  pendingSubscription: z.lazy(() => PendingSubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  subscriptionHistory: z.lazy(() => SubscriptionHistoryUpdateManyWithoutUserNestedInputSchema).optional(),
  activityLogs: z.lazy(() => ActivityLogUpdateManyWithoutUserNestedInputSchema).optional(),
  payments: z.lazy(() => PaymentUpdateManyWithoutUserNestedInputSchema).optional(),
  errorLogs: z.lazy(() => ErrorLogUpdateManyWithoutUserNestedInputSchema).optional(),
  mentionedInMessages: z.lazy(() => MessageUpdateManyWithoutMentionedUsersNestedInputSchema).optional(),
  createdInvitations: z.lazy(() => InvitationCodeUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  usedInvitations: z.lazy(() => InvitationCodeUpdateManyWithoutUsedByNestedInputSchema).optional(),
  createdTemplates: z.lazy(() => EmailTemplateUpdateManyWithoutCreatorNestedInputSchema).optional(),
  updatedTemplates: z.lazy(() => EmailTemplateUpdateManyWithoutUpdaterNestedInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict();

export default UserUpdateWithoutProfileInputSchema;
