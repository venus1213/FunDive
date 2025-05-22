import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkCreateManyUserInputSchema: z.ZodType<Prisma.BookmarkCreateManyUserInput> = z.object({
  id: z.string().optional(),
  projectId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default BookmarkCreateManyUserInputSchema;
