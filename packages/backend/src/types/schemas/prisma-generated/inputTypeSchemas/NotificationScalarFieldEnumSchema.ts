import { z } from 'zod';

export const NotificationScalarFieldEnumSchema = z.enum(['id','userId','type','title','content','isRead','relatedId','createdAt']);

export default NotificationScalarFieldEnumSchema;
