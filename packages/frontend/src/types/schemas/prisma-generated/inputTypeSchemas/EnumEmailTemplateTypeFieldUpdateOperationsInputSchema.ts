import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateTypeSchema } from './EmailTemplateTypeSchema';

export const EnumEmailTemplateTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEmailTemplateTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EmailTemplateTypeSchema).optional()
}).strict();

export default EnumEmailTemplateTypeFieldUpdateOperationsInputSchema;
