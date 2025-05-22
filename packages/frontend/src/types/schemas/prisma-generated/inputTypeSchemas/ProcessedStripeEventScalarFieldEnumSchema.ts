import { z } from 'zod';

export const ProcessedStripeEventScalarFieldEnumSchema = z.enum(['id','eventId','type','processedAt','createdAt']);

export default ProcessedStripeEventScalarFieldEnumSchema;
