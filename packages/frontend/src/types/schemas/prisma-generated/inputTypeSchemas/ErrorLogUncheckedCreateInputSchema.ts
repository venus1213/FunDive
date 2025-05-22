import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const ErrorLogUncheckedCreateInputSchema: z.ZodType<Prisma.ErrorLogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional().nullable(),
  type: z.string(),
  error: z.string(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ErrorLogUncheckedCreateInputSchema;
