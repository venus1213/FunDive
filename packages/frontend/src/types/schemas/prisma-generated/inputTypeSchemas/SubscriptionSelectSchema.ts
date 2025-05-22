import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  stripeCustomerId: z.boolean().optional(),
  stripeSubscriptionId: z.boolean().optional(),
  status: z.boolean().optional(),
  currentPeriodStart: z.boolean().optional(),
  currentPeriodEnd: z.boolean().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  nextPlanPriceId: z.boolean().optional(),
  nextPlanStartDate: z.boolean().optional(),
  prorationAmount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default SubscriptionSelectSchema;
