import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  projects: z.boolean().optional(),
  sentMessages: z.boolean().optional(),
  receivedMessages: z.boolean().optional(),
  bookmarks: z.boolean().optional(),
  reports: z.boolean().optional(),
  notifications: z.boolean().optional(),
  notificationArchives: z.boolean().optional(),
  subscriptionHistory: z.boolean().optional(),
  activityLogs: z.boolean().optional(),
  payments: z.boolean().optional(),
  errorLogs: z.boolean().optional(),
  mentionedInMessages: z.boolean().optional(),
  createdInvitations: z.boolean().optional(),
  usedInvitations: z.boolean().optional(),
  createdTemplates: z.boolean().optional(),
  updatedTemplates: z.boolean().optional(),
  sentEmails: z.boolean().optional(),
  articles: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
