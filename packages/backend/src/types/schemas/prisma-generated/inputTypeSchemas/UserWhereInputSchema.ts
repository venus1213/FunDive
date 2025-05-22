import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumRoleFilterSchema } from './EnumRoleFilterSchema';
import { RoleSchema } from './RoleSchema';
import { EnumPlanTypeFilterSchema } from './EnumPlanTypeFilterSchema';
import { PlanTypeSchema } from './PlanTypeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { ProfileNullableRelationFilterSchema } from './ProfileNullableRelationFilterSchema';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';
import { ProjectListRelationFilterSchema } from './ProjectListRelationFilterSchema';
import { MessageListRelationFilterSchema } from './MessageListRelationFilterSchema';
import { BookmarkListRelationFilterSchema } from './BookmarkListRelationFilterSchema';
import { ReportListRelationFilterSchema } from './ReportListRelationFilterSchema';
import { NotificationListRelationFilterSchema } from './NotificationListRelationFilterSchema';
import { NotificationArchiveListRelationFilterSchema } from './NotificationArchiveListRelationFilterSchema';
import { NotificationSettingNullableRelationFilterSchema } from './NotificationSettingNullableRelationFilterSchema';
import { NotificationSettingWhereInputSchema } from './NotificationSettingWhereInputSchema';
import { SubscriptionNullableRelationFilterSchema } from './SubscriptionNullableRelationFilterSchema';
import { SubscriptionWhereInputSchema } from './SubscriptionWhereInputSchema';
import { PendingSubscriptionNullableRelationFilterSchema } from './PendingSubscriptionNullableRelationFilterSchema';
import { PendingSubscriptionWhereInputSchema } from './PendingSubscriptionWhereInputSchema';
import { SubscriptionHistoryListRelationFilterSchema } from './SubscriptionHistoryListRelationFilterSchema';
import { ActivityLogListRelationFilterSchema } from './ActivityLogListRelationFilterSchema';
import { PaymentListRelationFilterSchema } from './PaymentListRelationFilterSchema';
import { ErrorLogListRelationFilterSchema } from './ErrorLogListRelationFilterSchema';
import { InvitationCodeListRelationFilterSchema } from './InvitationCodeListRelationFilterSchema';
import { EmailTemplateListRelationFilterSchema } from './EmailTemplateListRelationFilterSchema';
import { EmailLogListRelationFilterSchema } from './EmailLogListRelationFilterSchema';
import { ArticleListRelationFilterSchema } from './ArticleListRelationFilterSchema';

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firebaseUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  planType: z.union([ z.lazy(() => EnumPlanTypeFilterSchema),z.lazy(() => PlanTypeSchema) ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  verificationToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  resetPasswordToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  resetPasswordExpires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  invitationExpires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  invitedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isFirstLogin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
  projects: z.lazy(() => ProjectListRelationFilterSchema).optional(),
  sentMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  receivedMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional(),
  reports: z.lazy(() => ReportListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  notificationArchives: z.lazy(() => NotificationArchiveListRelationFilterSchema).optional(),
  notificationSetting: z.union([ z.lazy(() => NotificationSettingNullableRelationFilterSchema),z.lazy(() => NotificationSettingWhereInputSchema) ]).optional().nullable(),
  subscription: z.union([ z.lazy(() => SubscriptionNullableRelationFilterSchema),z.lazy(() => SubscriptionWhereInputSchema) ]).optional().nullable(),
  pendingSubscription: z.union([ z.lazy(() => PendingSubscriptionNullableRelationFilterSchema),z.lazy(() => PendingSubscriptionWhereInputSchema) ]).optional().nullable(),
  subscriptionHistory: z.lazy(() => SubscriptionHistoryListRelationFilterSchema).optional(),
  activityLogs: z.lazy(() => ActivityLogListRelationFilterSchema).optional(),
  payments: z.lazy(() => PaymentListRelationFilterSchema).optional(),
  errorLogs: z.lazy(() => ErrorLogListRelationFilterSchema).optional(),
  mentionedInMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  createdInvitations: z.lazy(() => InvitationCodeListRelationFilterSchema).optional(),
  usedInvitations: z.lazy(() => InvitationCodeListRelationFilterSchema).optional(),
  createdTemplates: z.lazy(() => EmailTemplateListRelationFilterSchema).optional(),
  updatedTemplates: z.lazy(() => EmailTemplateListRelationFilterSchema).optional(),
  sentEmails: z.lazy(() => EmailLogListRelationFilterSchema).optional(),
  articles: z.lazy(() => ArticleListRelationFilterSchema).optional()
}).strict();

export default UserWhereInputSchema;
