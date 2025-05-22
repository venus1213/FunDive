import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkScalarWhereInputSchema } from './BookmarkScalarWhereInputSchema';
import { BookmarkUpdateManyMutationInputSchema } from './BookmarkUpdateManyMutationInputSchema';
import { BookmarkUncheckedUpdateManyWithoutProjectInputSchema } from './BookmarkUncheckedUpdateManyWithoutProjectInputSchema';

export const BookmarkUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => BookmarkScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateManyMutationInputSchema),z.lazy(() => BookmarkUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export default BookmarkUpdateManyWithWhereWithoutProjectInputSchema;
