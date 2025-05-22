import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutUpdaterInputSchema } from './EmailTemplateCreateWithoutUpdaterInputSchema';
import { EmailTemplateUncheckedCreateWithoutUpdaterInputSchema } from './EmailTemplateUncheckedCreateWithoutUpdaterInputSchema';
import { EmailTemplateCreateOrConnectWithoutUpdaterInputSchema } from './EmailTemplateCreateOrConnectWithoutUpdaterInputSchema';
import { EmailTemplateCreateManyUpdaterInputEnvelopeSchema } from './EmailTemplateCreateManyUpdaterInputEnvelopeSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';

export const EmailTemplateUncheckedCreateNestedManyWithoutUpdaterInputSchema: z.ZodType<Prisma.EmailTemplateUncheckedCreateNestedManyWithoutUpdaterInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateCreateWithoutUpdaterInputSchema).array(),z.lazy(() => EmailTemplateUncheckedCreateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutUpdaterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailTemplateCreateOrConnectWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateCreateOrConnectWithoutUpdaterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailTemplateCreateManyUpdaterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailTemplateUncheckedCreateNestedManyWithoutUpdaterInputSchema;
