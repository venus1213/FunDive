import { z } from 'zod';

export const MessageScalarFieldEnumSchema = z.enum(['id','senderId','receiverId','projectId','content','isRead','messageType','createdAt']);

export default MessageScalarFieldEnumSchema;
