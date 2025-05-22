import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const EmailTemplateCreateManyUpdaterInputSchema: z.ZodType<Prisma.EmailTemplateCreateManyUpdaterInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  type: z.lazy(() => EmailTemplateTypeSchema),
  variables: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.boolean().optional(),
  previewData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.string()
}).strict();

export default EmailTemplateCreateManyUpdaterInputSchema;
