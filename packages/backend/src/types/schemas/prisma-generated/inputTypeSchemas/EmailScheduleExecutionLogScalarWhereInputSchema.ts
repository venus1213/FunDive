import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumEmailScheduleExecutionStatusFilterSchema } from './EnumEmailScheduleExecutionStatusFilterSchema';
import { EmailScheduleExecutionStatusSchema } from './EmailScheduleExecutionStatusSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const EmailScheduleExecutionLogScalarWhereInputSchema: z.ZodType<Prisma.EmailScheduleExecutionLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema),z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema),z.lazy(() => EmailScheduleExecutionLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scheduleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailScheduleExecutionStatusFilterSchema),z.lazy(() => EmailScheduleExecutionStatusSchema) ]).optional(),
  emailLogId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  error: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default EmailScheduleExecutionLogScalarWhereInputSchema;
