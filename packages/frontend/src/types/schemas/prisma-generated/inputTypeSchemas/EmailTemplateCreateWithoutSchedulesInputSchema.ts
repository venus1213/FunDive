import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { UserCreateNestedOneWithoutCreatedTemplatesInputSchema } from './UserCreateNestedOneWithoutCreatedTemplatesInputSchema';
import { UserCreateNestedOneWithoutUpdatedTemplatesInputSchema } from './UserCreateNestedOneWithoutUpdatedTemplatesInputSchema';
import { EmailLogCreateNestedManyWithoutTemplateInputSchema } from './EmailLogCreateNestedManyWithoutTemplateInputSchema';
import { EmailABTestCreateNestedManyWithoutTemplateInputSchema } from './EmailABTestCreateNestedManyWithoutTemplateInputSchema';

export const EmailTemplateCreateWithoutSchedulesInputSchema: z.ZodType<Prisma.EmailTemplateCreateWithoutSchedulesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  type: z.lazy(() => EmailTemplateTypeSchema),
  variables: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  isActive: z.boolean().optional(),
  previewData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedTemplatesInputSchema),
  updater: z.lazy(() => UserCreateNestedOneWithoutUpdatedTemplatesInputSchema).optional(),
  sentEmails: z.lazy(() => EmailLogCreateNestedManyWithoutTemplateInputSchema).optional(),
  abTests: z.lazy(() => EmailABTestCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export default EmailTemplateCreateWithoutSchedulesInputSchema;
