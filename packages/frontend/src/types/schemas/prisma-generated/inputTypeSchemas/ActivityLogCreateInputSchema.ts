import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ActionTypeSchema } from './ActionTypeSchema';
import { ActivityTargetTypeSchema } from './ActivityTargetTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { UserCreateNestedOneWithoutActivityLogsInputSchema } from './UserCreateNestedOneWithoutActivityLogsInputSchema';

export const ActivityLogCreateInputSchema: z.ZodType<Prisma.ActivityLogCreateInput> = z.object({
  id: z.string().uuid().optional(),
  actionType: z.lazy(() => ActionTypeSchema),
  targetType: z.lazy(() => ActivityTargetTypeSchema),
  targetId: z.string().optional().nullable(),
  details: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutActivityLogsInputSchema).optional()
}).strict();

export default ActivityLogCreateInputSchema;
