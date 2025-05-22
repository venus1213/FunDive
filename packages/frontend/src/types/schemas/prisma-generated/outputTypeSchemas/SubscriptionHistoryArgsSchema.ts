import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SubscriptionHistorySelectSchema } from '../inputTypeSchemas/SubscriptionHistorySelectSchema';
import { SubscriptionHistoryIncludeSchema } from '../inputTypeSchemas/SubscriptionHistoryIncludeSchema';

export const SubscriptionHistoryArgsSchema: z.ZodType<Prisma.SubscriptionHistoryDefaultArgs> = z.object({
  select: z.lazy(() => SubscriptionHistorySelectSchema).optional(),
  include: z.lazy(() => SubscriptionHistoryIncludeSchema).optional(),
}).strict();

export default SubscriptionHistoryArgsSchema;
