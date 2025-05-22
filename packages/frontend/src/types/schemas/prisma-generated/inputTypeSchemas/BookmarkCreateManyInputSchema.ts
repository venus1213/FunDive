import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkCreateManyInputSchema: z.ZodType<Prisma.BookmarkCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  projectId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default BookmarkCreateManyInputSchema;
