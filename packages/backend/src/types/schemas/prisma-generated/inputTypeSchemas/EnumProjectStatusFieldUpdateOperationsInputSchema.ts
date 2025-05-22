import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectStatusSchema } from './ProjectStatusSchema';

export const EnumProjectStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumProjectStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ProjectStatusSchema).optional()
}).strict();

export default EnumProjectStatusFieldUpdateOperationsInputSchema;
