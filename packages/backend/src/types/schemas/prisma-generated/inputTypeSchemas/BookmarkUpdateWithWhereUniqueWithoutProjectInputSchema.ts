import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithoutProjectInputSchema } from './BookmarkUpdateWithoutProjectInputSchema';
import { BookmarkUncheckedUpdateWithoutProjectInputSchema } from './BookmarkUncheckedUpdateWithoutProjectInputSchema';

export const BookmarkUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateWithoutProjectInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export default BookmarkUpdateWithWhereUniqueWithoutProjectInputSchema;
