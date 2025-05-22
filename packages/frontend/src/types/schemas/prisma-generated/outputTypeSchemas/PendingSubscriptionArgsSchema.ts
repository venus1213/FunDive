import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PendingSubscriptionSelectSchema } from '../inputTypeSchemas/PendingSubscriptionSelectSchema';
import { PendingSubscriptionIncludeSchema } from '../inputTypeSchemas/PendingSubscriptionIncludeSchema';

export const PendingSubscriptionArgsSchema: z.ZodType<Prisma.PendingSubscriptionDefaultArgs> = z.object({
  select: z.lazy(() => PendingSubscriptionSelectSchema).optional(),
  include: z.lazy(() => PendingSubscriptionIncludeSchema).optional(),
}).strict();

export default PendingSubscriptionArgsSchema;
