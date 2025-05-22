import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategorySchema } from './CategorySchema';

export const EnumCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCategoryFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CategorySchema).optional()
}).strict();

export default EnumCategoryFieldUpdateOperationsInputSchema;
