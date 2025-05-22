import { z } from 'zod';

export const ArticleStatusSchema = z.enum(['draft','published','archived']);

export type ArticleStatusType = `${z.infer<typeof ArticleStatusSchema>}`

export default ArticleStatusSchema;
