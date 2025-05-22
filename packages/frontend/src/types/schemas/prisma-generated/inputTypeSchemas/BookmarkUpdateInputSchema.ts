import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutBookmarksNestedInputSchema } from './UserUpdateOneRequiredWithoutBookmarksNestedInputSchema';
import { ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema } from './ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema';

export const BookmarkUpdateInputSchema: z.ZodType<Prisma.BookmarkUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict();

export default BookmarkUpdateInputSchema;
