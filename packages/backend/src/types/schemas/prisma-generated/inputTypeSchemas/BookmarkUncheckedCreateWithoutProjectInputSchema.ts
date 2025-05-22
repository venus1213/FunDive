import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default BookmarkUncheckedCreateWithoutProjectInputSchema;
