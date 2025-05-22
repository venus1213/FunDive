import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategorySchema } from './CategorySchema';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { ProjectStageSchema } from './ProjectStageSchema';
import { BookmarkUncheckedCreateNestedManyWithoutProjectInputSchema } from './BookmarkUncheckedCreateNestedManyWithoutProjectInputSchema';
import { ReportUncheckedCreateNestedManyWithoutProjectInputSchema } from './ReportUncheckedCreateNestedManyWithoutProjectInputSchema';

export const ProjectUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutProjectInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export default ProjectUncheckedCreateWithoutMessagesInputSchema;
