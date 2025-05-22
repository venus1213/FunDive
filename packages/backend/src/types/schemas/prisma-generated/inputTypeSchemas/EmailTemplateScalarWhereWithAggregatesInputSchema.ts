import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumEmailTemplateTypeWithAggregatesFilterSchema } from './EnumEmailTemplateTypeWithAggregatesFilterSchema';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const EmailTemplateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailTemplateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailTemplateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumEmailTemplateTypeWithAggregatesFilterSchema),z.lazy(() => EmailTemplateTypeSchema) ]).optional(),
  variables: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  previewData: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default EmailTemplateScalarWhereWithAggregatesInputSchema;
