import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserNullableRelationFilterSchema } from './UserNullableRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const ErrorLogWhereInputSchema: z.ZodType<Prisma.ErrorLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ErrorLogWhereInputSchema),z.lazy(() => ErrorLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ErrorLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ErrorLogWhereInputSchema),z.lazy(() => ErrorLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  error: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export default ErrorLogWhereInputSchema;
