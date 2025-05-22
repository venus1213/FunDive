import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumEmailScheduleExecutionStatusFilterSchema } from './EnumEmailScheduleExecutionStatusFilterSchema';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EmailScheduleScalarRelationFilterSchema } from './EmailScheduleScalarRelationFilterSchema';
import { EmailScheduleWhereInputSchema } from './EmailScheduleWhereInputSchema';
import { EmailLogNullableScalarRelationFilterSchema } from './EmailLogNullableScalarRelationFilterSchema';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';

export const EmailScheduleExecutionLogWhereInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScheduleExecutionLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScheduleExecutionLogWhereInputSchema),z.lazy(() => EmailScheduleExecutionLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailScheduleExecutionStatusFilterSchema),z.lazy(() => EmailScheduleExecutionStatusSchema) ]).optional(),
  emailLogId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  error: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  schedule: z.union([ z.lazy(() => EmailScheduleScalarRelationFilterSchema),z.lazy(() => EmailScheduleWhereInputSchema) ]).optional(),
  emailLog: z.union([ z.lazy(() => EmailLogNullableScalarRelationFilterSchema),z.lazy(() => EmailLogWhereInputSchema) ]).optional().nullable(),
}).strict();

export default EmailScheduleExecutionLogWhereInputSchema;
