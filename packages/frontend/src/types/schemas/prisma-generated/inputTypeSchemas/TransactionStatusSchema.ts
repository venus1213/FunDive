import { z } from 'zod';

export const TransactionStatusSchema = z.enum(['pending','completed','failed','reversed']);

export type TransactionStatusType = `${z.infer<typeof TransactionStatusSchema>}`

export default TransactionStatusSchema;
