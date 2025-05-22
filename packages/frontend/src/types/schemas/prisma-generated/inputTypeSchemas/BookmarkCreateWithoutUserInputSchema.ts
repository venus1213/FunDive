import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectCreateNestedOneWithoutBookmarksInputSchema } from './ProjectCreateNestedOneWithoutBookmarksInputSchema';

export const BookmarkCreateWithoutUserInputSchema: z.ZodType<Prisma.BookmarkCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutBookmarksInputSchema)
}).strict();

export default BookmarkCreateWithoutUserInputSchema;
