import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { MessageFindManyArgsSchema } from "../outputTypeSchemas/MessageFindManyArgsSchema"
import { BookmarkFindManyArgsSchema } from "../outputTypeSchemas/BookmarkFindManyArgsSchema"
import { ReportFindManyArgsSchema } from "../outputTypeSchemas/ReportFindManyArgsSchema"
import { ProjectCountOutputTypeArgsSchema } from "../outputTypeSchemas/ProjectCountOutputTypeArgsSchema"

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  reports: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ProjectIncludeSchema;
