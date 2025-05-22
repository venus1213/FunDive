import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ArticleCreatetagsInputSchema: z.ZodType<Prisma.ArticleCreatetagsInput> = z.object({
  set: z.string().array()
}).strict();

export default ArticleCreatetagsInputSchema;
