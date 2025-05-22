import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutUpdaterInputSchema } from './EmailTemplateCreateWithoutUpdaterInputSchema';
import { EmailTemplateUncheckedCreateWithoutUpdaterInputSchema } from './EmailTemplateUncheckedCreateWithoutUpdaterInputSchema';
import { EmailTemplateCreateOrConnectWithoutUpdaterInputSchema } from './EmailTemplateCreateOrConnectWithoutUpdaterInputSchema';
import { EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInputSchema } from './EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInputSchema';
import { EmailTemplateCreateManyUpdaterInputEnvelopeSchema } from './EmailTemplateCreateManyUpdaterInputEnvelopeSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInputSchema } from './EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInputSchema';
import { EmailTemplateUpdateManyWithWhereWithoutUpdaterInputSchema } from './EmailTemplateUpdateManyWithWhereWithoutUpdaterInputSchema';
import { EmailTemplateScalarWhereInputSchema } from './EmailTemplateScalarWhereInputSchema';

export const EmailTemplateUncheckedUpdateManyWithoutUpdaterNestedInputSchema: z.ZodType<Prisma.EmailTemplateUncheckedUpdateManyWithoutUpdaterNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateCreateWithoutUpdaterInputSchema).array(),z.lazy(() => EmailTemplateUncheckedCreateWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutUpdaterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailTemplateCreateOrConnectWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateCreateOrConnectWithoutUpdaterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUpsertWithWhereUniqueWithoutUpdaterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailTemplateCreateManyUpdaterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUpdateWithWhereUniqueWithoutUpdaterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailTemplateUpdateManyWithWhereWithoutUpdaterInputSchema),z.lazy(() => EmailTemplateUpdateManyWithWhereWithoutUpdaterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailTemplateScalarWhereInputSchema),z.lazy(() => EmailTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailTemplateUncheckedUpdateManyWithoutUpdaterNestedInputSchema;
