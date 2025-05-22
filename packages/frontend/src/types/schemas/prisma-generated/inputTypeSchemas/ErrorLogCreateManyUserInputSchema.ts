import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const ErrorLogCreateManyUserInputSchema: z.ZodType<Prisma.ErrorLogCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  error: z.string(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ErrorLogCreateManyUserInputSchema;
