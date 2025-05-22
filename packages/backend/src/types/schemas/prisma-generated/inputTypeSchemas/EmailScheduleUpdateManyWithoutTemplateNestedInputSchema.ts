import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailScheduleCreateWithoutTemplateInputSchema } from './EmailScheduleCreateWithoutTemplateInputSchema';
import { EmailScheduleUncheckedCreateWithoutTemplateInputSchema } from './EmailScheduleUncheckedCreateWithoutTemplateInputSchema';
import { EmailScheduleCreateOrConnectWithoutTemplateInputSchema } from './EmailScheduleCreateOrConnectWithoutTemplateInputSchema';
import { EmailScheduleUpsertWithWhereUniqueWithoutTemplateInputSchema } from './EmailScheduleUpsertWithWhereUniqueWithoutTemplateInputSchema';
import { EmailScheduleCreateManyTemplateInputEnvelopeSchema } from './EmailScheduleCreateManyTemplateInputEnvelopeSchema';
import { EmailScheduleWhereUniqueInputSchema } from './EmailScheduleWhereUniqueInputSchema';
import { EmailScheduleUpdateWithWhereUniqueWithoutTemplateInputSchema } from './EmailScheduleUpdateWithWhereUniqueWithoutTemplateInputSchema';
import { EmailScheduleUpdateManyWithWhereWithoutTemplateInputSchema } from './EmailScheduleUpdateManyWithWhereWithoutTemplateInputSchema';
import { EmailScheduleScalarWhereInputSchema } from './EmailScheduleScalarWhereInputSchema';

export const EmailScheduleUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.EmailScheduleUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailScheduleCreateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleCreateWithoutTemplateInputSchema).array(),z.lazy(() => EmailScheduleUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailScheduleCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => EmailScheduleCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailScheduleUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailScheduleCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailScheduleWhereUniqueInputSchema),z.lazy(() => EmailScheduleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailScheduleWhereUniqueInputSchema),z.lazy(() => EmailScheduleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailScheduleWhereUniqueInputSchema),z.lazy(() => EmailScheduleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailScheduleWhereUniqueInputSchema),z.lazy(() => EmailScheduleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailScheduleUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailScheduleUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => EmailScheduleUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScheduleScalarWhereInputSchema),z.lazy(() => EmailScheduleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default EmailScheduleUpdateManyWithoutTemplateNestedInputSchema;
