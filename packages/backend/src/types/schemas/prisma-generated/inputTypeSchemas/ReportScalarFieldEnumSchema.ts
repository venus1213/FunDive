import { z } from 'zod';

export const ReportScalarFieldEnumSchema = z.enum(['id','reporterId','targetType','targetId','reason','status','comment','adminComment','createdAt','updatedAt']);

export default ReportScalarFieldEnumSchema;
