import { z } from 'zod';

export const EmailABTestResultScalarFieldEnumSchema = z.enum(['id','testId','variant','emailId','opened','clicked','createdAt']);

export default EmailABTestResultScalarFieldEnumSchema;
