import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { MessageTypeSchema } from './MessageTypeSchema';
import { EnumMessageTypeFieldUpdateOperationsInputSchema } from './EnumMessageTypeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateManyWithoutMentionedInMessagesNestedInputSchema } from './UserUpdateManyWithoutMentionedInMessagesNestedInputSchema';
import { UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema } from './UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema';
import { UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema } from './UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema';

export const MessageUpdateWithoutProjectInputSchema: z.ZodType<Prisma.MessageUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messageType: z.union([ z.lazy(() => MessageTypeSchema),z.lazy(() => EnumMessageTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  mentionedUsers: z.lazy(() => UserUpdateManyWithoutMentionedInMessagesNestedInputSchema).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional(),
  receiver: z.lazy(() => UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema).optional()
}).strict();

export default MessageUpdateWithoutProjectInputSchema;
