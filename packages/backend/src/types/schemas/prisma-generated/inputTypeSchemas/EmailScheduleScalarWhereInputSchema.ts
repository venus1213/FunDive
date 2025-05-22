import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { EnumEmailScheduleTypeFilterSchema } from './EnumEmailScheduleTypeFilterSchema';
import { EmailScheduleTypeSchema } from './EmailScheduleTypeSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { EnumEmailScheduleStatusFilterSchema } from './EnumEmailScheduleStatusFilterSchema';
import { EmailScheduleStatusSchema } from './EmailScheduleStatusSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const EmailScheduleScalarWhereInputSchema: z.ZodType<Prisma.EmailScheduleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScheduleScalarWhereInputSchema),z.lazy(() => EmailScheduleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScheduleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScheduleScalarWhereInputSchema),z.lazy(() => EmailScheduleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  recipientIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  scheduleType: z.union([ z.lazy(() => EnumEmailScheduleTypeFilterSchema),z.lazy(() => EmailScheduleTypeSchema) ]).optional(),
  cronExpression: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sendAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  variables: z.lazy(() => JsonNullableFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumEmailScheduleStatusFilterSchema),z.lazy(() => EmailScheduleStatusSchema) ]).optional(),
  lastRunAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  nextRunAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailScheduleScalarWhereInputSchema;
