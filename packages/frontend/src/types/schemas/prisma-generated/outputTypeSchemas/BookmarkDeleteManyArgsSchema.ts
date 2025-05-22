import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkWhereInputSchema } from '../inputTypeSchemas/BookmarkWhereInputSchema'

export const BookmarkDeleteManyArgsSchema: z.ZodType<Prisma.BookmarkDeleteManyArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default BookmarkDeleteManyArgsSchema;
