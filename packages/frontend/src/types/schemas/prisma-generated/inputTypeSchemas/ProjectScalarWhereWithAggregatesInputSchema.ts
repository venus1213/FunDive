import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumCategoryWithAggregatesFilterSchema } from './EnumCategoryWithAggregatesFilterSchema';
import { CategorySchema } from './CategorySchema';
import { EnumProjectTypeWithAggregatesFilterSchema } from './EnumProjectTypeWithAggregatesFilterSchema';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { EnumProjectStatusWithAggregatesFilterSchema } from './EnumProjectStatusWithAggregatesFilterSchema';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { FloatNullableWithAggregatesFilterSchema } from './FloatNullableWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { EnumProjectStageNullableWithAggregatesFilterSchema } from './EnumProjectStageNullableWithAggregatesFilterSchema';
import { ProjectStageSchema } from './ProjectStageSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => EnumCategoryWithAggregatesFilterSchema),z.lazy(() => CategorySchema) ]).optional(),
  projectType: z.union([ z.lazy(() => EnumProjectTypeWithAggregatesFilterSchema),z.lazy(() => ProjectTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumProjectStatusWithAggregatesFilterSchema),z.lazy(() => ProjectStatusSchema) ]).optional(),
  investmentAmount: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectStage: z.union([ z.lazy(() => EnumProjectStageNullableWithAggregatesFilterSchema),z.lazy(() => ProjectStageSchema) ]).optional().nullable(),
  popularityScore: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ProjectScalarWhereWithAggregatesInputSchema;
