import { z } from 'zod';

export const TransactionTypeSchema = z.enum(['payment','refund','transfer','adjustment']);

export type TransactionTypeType = `${z.infer<typeof TransactionTypeSchema>}`

export default TransactionTypeSchema;
