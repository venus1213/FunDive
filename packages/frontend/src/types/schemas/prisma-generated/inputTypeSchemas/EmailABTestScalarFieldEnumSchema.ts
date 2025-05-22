import { z } from 'zod';

export const EmailABTestScalarFieldEnumSchema = z.enum(['id','templateId','name','description','variantA','variantB','startDate','endDate','status','winningVariant','metrics','createdAt','updatedAt']);

export default EmailABTestScalarFieldEnumSchema;
