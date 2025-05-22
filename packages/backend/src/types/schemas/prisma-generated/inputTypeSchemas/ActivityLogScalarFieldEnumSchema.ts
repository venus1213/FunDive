import { z } from 'zod';

export const ActivityLogScalarFieldEnumSchema = z.enum(['id','userId','actionType','targetType','targetId','details','ipAddress','userAgent','createdAt']);

export default ActivityLogScalarFieldEnumSchema;
