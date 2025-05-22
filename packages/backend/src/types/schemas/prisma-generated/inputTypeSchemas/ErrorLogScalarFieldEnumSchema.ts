import { z } from 'zod';

export const ErrorLogScalarFieldEnumSchema = z.enum(['id','userId','type','error','metadata','createdAt','updatedAt']);

export default ErrorLogScalarFieldEnumSchema;
