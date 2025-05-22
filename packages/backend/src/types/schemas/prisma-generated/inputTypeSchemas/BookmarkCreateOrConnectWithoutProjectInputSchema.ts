import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkCreateWithoutProjectInputSchema } from './BookmarkCreateWithoutProjectInputSchema';
import { BookmarkUncheckedCreateWithoutProjectInputSchema } from './BookmarkUncheckedCreateWithoutProjectInputSchema';

export const BookmarkCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProjectInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export default BookmarkCreateOrConnectWithoutProjectInputSchema;
