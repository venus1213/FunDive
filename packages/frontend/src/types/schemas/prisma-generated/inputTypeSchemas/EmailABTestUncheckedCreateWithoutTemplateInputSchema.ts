import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { EmailABTestStatusSchema } from './EmailABTestStatusSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { EmailABTestResultUncheckedCreateNestedManyWithoutTestInputSchema } from './EmailABTestResultUncheckedCreateNestedManyWithoutTestInputSchema';

export const EmailABTestUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.EmailABTestUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  variantA: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  variantB: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.lazy(() => EmailABTestStatusSchema).optional(),
  winningVariant: z.string().optional().nullable(),
  metrics: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  testResults: z.lazy(() => EmailABTestResultUncheckedCreateNestedManyWithoutTestInputSchema).optional()
}).strict();

export default EmailABTestUncheckedCreateWithoutTemplateInputSchema;
