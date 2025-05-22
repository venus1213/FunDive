import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStageSchema } from './ProjectStageSchema';

export const NullableEnumProjectStageFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumProjectStageFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ProjectStageSchema).optional().nullable()
}).strict();

export default NullableEnumProjectStageFieldUpdateOperationsInputSchema;
