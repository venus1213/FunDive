import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SubscriptionStatusSchema } from './SubscriptionStatusSchema';

export const EnumSubscriptionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SubscriptionStatusSchema).optional()
}).strict();

export default EnumSubscriptionStatusFieldUpdateOperationsInputSchema;
