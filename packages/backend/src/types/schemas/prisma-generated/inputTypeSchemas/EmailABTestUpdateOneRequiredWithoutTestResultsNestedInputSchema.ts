import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { EmailABTestCreateWithoutTestResultsInputSchema } from './EmailABTestCreateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedCreateWithoutTestResultsInputSchema } from './EmailABTestUncheckedCreateWithoutTestResultsInputSchema';
import { EmailABTestCreateOrConnectWithoutTestResultsInputSchema } from './EmailABTestCreateOrConnectWithoutTestResultsInputSchema';
import { EmailABTestUpsertWithoutTestResultsInputSchema } from './EmailABTestUpsertWithoutTestResultsInputSchema';
import { EmailABTestWhereUniqueInputSchema } from './EmailABTestWhereUniqueInputSchema';
import { EmailABTestUpdateToOneWithWhereWithoutTestResultsInputSchema } from './EmailABTestUpdateToOneWithWhereWithoutTestResultsInputSchema';
import { EmailABTestUpdateWithoutTestResultsInputSchema } from './EmailABTestUpdateWithoutTestResultsInputSchema';
import { EmailABTestUncheckedUpdateWithoutTestResultsInputSchema } from './EmailABTestUncheckedUpdateWithoutTestResultsInputSchema';

export const EmailABTestUpdateOneRequiredWithoutTestResultsNestedInputSchema: z.ZodType<Prisma.EmailABTestUpdateOneRequiredWithoutTestResultsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailABTestCreateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedCreateWithoutTestResultsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailABTestCreateOrConnectWithoutTestResultsInputSchema).optional(),
  upsert: z.lazy(() => EmailABTestUpsertWithoutTestResultsInputSchema).optional(),
  connect: z.lazy(() => EmailABTestWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailABTestUpdateToOneWithWhereWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUpdateWithoutTestResultsInputSchema),z.lazy(() => EmailABTestUncheckedUpdateWithoutTestResultsInputSchema) ]).optional(),
}).strict();

export default EmailABTestUpdateOneRequiredWithoutTestResultsNestedInputSchema;
