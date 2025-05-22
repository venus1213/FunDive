import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutBookmarksInputSchema } from './UserCreateNestedOneWithoutBookmarksInputSchema';
import { ProjectCreateNestedOneWithoutBookmarksInputSchema } from './ProjectCreateNestedOneWithoutBookmarksInputSchema';

export const BookmarkCreateInputSchema: z.ZodType<Prisma.BookmarkCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookmarksInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutBookmarksInputSchema)
}).strict();

export default BookmarkCreateInputSchema;
