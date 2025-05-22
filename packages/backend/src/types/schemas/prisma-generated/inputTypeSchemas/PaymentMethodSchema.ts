import { z } from 'zod';

export const PaymentMethodSchema = z.enum(['credit_card','bank_transfer','convenience_store']);

export type PaymentMethodType = `${z.infer<typeof PaymentMethodSchema>}`

export default PaymentMethodSchema;
