import { z } from 'zod';

export const MessageTypeSchema = z.enum(['direct','project']);

export type MessageTypeType = `${z.infer<typeof MessageTypeSchema>}`

export default MessageTypeSchema;
