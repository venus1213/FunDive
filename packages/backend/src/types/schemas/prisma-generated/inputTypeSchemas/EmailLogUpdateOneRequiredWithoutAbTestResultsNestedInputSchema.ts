import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailLogCreateWithoutAbTestResultsInputSchema } from './EmailLogCreateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedCreateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedCreateWithoutAbTestResultsInputSchema';
import { EmailLogCreateOrConnectWithoutAbTestResultsInputSchema } from './EmailLogCreateOrConnectWithoutAbTestResultsInputSchema';
import { EmailLogUpsertWithoutAbTestResultsInputSchema } from './EmailLogUpsertWithoutAbTestResultsInputSchema';
import { EmailLogWhereUniqueInputSchema } from './EmailLogWhereUniqueInputSchema';
import { EmailLogUpdateToOneWithWhereWithoutAbTestResultsInputSchema } from './EmailLogUpdateToOneWithWhereWithoutAbTestResultsInputSchema';
import { EmailLogUpdateWithoutAbTestResultsInputSchema } from './EmailLogUpdateWithoutAbTestResultsInputSchema';
import { EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema } from './EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema';

export const EmailLogUpdateOneRequiredWithoutAbTestResultsNestedInputSchema: z.ZodType<Prisma.EmailLogUpdateOneRequiredWithoutAbTestResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailLogCreateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedCreateWithoutAbTestResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailLogCreateOrConnectWithoutAbTestResultsInputSchema).optional(),
  upsert: z.lazy(() => EmailLogUpsertWithoutAbTestResultsInputSchema).optional(),
  connect: z.lazy(() => EmailLogWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailLogUpdateToOneWithWhereWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUpdateWithoutAbTestResultsInputSchema),z.lazy(() => EmailLogUncheckedUpdateWithoutAbTestResultsInputSchema) ]).optional(),
}).strict();

export default EmailLogUpdateOneRequiredWithoutAbTestResultsNestedInputSchema;
