import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutScheduleExecutionsInputSchema } from './EmailLogCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema';
import { EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema } from './EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema';
import { EmailLogUpsertWithoutScheduleExecutionsInputSchema } from './EmailLogUpsertWithoutScheduleExecutionsInputSchema';
import { EmailLogWhereInputSchema } from './EmailLogWhereInputSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateToOneWithWhereWithoutScheduleExecutionsInputSchema } from './EmailLogUpdateToOneWithWhereWithoutScheduleExecutionsInputSchema';
import { EmailLogUpdateWithoutScheduleExecutionsInputSchema } from './EmailLogUpdateWithoutScheduleExecutionsInputSchema';
import { EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema } from './EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema';

export const EmailLogUpdateOneWithoutScheduleExecutionsNestedInputSchema: z.ZodType<Prisma.EmailLogUpdateOneWithoutScheduleExecutionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutScheduleExecutionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailLogCreateOrConnectWithoutScheduleExecutionsInputSchema).optional(),
  upsert: z.lazy(() => EmailLogUpsertWithoutScheduleExecutionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EmailLogWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EmailLogWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EmailLogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailLogUpdateToOneWithWhereWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUpdateWithoutScheduleExecutionsInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutScheduleExecutionsInputSchema) ]).optional(),
}).strict();

export default EmailLogUpdateOneWithoutScheduleExecutionsNestedInputSchema;
