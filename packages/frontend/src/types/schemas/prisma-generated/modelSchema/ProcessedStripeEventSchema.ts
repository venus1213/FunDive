import { z } from 'zod';

/////////////////////////////////////////
// PROCESSED STRIPE EVENT SCHEMA
/////////////////////////////////////////

export const ProcessedStripeEventSchema = z.object({
  id: z.string().cuid(),
  eventId: z.string(),
  type: z.string(),
  processedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type ProcessedStripeEvent = z.infer<typeof ProcessedStripeEventSchema>

export default ProcessedStripeEventSchema;
