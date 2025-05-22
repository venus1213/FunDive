import { z } from 'zod';

export const EmailTemplateScalarFieldEnumSchema = z.enum(['id','name','subject','body','type','variables','isActive','previewData','createdAt','updatedAt','createdBy','updatedBy']);

export default EmailTemplateScalarFieldEnumSchema;
