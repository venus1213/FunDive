import { z } from 'zod';

export const EmailScheduleScalarFieldEnumSchema = z.enum(['id','templateId','name','description','recipientIds','scheduleType','cronExpression','sendAt','variables','status','lastRunAt','nextRunAt','createdAt','updatedAt']);

export default EmailScheduleScalarFieldEnumSchema;
