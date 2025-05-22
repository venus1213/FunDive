import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailTemplateCreateWithoutCreatorInputSchema } from './EmailTemplateCreateWithoutCreatorInputSchema';
import { EmailTemplateUncheckedCreateWithoutCreatorInputSchema } from './EmailTemplateUncheckedCreateWithoutCreatorInputSchema';
import { EmailTemplateCreateOrConnectWithoutCreatorInputSchema } from './EmailTemplateCreateOrConnectWithoutCreatorInputSchema';
import { EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputSchema } from './EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputSchema';
import { EmailTemplateCreateManyCreatorInputEnvelopeSchema } from './EmailTemplateCreateManyCreatorInputEnvelopeSchema';
import { EmailTemplateWhereUniqueInputSchema } from './EmailTemplateWhereUniqueInputSchema';
import { EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputSchema } from './EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputSchema';
import { EmailTemplateUpdateManyWithWhereWithoutCreatorInputSchema } from './EmailTemplateUpdateManyWithWhereWithoutCreatorInputSchema';
import { EmailTemplateScalarWhereInputSchema } from './EmailTemplateScalarWhereInputSchema';

export const EmailTemplateUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.EmailTemplateUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailTemplateCreateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateCreateWithoutCreatorInputSchema).array(),z.lazy(() => EmailTemplateUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailTemplateCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => EmailTemplateCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailTemplateCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailTemplateWhereUniqueInputSchema),z.lazy(() => EmailTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailTemplateUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => EmailTemplateUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailTemplateScalarWhereInputSchema),z.lazy(() => EmailTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailTemplateUpdateManyWithoutCreatorNestedInputSchema;
