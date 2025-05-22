import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { TransactionTypeSchema } from '../inputTypeSchemas/TransactionTypeSchema'
import { TransactionStatusSchema } from '../inputTypeSchemas/TransactionStatusSchema'

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  type: TransactionTypeSchema,
  status: TransactionStatusSchema,
  id: z.string().uuid(),
  paymentId: z.string(),
  amount: z.number(),
  stripeTransactionId: z.string().nullable(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Transaction = z.infer<typeof TransactionSchema>

export default TransactionSchema;
