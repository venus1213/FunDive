import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleUpdateManyMutationInputSchema } from '../inputTypeSchemas/ArticleUpdateManyMutationInputSchema'
import { ArticleUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ArticleUncheckedUpdateManyInputSchema'
import { ArticleWhereInputSchema } from '../inputTypeSchemas/ArticleWhereInputSchema'

export const ArticleUpdateManyArgsSchema: z.ZodType<Prisma.ArticleUpdateManyArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
}).strict() ;

export default ArticleUpdateManyArgsSchema;
