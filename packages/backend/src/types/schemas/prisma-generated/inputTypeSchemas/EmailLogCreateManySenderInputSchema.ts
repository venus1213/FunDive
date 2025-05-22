import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreaterecipientIdsInputSchema } from './EmailLogCreaterecipientIdsInputSchema';
import { EmailStatusSchema } from './EmailStatusSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const EmailLogCreateManySenderInputSchema: z.ZodType<Prisma.EmailLogCreateManySenderInput> = z.object({
  id: z.string().optional(),
  templateId: z.string(),
  recipientIds: z.union([ z.lazy(() => EmailLogCreaterecipientIdsInputSchema),z.string().array() ]).optional(),
  subject: z.string(),
  body: z.string(),
  status: z.lazy(() => EmailStatusSchema),
  sentAt: z.coerce.date().optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  errorDetails: z.string().optional().nullable()
}).strict();

export default EmailLogCreateManySenderInputSchema;
