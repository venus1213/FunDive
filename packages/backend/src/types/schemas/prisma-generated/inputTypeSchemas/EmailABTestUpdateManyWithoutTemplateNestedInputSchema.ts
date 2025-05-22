import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateWithoutTemplateInputSchema } from './EmailABTestCreateWithoutTemplateInputSchema';
import { EmailABTestUncheckedCreateWithoutTemplateInputSchema } from './EmailABTestUncheckedCreateWithoutTemplateInputSchema';
import { EmailABTestCreateOrConnectWithoutTemplateInputSchema } from './EmailABTestCreateOrConnectWithoutTemplateInputSchema';
import { EmailABTestUpsertWithWhereUniqueWithoutTemplateInputSchema } from './EmailABTestUpsertWithWhereUniqueWithoutTemplateInputSchema';
import { EmailABTestCreateManyTemplateInputEnvelopeSchema } from './EmailABTestCreateManyTemplateInputEnvelopeSchema';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';
import { EmailABTestUpdateWithWhereUniqueWithoutTemplateInputSchema } from './EmailABTestUpdateWithWhereUniqueWithoutTemplateInputSchema';
import { EmailABTestUpdateManyWithWhereWithoutTemplateInputSchema } from './EmailABTestUpdateManyWithWhereWithoutTemplateInputSchema';
import { EmailABTestScalarWhereInputSchema } from './EmailABTestScalarWhereInputSchema';

export const EmailABTestUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.EmailABTestUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTemplateInputSchema),z.lazy(() => EmailABTestCreateWithoutTemplateInputSchema).array(),z.lazy(() => EmailABTestUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailABTestCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => EmailABTestCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailABTestUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => EmailABTestUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailABTestCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailABTestWhereUniqueInputSchema),z.lazy(() => EmailABTestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailABTestWhereUniqueInputSchema),z.lazy(() => EmailABTestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailABTestWhereUniqueInputSchema),z.lazy(() => EmailABTestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailABTestWhereUniqueInputSchema),z.lazy(() => EmailABTestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailABTestUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => EmailABTestUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailABTestUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => EmailABTestUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailABTestScalarWhereInputSchema),z.lazy(() => EmailABTestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailABTestUpdateManyWithoutTemplateNestedInputSchema;
