import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { CategorySchema } from './CategorySchema';
import { EnumCategoryFieldUpdateOperationsInputSchema } from './EnumCategoryFieldUpdateOperationsInputSchema';
import { ProjectTypeSchema } from './ProjectTypeSchema';
import { EnumProjectTypeFieldUpdateOperationsInputSchema } from './EnumProjectTypeFieldUpdateOperationsInputSchema';
import { ProjectStatusSchema } from './ProjectStatusSchema';
import { EnumProjectStatusFieldUpdateOperationsInputSchema } from './EnumProjectStatusFieldUpdateOperationsInputSchema';
import { NullableFloatFieldUpdateOperationsInputSchema } from './NullableFloatFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { ProjectStageSchema } from './ProjectStageSchema';
import { NullableEnumProjectStageFieldUpdateOperationsInputSchema } from './NullableEnumProjectStageFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { MessageUncheckedUpdateManyWithoutProjectNestedInputSchema } from './MessageUncheckedUpdateManyWithoutProjectNestedInputSchema';
import { ReportUncheckedUpdateManyWithoutProjectNestedInputSchema } from './ReportUncheckedUpdateManyWithoutProjectNestedInputSchema';

export const ProjectUncheckedUpdateWithoutBookmarksInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutBookmarksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategorySchema),z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema) ]).optional(),
  projectType: z.union([ z.lazy(() => ProjectTypeSchema),z.lazy(() => EnumProjectTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProjectStatusSchema),z.lazy(() => EnumProjectStatusFieldUpdateOperationsInputSchema) ]).optional(),
  investmentAmount: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectStage: z.union([ z.lazy(() => ProjectStageSchema),z.lazy(() => NullableEnumProjectStageFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  popularityScore: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutProjectNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export default ProjectUncheckedUpdateWithoutBookmarksInputSchema;
