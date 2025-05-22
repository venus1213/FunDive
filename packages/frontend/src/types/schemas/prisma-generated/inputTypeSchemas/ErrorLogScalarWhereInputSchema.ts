import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const ErrorLogScalarWhereInputSchema: z.ZodType<Prisma.ErrorLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ErrorLogScalarWhereInputSchema),z.lazy(() => ErrorLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ErrorLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ErrorLogScalarWhereInputSchema),z.lazy(() => ErrorLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  error: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ErrorLogScalarWhereInputSchema;
