import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ArticleStatusSchema } from './ArticleStatusSchema';
import { EnumArticleStatusFieldUpdateOperationsInputSchema } from './EnumArticleStatusFieldUpdateOperationsInputSchema';
import { ArticleUpdatetagsInputSchema } from './ArticleUpdatetagsInputSchema';
import { UserUpdateOneRequiredWithoutArticlesNestedInputSchema } from './UserUpdateOneRequiredWithoutArticlesNestedInputSchema';

export const ArticleUpdateInputSchema: z.ZodType<Prisma.ArticleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ArticleStatusSchema),z.lazy(() => EnumArticleStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => ArticleUpdatetagsInputSchema),z.string().array() ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutArticlesNestedInputSchema).optional()
}).strict();

export default ArticleUpdateInputSchema;
