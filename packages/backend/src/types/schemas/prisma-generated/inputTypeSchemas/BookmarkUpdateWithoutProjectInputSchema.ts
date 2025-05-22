import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutBookmarksNestedInputSchema } from './UserUpdateOneRequiredWithoutBookmarksNestedInputSchema';

export const BookmarkUpdateWithoutProjectInputSchema: z.ZodType<Prisma.BookmarkUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict();

export default BookmarkUpdateWithoutProjectInputSchema;
