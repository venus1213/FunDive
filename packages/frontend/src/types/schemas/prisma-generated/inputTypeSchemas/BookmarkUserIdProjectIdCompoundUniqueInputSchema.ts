import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const BookmarkUserIdProjectIdCompoundUniqueInputSchema: z.ZodType<Prisma.BookmarkUserIdProjectIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  projectId: z.string()
}).strict();

export default BookmarkUserIdProjectIdCompoundUniqueInputSchema;
