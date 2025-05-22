import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategorySchema } from './CategorySchema';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { ProjectStageSchema } from './ProjectStageSchema';
import { UserCreateNestedOneWithoutProjectsInputSchema } from './UserCreateNestedOneWithoutProjectsInputSchema';
import { MessageCreateNestedManyWithoutProjectInputSchema } from './MessageCreateNestedManyWithoutProjectInputSchema';
import { BookmarkCreateNestedManyWithoutProjectInputSchema } from './BookmarkCreateNestedManyWithoutProjectInputSchema';
import { ReportCreateNestedManyWithoutProjectInputSchema } from './ReportCreateNestedManyWithoutProjectInputSchema';

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  category: z.lazy(() => CategorySchema),
  projectType: z.lazy(() => ProjectTypeSchema),
  status: z.lazy(() => ProjectStatusSchema).optional(),
  investmentAmount: z.number().optional().nullable(),
  location: z.string().optional().nullable(),
  projectStage: z.lazy(() => ProjectStageSchema).optional().nullable(),
  popularityScore: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProjectsInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutProjectInputSchema).optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutProjectInputSchema).optional(),
  reports: z.lazy(() => ReportCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export default ProjectCreateInputSchema;
