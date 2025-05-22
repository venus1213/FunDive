import { z } from 'zod';

export const NotificationArchiveScalarFieldEnumSchema = z.enum(['id','originalId','userId','type','title','content','isRead','relatedId','createdAt','archivedAt']);

export default NotificationArchiveScalarFieldEnumSchema;
