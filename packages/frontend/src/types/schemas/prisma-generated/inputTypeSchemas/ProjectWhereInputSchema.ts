import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumCategoryFilterSchema } from './EnumCategoryFilterSchema';
import { CategorySchema } from './CategorySchema';
import { EnumProjectTypeFilterSchema } from './EnumProjectTypeFilterSchema';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { EnumProjectStatusFilterSchema } from './EnumProjectStatusFilterSchema';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumProjectStageNullableFilterSchema } from './EnumProjectStageNullableFilterSchema';
import { ProjectStageSchema } from './ProjectStageSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { MessageListRelationFilterSchema } from './MessageListRelationFilterSchema';
import { BookmarkListRelationFilterSchema } from './BookmarkListRelationFilterSchema';
import { ReportListRelationFilterSchema } from './ReportListRelationFilterSchema';

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => EnumCategoryFilterSchema),z.lazy(() => CategorySchema) ]).optional(),
  projectType: z.union([ z.lazy(() => EnumProjectTypeFilterSchema),z.lazy(() => ProjectTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumProjectStatusFilterSchema),z.lazy(() => ProjectStatusSchema) ]).optional(),
  investmentAmount: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectStage: z.union([ z.lazy(() => EnumProjectStageNullableFilterSchema),z.lazy(() => ProjectStageSchema) ]).optional().nullable(),
  popularityScore: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional(),
  reports: z.lazy(() => ReportListRelationFilterSchema).optional()
}).strict();

export default ProjectWhereInputSchema;
