import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { EnumEmailStatusFilterSchema } from './EnumEmailStatusFilterSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const EmailLogScalarWhereInputSchema: z.ZodType<Prisma.EmailLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailLogScalarWhereInputSchema),z.lazy(() => EmailLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailLogScalarWhereInputSchema),z.lazy(() => EmailLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipientIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailStatusFilterSchema),z.lazy(() => EmailStatusSchema) ]).optional(),
  sentAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sentBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  errorDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default EmailLogScalarWhereInputSchema;
