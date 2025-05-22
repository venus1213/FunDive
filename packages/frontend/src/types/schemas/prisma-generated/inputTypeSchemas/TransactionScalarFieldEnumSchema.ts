import { z } from 'zod';

export const TransactionScalarFieldEnumSchema = z.enum(['id','paymentId','type','amount','status','stripeTransactionId','metadata','createdAt','updatedAt']);

export default TransactionScalarFieldEnumSchema;
