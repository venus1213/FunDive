import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutTemplateInputSchema } from './EmailLogCreateWithoutTemplateInputSchema';
import { EmailLogUncheckedCreateWithoutTemplateInputSchema } from './EmailLogUncheckedCreateWithoutTemplateInputSchema';
import { EmailLogCreateOrConnectWithoutTemplateInputSchema } from './EmailLogCreateOrConnectWithoutTemplateInputSchema';
import { EmailLogUpsertWithWhereUniqueWithoutTemplateInputSchema } from './EmailLogUpsertWithWhereUniqueWithoutTemplateInputSchema';
import { EmailLogCreateManyTemplateInputEnvelopeSchema } from './EmailLogCreateManyTemplateInputEnvelopeSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateWithWhereUniqueWithoutTemplateInputSchema } from './EmailLogUpdateWithWhereUniqueWithoutTemplateInputSchema';
import { EmailLogUpdateManyWithWhereWithoutTemplateInputSchema } from './EmailLogUpdateManyWithWhereWithoutTemplateInputSchema';
import { EmailLogScalarWhereInputSchema } from './EmailLogScalarWhereInputSchema';

export const EmailLogUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.EmailLogUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutTemplateInputSchema),z.lazy(() => EmailLogCreateWithoutTemplateInputSchema).array(),z.lazy(() => EmailLogUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailLogCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => EmailLogCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailLogUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => EmailLogUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailLogCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailLogWhereUniqueInputSchema),z.lazy(() => EmailLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailLogUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => EmailLogUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailLogUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => EmailLogUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailLogScalarWhereInputSchema),z.lazy(() => EmailLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailLogUpdateManyWithoutTemplateNestedInputSchema;
