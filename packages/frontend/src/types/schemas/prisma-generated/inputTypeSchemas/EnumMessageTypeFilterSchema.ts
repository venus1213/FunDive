import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { NestedEnumMessageTypeFilterSchema } from './NestedEnumMessageTypeFilterSchema';

export const EnumMessageTypeFilterSchema: z.ZodType<Prisma.EnumMessageTypeFilter> = z.object({
  equals: z.lazy(() => MessageTypeSchema).optional(),
  in: z.lazy(() => MessageTypeSchema).array().optional(),
  notIn: z.lazy(() => MessageTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageTypeSchema),z.lazy(() => NestedEnumMessageTypeFilterSchema) ]).optional(),
}).strict();

export default EnumMessageTypeFilterSchema;
