import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkCreateManyInputSchema } from '../inputTypeSchemas/BookmarkCreateManyInputSchema'

export const BookmarkCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BookmarkCreateManyAndReturnArgs> = z.object({
  data: z.union([ BookmarkCreateManyInputSchema,BookmarkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BookmarkCreateManyAndReturnArgsSchema;
