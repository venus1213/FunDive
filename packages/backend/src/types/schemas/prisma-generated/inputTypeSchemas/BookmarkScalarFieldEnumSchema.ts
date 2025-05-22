import { z } from 'zod';

export const BookmarkScalarFieldEnumSchema = z.enum(['id','userId','projectId','createdAt']);

export default BookmarkScalarFieldEnumSchema;
