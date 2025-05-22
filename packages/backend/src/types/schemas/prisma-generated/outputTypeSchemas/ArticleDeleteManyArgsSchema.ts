import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleWhereInputSchema } from '../inputTypeSchemas/ArticleWhereInputSchema'

export const ArticleDeleteManyArgsSchema: z.ZodType<Prisma.ArticleDeleteManyArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
}).strict() ;

export default ArticleDeleteManyArgsSchema;
