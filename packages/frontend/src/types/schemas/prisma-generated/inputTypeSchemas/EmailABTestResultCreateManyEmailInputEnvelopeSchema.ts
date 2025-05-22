import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultCreateManyEmailInputSchema } from './EmailABTestResultCreateManyEmailInputSchema';

export const EmailABTestResultCreateManyEmailInputEnvelopeSchema: z.ZodType<Prisma.EmailABTestResultCreateManyEmailInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailABTestResultCreateManyEmailInputSchema),z.lazy(() => EmailABTestResultCreateManyEmailInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailABTestResultCreateManyEmailInputEnvelopeSchema;
