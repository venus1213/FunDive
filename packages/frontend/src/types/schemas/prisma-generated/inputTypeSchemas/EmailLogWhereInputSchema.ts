import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { EnumEmailStatusFilterSchema } from './EnumEmailStatusFilterSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EmailTemplateScalarRelationFilterSchema } from './EmailTemplateScalarRelationFilterSchema';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { EmailABTestResultListRelationFilterSchema } from './EmailABTestResultListRelationFilterSchema';
import { EmailScheduleExecutionLogListRelationFilterSchema } from './EmailScheduleExecutionLogListRelationFilterSchema';

export const EmailLogWhereInputSchema: z.ZodType<Prisma.EmailLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailLogWhereInputSchema),z.lazy(() => EmailLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailLogWhereInputSchema),z.lazy(() => EmailLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipientIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailStatusFilterSchema),z.lazy(() => EmailStatusSchema) ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sentBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  errorDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  template: z.union([ z.lazy(() => EmailTemplateScalarRelationFilterSchema),z.lazy(() => EmailTemplateWhereInputSchema) ]).optional(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  abTestResults: z.lazy(() => EmailABTestResultListRelationFilterSchema).optional(),
  scheduleExecutions: z.lazy(() => EmailScheduleExecutionLogListRelationFilterSchema).optional()
}).strict();

export default EmailLogWhereInputSchema;
