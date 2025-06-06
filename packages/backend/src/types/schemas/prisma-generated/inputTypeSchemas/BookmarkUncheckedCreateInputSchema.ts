import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkUncheckedCreateInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  projectId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default BookmarkUncheckedCreateInputSchema;
