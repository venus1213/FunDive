import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutBookmarksInputSchema } from './UserCreateNestedOneWithoutBookmarksInputSchema';

export const BookmarkCreateWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkCreateWithoutProjectInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBookmarksInputSchema)
}).strict();

export default BookmarkCreateWithoutProjectInputSchema;
