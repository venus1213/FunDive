import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateManyProjectInputSchema } from './BookmarkCreateManyProjectInputSchema';

export const BookmarkCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.BookmarkCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookmarkCreateManyProjectInputSchema),z.lazy(() => BookmarkCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default BookmarkCreateManyProjectInputEnvelopeSchema;
