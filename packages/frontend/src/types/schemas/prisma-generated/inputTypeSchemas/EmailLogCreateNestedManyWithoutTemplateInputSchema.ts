import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutTemplateInputSchema } from './EmailLogCreateWithoutTemplateInputSchema';
import { EmailLogUncheckedCreateWithoutTemplateInputSchema } from './EmailLogUncheckedCreateWithoutTemplateInputSchema';
import { EmailLogCreateOrConnectWithoutTemplateInputSchema } from './EmailLogCreateOrConnectWithoutTemplateInputSchema';
import { EmailLogCreateManyTemplateInputEnvelopeSchema } from './EmailLogCreateManyTemplateInputEnvelopeSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';

export const EmailLogCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.EmailLogCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutTemplateInputSchema),z.lazy(() => EmailLogCreateWithoutTemplateInputSchema).array(),z.lazy(() => EmailLogUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailLogCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => EmailLogCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailLogCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailLogCreateNestedManyWithoutTemplateInputSchema;
