import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkIncludeSchema } from '../inputTypeSchemas/BookmarkIncludeSchema'
import { BookmarkUpdateInputSchema } from '../inputTypeSchemas/BookmarkUpdateInputSchema'
import { BookmarkUncheckedUpdateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedUpdateInputSchema'
import { BookmarkWhereUniqueInputSchema } from '../inputTypeSchemas/BookmarkWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProjectArgsSchema } from "../outputTypeSchemas/ProjectArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BookmarkSelectSchema: z.ZodType<Prisma.BookmarkSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
}).strict()

export const BookmarkUpdateArgsSchema: z.ZodType<Prisma.BookmarkUpdateArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: z.lazy(() => BookmarkIncludeSchema).optional(),
  data: z.union([ BookmarkUpdateInputSchema,BookmarkUncheckedUpdateInputSchema ]),
  where: BookmarkWhereUniqueInputSchema,
}).strict() ;

export default BookmarkUpdateArgsSchema;
