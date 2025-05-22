import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutCreatorInputSchema } from './EmailTemplateCreateWithoutCreatorInputSchema';
import { EmailTemplateUncheckedCreateWithoutCreatorInputSchema } from './EmailTemplateUncheckedCreateWithoutCreatorInputSchema';
import { EmailTemplateCreateOrConnectWithoutCreatorInputSchema } from './EmailTemplateCreateOrConnectWithoutCreatorInputSchema';
import { EmailTemplateCreateManyCreatorInputEnvelopeSchema } from './EmailTemplateCreateManyCreatorInputEnvelopeSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';

export const EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.EmailTemplateUncheckedCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateCreateWithoutCreatorInputSchema).array(),z.lazy(() => EmailTemplateUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailTemplateCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => EmailTemplateCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailTemplateCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputSchema;
