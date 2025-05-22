import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { UserCreateNestedOneWithoutErrorLogsInputSchema } from './UserCreateNestedOneWithoutErrorLogsInputSchema';

export const ErrorLogCreateInputSchema: z.ZodType<Prisma.ErrorLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  error: z.string(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutErrorLogsInputSchema).optional()
}).strict();

export default ErrorLogCreateInputSchema;
