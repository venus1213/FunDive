import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProfileWhereInputSchema } from './ProfileWhereInputSchema';

export const ProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable()
}).strict();

export default ProfileNullableScalarRelationFilterSchema;
