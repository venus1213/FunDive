import { z } from 'zod';

export const NotificationSettingScalarFieldEnumSchema = z.enum(['id','userId','emailEnabled','directMessageEnabled','projectMessageEnabled','mentionEnabled','createdAt','updatedAt']);

export default NotificationSettingScalarFieldEnumSchema;
