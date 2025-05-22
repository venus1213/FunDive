import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BookmarkCreateWithoutProjectInputSchema } from './BookmarkCreateWithoutProjectInputSchema';
import { BookmarkUncheckedCreateWithoutProjectInputSchema } from './BookmarkUncheckedCreateWithoutProjectInputSchema';
import { BookmarkCreateOrConnectWithoutProjectInputSchema } from './BookmarkCreateOrConnectWithoutProjectInputSchema';
import { BookmarkUpsertWithWhereUniqueWithoutProjectInputSchema } from './BookmarkUpsertWithWhereUniqueWithoutProjectInputSchema';
import { BookmarkCreateManyProjectInputEnvelopeSchema } from './BookmarkCreateManyProjectInputEnvelopeSchema';
import { BookmarkWhereUniqueInputSchema } from './BookmarkWhereUniqueInputSchema';
import { BookmarkUpdateWithWhereUniqueWithoutProjectInputSchema } from './BookmarkUpdateWithWhereUniqueWithoutProjectInputSchema';
import { BookmarkUpdateManyWithWhereWithoutProjectInputSchema } from './BookmarkUpdateManyWithWhereWithoutProjectInputSchema';
import { BookmarkScalarWhereInputSchema } from './BookmarkScalarWhereInputSchema';

export const BookmarkUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProjectInputSchema),z.lazy(() => BookmarkCreateWithoutProjectInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutProjectInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutProjectInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default BookmarkUpdateManyWithoutProjectNestedInputSchema;
