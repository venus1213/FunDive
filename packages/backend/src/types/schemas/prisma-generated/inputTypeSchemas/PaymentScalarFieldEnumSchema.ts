import { z } from 'zod';

export const PaymentScalarFieldEnumSchema = z.enum(['id','userId','amount','currency','status','paymentMethod','stripePaymentId','description','metadata','createdAt','updatedAt']);

export default PaymentScalarFieldEnumSchema;
