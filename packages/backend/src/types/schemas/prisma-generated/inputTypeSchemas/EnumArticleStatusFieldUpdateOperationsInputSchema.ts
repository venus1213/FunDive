import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleStatusSchema } from './ArticleStatusSchema';

export const EnumArticleStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumArticleStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ArticleStatusSchema).optional()
}).strict();

export default EnumArticleStatusFieldUpdateOperationsInputSchema;
