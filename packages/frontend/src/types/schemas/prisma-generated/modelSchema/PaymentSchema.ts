import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { PaymentStatusSchema } from '../inputTypeSchemas/PaymentStatusSchema'
import { PaymentMethodSchema } from '../inputTypeSchemas/PaymentMethodSchema'

/////////////////////////////////////////
// PAYMENT SCHEMA
/////////////////////////////////////////

export const PaymentSchema = z.object({
  status: PaymentStatusSchema,
  paymentMethod: PaymentMethodSchema,
  id: z.string().uuid(),
  userId: z.string(),
  amount: z.number(),
  currency: z.string(),
  stripePaymentId: z.string().nullable(),
  description: z.string().nullable(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Payment = z.infer<typeof PaymentSchema>

export default PaymentSchema;
