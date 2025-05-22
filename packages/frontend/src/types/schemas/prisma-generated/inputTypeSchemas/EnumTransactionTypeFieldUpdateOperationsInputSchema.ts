import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TransactionTypeSchema } from './TransactionTypeSchema';

export const EnumTransactionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTransactionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TransactionTypeSchema).optional()
}).strict();

export default EnumTransactionTypeFieldUpdateOperationsInputSchema;
