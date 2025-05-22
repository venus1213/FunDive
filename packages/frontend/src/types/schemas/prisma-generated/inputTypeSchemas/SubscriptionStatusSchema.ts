import { z } from 'zod';

export const SubscriptionStatusSchema = z.enum(['active','canceled','past_due','unpaid','trialing','upgraded','downgrade_scheduled','pending_downgrade','incomplete','incomplete_expired','paused']);

export type SubscriptionStatusType = `${z.infer<typeof SubscriptionStatusSchema>}`

export default SubscriptionStatusSchema;
