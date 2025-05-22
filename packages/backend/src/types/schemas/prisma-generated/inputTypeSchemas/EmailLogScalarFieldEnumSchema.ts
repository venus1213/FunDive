import { z } from 'zod';

export const EmailLogScalarFieldEnumSchema = z.enum(['id','templateId','recipientIds','subject','body','status','sentAt','sentBy','metadata','errorDetails']);

export default EmailLogScalarFieldEnumSchema;
