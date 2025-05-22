import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkCreateManyProjectInputSchema: z.ZodType<Prisma.BookmarkCreateManyProjectInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default BookmarkCreateManyProjectInputSchema;
