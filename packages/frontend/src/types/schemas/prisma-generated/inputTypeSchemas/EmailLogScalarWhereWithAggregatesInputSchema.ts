import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { EnumEmailStatusWithAggregatesFilterSchema } from './EnumEmailStatusWithAggregatesFilterSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const EmailLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailLogScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailLogScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recipientIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailStatusWithAggregatesFilterSchema),z.lazy(() => EmailStatusSchema) ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  sentBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  errorDetails: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default EmailLogScalarWhereWithAggregatesInputSchema;
