import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { EmailABTestUpdateOneRequiredWithoutTestResultsNestedInputSchema } from './EmailABTestUpdateOneRequiredWithoutTestResultsNestedInputSchema';
import { EmailLogUpdateOneRequiredWithoutAbTestResultsNestedInputSchema } from './EmailLogUpdateOneRequiredWithoutAbTestResultsNestedInputSchema';

export const EmailABTestResultUpdateInputSchema: z.ZodType<Prisma.EmailABTestResultUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  variant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opened: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  clicked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  test: z.lazy(() => EmailABTestUpdateOneRequiredWithoutTestResultsNestedInputSchema).optional(),
  email: z.lazy(() => EmailLogUpdateOneRequiredWithoutAbTestResultsNestedInputSchema).optional()
}).strict();

export default EmailABTestResultUpdateInputSchema;
