import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { NestedEnumEmailTemplateTypeFilterSchema } from './NestedEnumEmailTemplateTypeFilterSchema';

export const EnumEmailTemplateTypeFilterSchema: z.ZodType<Prisma.EnumEmailTemplateTypeFilter> = z.object({
  equals: z.lazy(() => EmailTemplateTypeSchema).optional(),
  in: z.lazy(() => EmailTemplateTypeSchema).array().optional(),
  notIn: z.lazy(() => EmailTemplateTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EmailTemplateTypeSchema),z.lazy(() => NestedEnumEmailTemplateTypeFilterSchema) ]).optional(),
}).strict();

export default EnumEmailTemplateTypeFilterSchema;
