import { z } from 'zod';

export const EmailScheduleExecutionLogScalarFieldEnumSchema = z.enum(['id','scheduleId','status','emailLogId','error','createdAt']);

export default EmailScheduleExecutionLogScalarFieldEnumSchema;
