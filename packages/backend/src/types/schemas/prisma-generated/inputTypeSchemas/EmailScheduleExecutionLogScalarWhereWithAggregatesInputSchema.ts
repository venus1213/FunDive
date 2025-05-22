import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumEmailScheduleExecutionStatusWithAggregatesFilterSchema } from './EnumEmailScheduleExecutionStatusWithAggregatesFilterSchema';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailScheduleExecutionStatusWithAggregatesFilterSchema),z.lazy(() => EmailScheduleExecutionStatusSchema) ]).optional(),
  emailLogId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  error: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailScheduleExecutionLogScalarWhereWithAggregatesInputSchema;
