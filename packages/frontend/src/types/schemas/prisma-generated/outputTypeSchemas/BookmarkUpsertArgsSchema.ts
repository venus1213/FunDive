import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BookmarkIncludeSchema } from '../inputTypeSchemas/BookmarkIncludeSchema'
import { BookmarkWhereUniqueInputSchema } from '../inputTypeSchemas/BookmarkWhereUniqueInputSchema'
import { BookmarkCreateInputSchema } from '../inputTypeSchemas/BookmarkCreateInputSchema'
import { BookmarkUncheckedCreateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedCreateInputSchema'
import { BookmarkUpdateInputSchema } from '../inputTypeSchemas/BookmarkUpdateInputSchema'
import { BookmarkUncheckedUpdateInputSchema } from '../inputTypeSchemas/BookmarkUncheckedUpdateInputSchema'
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

export const BookmarkUpsertArgsSchema: z.ZodType<Prisma.BookmarkUpsertArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: z.lazy(() => BookmarkIncludeSchema).optional(),
  where: BookmarkWhereUniqueInputSchema,
  create: z.union([ BookmarkCreateInputSchema,BookmarkUncheckedCreateInputSchema ]),
  update: z.union([ BookmarkUpdateInputSchema,BookmarkUncheckedUpdateInputSchema ]),
}).strict() ;

export default BookmarkUpsertArgsSchema;
