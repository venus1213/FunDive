import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestWhereInputSchema } from './EmailABTestWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumEmailABTestStatusFilterSchema } from './EnumEmailABTestStatusFilterSchema';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { EmailTemplateScalarRelationFilterSchema } from './EmailTemplateScalarRelationFilterSchema';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';
import { EmailABTestResultListRelationFilterSchema } from './EmailABTestResultListRelationFilterSchema';

export const EmailABTestWhereUniqueInputSchema: z.ZodType<Prisma.EmailABTestWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EmailABTestWhereInputSchema),z.lazy(() => EmailABTestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailABTestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailABTestWhereInputSchema),z.lazy(() => EmailABTestWhereInputSchema).array() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  variantA: z.lazy(() => JsonFilterSchema).optional(),
  variantB: z.lazy(() => JsonFilterSchema).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumEmailABTestStatusFilterSchema),z.lazy(() => EmailABTestStatusSchema) ]).optional(),
  winningVariant: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metrics: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  template: z.union([ z.lazy(() => EmailTemplateScalarRelationFilterSchema),z.lazy(() => EmailTemplateWhereInputSchema) ]).optional(),
  testResults: z.lazy(() => EmailABTestResultListRelationFilterSchema).optional()
}).strict());

export default EmailABTestWhereUniqueInputSchema;
