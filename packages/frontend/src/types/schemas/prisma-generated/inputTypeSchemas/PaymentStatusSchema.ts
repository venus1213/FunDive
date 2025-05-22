import { z } from 'zod';

export const PaymentStatusSchema = z.enum(['pending','processing','completed','failed','refunded','cancelled']);

export type PaymentStatusType = `${z.infer<typeof PaymentStatusSchema>}`

export default PaymentStatusSchema;
