import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema } from './ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema';

export const BookmarkUpdateWithoutUserInputSchema: z.ZodType<Prisma.BookmarkUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict();

export default BookmarkUpdateWithoutUserInputSchema;
