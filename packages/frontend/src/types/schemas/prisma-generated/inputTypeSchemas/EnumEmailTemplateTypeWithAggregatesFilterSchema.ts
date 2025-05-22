import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { NestedEnumEmailTemplateTypeWithAggregatesFilterSchema } from './NestedEnumEmailTemplateTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumEmailTemplateTypeFilterSchema } from './NestedEnumEmailTemplateTypeFilterSchema';

export const EnumEmailTemplateTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEmailTemplateTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EmailTemplateTypeSchema).optional(),
  in: z.lazy(() => EmailTemplateTypeSchema).array().optional(),
  notIn: z.lazy(() => EmailTemplateTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailTemplateTypeSchema),z.lazy(() => NestedEnumEmailTemplateTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEmailTemplateTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEmailTemplateTypeFilterSchema).optional()
}).strict();

export default EnumEmailTemplateTypeWithAggregatesFilterSchema;
