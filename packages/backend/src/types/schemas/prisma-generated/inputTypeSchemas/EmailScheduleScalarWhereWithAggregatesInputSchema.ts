import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { EnumEmailScheduleTypeWithAggregatesFilterSchema } from './EnumEmailScheduleTypeWithAggregatesFilterSchema';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { EnumEmailScheduleStatusWithAggregatesFilterSchema } from './EnumEmailScheduleStatusWithAggregatesFilterSchema';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const EmailScheduleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailScheduleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScheduleScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailScheduleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScheduleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScheduleScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailScheduleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  recipientIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  scheduleType: z.union([ z.lazy(() => EnumEmailScheduleTypeWithAggregatesFilterSchema),z.lazy(() => EmailScheduleTypeSchema) ]).optional(),
  cronExpression: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sendAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  variables: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumEmailScheduleStatusWithAggregatesFilterSchema),z.lazy(() => EmailScheduleStatusSchema) ]).optional(),
  lastRunAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  nextRunAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailScheduleScalarWhereWithAggregatesInputSchema;
