import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateWithoutTemplateInputSchema } from './EmailABTestCreateWithoutTemplateInputSchema';
import { EmailABTestUncheckedCreateWithoutTemplateInputSchema } from './EmailABTestUncheckedCreateWithoutTemplateInputSchema';
import { EmailABTestCreateOrConnectWithoutTemplateInputSchema } from './EmailABTestCreateOrConnectWithoutTemplateInputSchema';
import { EmailABTestCreateManyTemplateInputEnvelopeSchema } from './EmailABTestCreateManyTemplateInputEnvelopeSchema';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';

export const EmailABTestCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.EmailABTestCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTemplateInputSchema),z.lazy(() => EmailABTestCreateWithoutTemplateInputSchema).array(),z.lazy(() => EmailABTestUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailABTestCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => EmailABTestCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailABTestCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailABTestWhereUniqueInputSchema),z.lazy(() => EmailABTestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default EmailABTestCreateNestedManyWithoutTemplateInputSchema;
