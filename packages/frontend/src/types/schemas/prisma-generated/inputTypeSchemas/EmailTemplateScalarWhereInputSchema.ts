import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumEmailTemplateTypeFilterSchema } from './EnumEmailTemplateTypeFilterSchema';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const EmailTemplateScalarWhereInputSchema: z.ZodType<Prisma.EmailTemplateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailTemplateScalarWhereInputSchema),z.lazy(() => EmailTemplateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailTemplateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailTemplateScalarWhereInputSchema),z.lazy(() => EmailTemplateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumEmailTemplateTypeFilterSchema),z.lazy(() => EmailTemplateTypeSchema) ]).optional(),
  variables: z.lazy(() => JsonNullableFilterSchema).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  previewData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default EmailTemplateScalarWhereInputSchema;
