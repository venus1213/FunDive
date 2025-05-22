import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleCreateWithoutTemplateInputSchema } from './EmailScheduleCreateWithoutTemplateInputSchema';
import { EmailScheduleUncheckedCreateWithoutTemplateInputSchema } from './EmailScheduleUncheckedCreateWithoutTemplateInputSchema';
import { EmailScheduleCreateOrConnectWithoutTemplateInputSchema } from './EmailScheduleCreateOrConnectWithoutTemplateInputSchema';
import { EmailScheduleCreateManyTemplateInputEnvelopeSchema } from './EmailScheduleCreateManyTemplateInputEnvelopeSchema';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';

export const EmailScheduleCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.EmailScheduleCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleCreateWithoutTemplateInputSchema).array(),z.lazy(() => EmailScheduleUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailScheduleCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => EmailScheduleCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailScheduleCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailScheduleWhereUniqueInputSchema),z.lazy(() => EmailScheduleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailScheduleCreateNestedManyWithoutTemplateInputSchema;
