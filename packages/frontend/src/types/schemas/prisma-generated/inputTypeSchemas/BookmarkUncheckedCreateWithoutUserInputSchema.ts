import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  projectId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default BookmarkUncheckedCreateWithoutUserInputSchema;
