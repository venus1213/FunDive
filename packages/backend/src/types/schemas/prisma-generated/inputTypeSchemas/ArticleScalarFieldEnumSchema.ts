import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','slug','title','description','content','thumbnail','publishedAt','updatedAt','createdAt','authorId','status','tags']);

export default ArticleScalarFieldEnumSchema;
