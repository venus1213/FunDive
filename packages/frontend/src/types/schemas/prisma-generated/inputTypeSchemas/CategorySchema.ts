import { z } from 'zod';

export const CategorySchema = z.enum(['tech','finance','retail','healthcare','education','other']);

export type CategoryType = `${z.infer<typeof CategorySchema>}`

export default CategorySchema;
