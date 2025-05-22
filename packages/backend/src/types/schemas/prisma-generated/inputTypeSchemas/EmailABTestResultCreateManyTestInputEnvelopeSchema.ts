import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestResultCreateManyTestInputSchema } from './EmailABTestResultCreateManyTestInputSchema';

export const EmailABTestResultCreateManyTestInputEnvelopeSchema: z.ZodType<Prisma.EmailABTestResultCreateManyTestInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailABTestResultCreateManyTestInputSchema),z.lazy(() => EmailABTestResultCreateManyTestInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default EmailABTestResultCreateManyTestInputEnvelopeSchema;
