import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectTypeSchema } from './ProjectTypeSchema';

export const EnumProjectTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumProjectTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ProjectTypeSchema).optional()
}).strict();

export default EnumProjectTypeFieldUpdateOperationsInputSchema;
