import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithoutProjectInputSchema } from './BookmarkUpdateWithoutProjectInputSchema';
import { BookmarkUncheckedUpdateWithoutProjectInputSchema } from './BookmarkUncheckedUpdateWithoutProjectInputSchema';
import { BookmarkCreateWithoutProjectInputSchema } from './BookmarkCreateWithoutProjectInputSchema';
import { BookmarkUncheckedCreateWithoutProjectInputSchema } from './BookmarkUncheckedCreateWithoutProjectInputSchema';

export const BookmarkUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookmarkUpdateWithoutProjectInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProjectInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export default BookmarkUpsertWithWhereUniqueWithoutProjectInputSchema;
