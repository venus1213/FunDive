import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { MessageTypeSchema } from './MessageTypeSchema';
import { EnumMessageTypeFieldUpdateOperationsInputSchema } from './EnumMessageTypeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateManyWithoutMentionedInMessagesNestedInputSchema } from './UserUpdateManyWithoutMentionedInMessagesNestedInputSchema';
import { UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema } from './UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema';
import { ProjectUpdateOneWithoutMessagesNestedInputSchema } from './ProjectUpdateOneWithoutMessagesNestedInputSchema';

export const MessageUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messageType: z.union([ z.lazy(() => MessageTypeSchema),z.lazy(() => EnumMessageTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  mentionedUsers: z.lazy(() => UserUpdateManyWithoutMentionedInMessagesNestedInputSchema).optional(),
  receiver: z.lazy(() => UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export default MessageUpdateWithoutSenderInputSchema;
