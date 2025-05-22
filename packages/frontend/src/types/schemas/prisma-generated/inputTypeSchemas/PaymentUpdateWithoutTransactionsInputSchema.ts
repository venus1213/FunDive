import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { EnumPaymentStatusFieldUpdateOperationsInputSchema } from './EnumPaymentStatusFieldUpdateOperationsInputSchema';
import { PaymentMethodSchema } from './PaymentMethodSchema';
import { EnumPaymentMethodFieldUpdateOperationsInputSchema } from './EnumPaymentMethodFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutPaymentsNestedInputSchema } from './UserUpdateOneRequiredWithoutPaymentsNestedInputSchema';

export const PaymentUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.PaymentUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => PaymentMethodSchema),z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputSchema) ]).optional(),
  stripePaymentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPaymentsNestedInputSchema).optional()
}).strict();

export default PaymentUpdateWithoutTransactionsInputSchema;
