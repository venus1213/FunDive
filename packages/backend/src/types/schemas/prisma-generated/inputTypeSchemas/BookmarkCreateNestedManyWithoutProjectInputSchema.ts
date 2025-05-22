import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateWithoutProjectInputSchema } from './BookmarkCreateWithoutProjectInputSchema';
import { BookmarkUncheckedCreateWithoutProjectInputSchema } from './BookmarkUncheckedCreateWithoutProjectInputSchema';
import { BookmarkCreateOrConnectWithoutProjectInputSchema } from './BookmarkCreateOrConnectWithoutProjectInputSchema';
import { BookmarkCreateManyProjectInputEnvelopeSchema } from './BookmarkCreateManyProjectInputEnvelopeSchema';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';

export const BookmarkCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProjectInputSchema),z.lazy(() => BookmarkCreateWithoutProjectInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutProjectInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutProjectInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default BookmarkCreateNestedManyWithoutProjectInputSchema;
