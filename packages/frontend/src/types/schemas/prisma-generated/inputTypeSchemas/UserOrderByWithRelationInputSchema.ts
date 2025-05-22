import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ProfileOrderByWithRelationInputSchema } from './ProfileOrderByWithRelationInputSchema';
import { ProjectOrderByRelationAggregateInputSchema } from './ProjectOrderByRelationAggregateInputSchema';
import { MessageOrderByRelationAggregateInputSchema } from './MessageOrderByRelationAggregateInputSchema';
import { BookmarkOrderByRelationAggregateInputSchema } from './BookmarkOrderByRelationAggregateInputSchema';
import { ReportOrderByRelationAggregateInputSchema } from './ReportOrderByRelationAggregateInputSchema';
import { NotificationOrderByRelationAggregateInputSchema } from './NotificationOrderByRelationAggregateInputSchema';
import { NotificationArchiveOrderByRelationAggregateInputSchema } from './NotificationArchiveOrderByRelationAggregateInputSchema';
import { NotificationSettingOrderByWithRelationInputSchema } from './NotificationSettingOrderByWithRelationInputSchema';
import { SubscriptionOrderByWithRelationInputSchema } from './SubscriptionOrderByWithRelationInputSchema';
import { PendingSubscriptionOrderByWithRelationInputSchema } from './PendingSubscriptionOrderByWithRelationInputSchema';
import { SubscriptionHistoryOrderByRelationAggregateInputSchema } from './SubscriptionHistoryOrderByRelationAggregateInputSchema';
import { ActivityLogOrderByRelationAggregateInputSchema } from './ActivityLogOrderByRelationAggregateInputSchema';
import { PaymentOrderByRelationAggregateInputSchema } from './PaymentOrderByRelationAggregateInputSchema';
import { ErrorLogOrderByRelationAggregateInputSchema } from './ErrorLogOrderByRelationAggregateInputSchema';
import { InvitationCodeOrderByRelationAggregateInputSchema } from './InvitationCodeOrderByRelationAggregateInputSchema';
import { EmailTemplateOrderByRelationAggregateInputSchema } from './EmailTemplateOrderByRelationAggregateInputSchema';
import { EmailLogOrderByRelationAggregateInputSchema } from './EmailLogOrderByRelationAggregateInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  planType: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  verificationToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  resetPasswordToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  resetPasswordExpires: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  invitationExpires: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isFirstLogin: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  projects: z.lazy(() => ProjectOrderByRelationAggregateInputSchema).optional(),
  sentMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  bookmarks: z.lazy(() => BookmarkOrderByRelationAggregateInputSchema).optional(),
  reports: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
  notificationArchives: z.lazy(() => NotificationArchiveOrderByRelationAggregateInputSchema).optional(),
  notificationSetting: z.lazy(() => NotificationSettingOrderByWithRelationInputSchema).optional(),
  subscription: z.lazy(() => SubscriptionOrderByWithRelationInputSchema).optional(),
  pendingSubscription: z.lazy(() => PendingSubscriptionOrderByWithRelationInputSchema).optional(),
  subscriptionHistory: z.lazy(() => SubscriptionHistoryOrderByRelationAggregateInputSchema).optional(),
  activityLogs: z.lazy(() => ActivityLogOrderByRelationAggregateInputSchema).optional(),
  payments: z.lazy(() => PaymentOrderByRelationAggregateInputSchema).optional(),
  errorLogs: z.lazy(() => ErrorLogOrderByRelationAggregateInputSchema).optional(),
  mentionedInMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  createdInvitations: z.lazy(() => InvitationCodeOrderByRelationAggregateInputSchema).optional(),
  usedInvitations: z.lazy(() => InvitationCodeOrderByRelationAggregateInputSchema).optional(),
  createdTemplates: z.lazy(() => EmailTemplateOrderByRelationAggregateInputSchema).optional(),
  updatedTemplates: z.lazy(() => EmailTemplateOrderByRelationAggregateInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogOrderByRelationAggregateInputSchema).optional()
}).strict();

export default UserOrderByWithRelationInputSchema;
