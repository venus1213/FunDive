import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateWhereInputSchema } from './EmailTemplateWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumEmailTemplateTypeFilterSchema } from './EnumEmailTemplateTypeFilterSchema';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserNullableScalarRelationFilterSchema } from './UserNullableScalarRelationFilterSchema';
import { EmailLogListRelationFilterSchema } from './EmailLogListRelationFilterSchema';
import { EmailABTestListRelationFilterSchema } from './EmailABTestListRelationFilterSchema';
import { EmailScheduleListRelationFilterSchema } from './EmailScheduleListRelationFilterSchema';

export const EmailTemplateWhereUniqueInputSchema: z.ZodType<Prisma.EmailTemplateWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EmailTemplateWhereInputSchema),z.lazy(() => EmailTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailTemplateWhereInputSchema),z.lazy(() => EmailTemplateWhereInputSchema).array() ]).optional(),
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
  creator: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  updater: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  sentEmails: z.lazy(() => EmailLogListRelationFilterSchema).optional(),
  abTests: z.lazy(() => EmailABTestListRelationFilterSchema).optional(),
  schedules: z.lazy(() => EmailScheduleListRelationFilterSchema).optional()
}).strict());

export default EmailTemplateWhereUniqueInputSchema;
