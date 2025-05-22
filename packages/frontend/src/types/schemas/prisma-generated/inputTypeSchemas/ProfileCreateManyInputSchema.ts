import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { ProfileCreateskillsInputSchema } from './ProfileCreateskillsInputSchema';
import { ProfileCreateinterestsInputSchema } from './ProfileCreateinterestsInputSchema';
import { ProfileCreatevisible_fieldsInputSchema } from './ProfileCreatevisible_fieldsInputSchema';

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  name: z.string().optional().nullable(),
  displayName: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  social_links: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  skills: z.union([ z.lazy(() => ProfileCreateskillsInputSchema),z.string().array() ]).optional(),
  interests: z.union([ z.lazy(() => ProfileCreateinterestsInputSchema),z.string().array() ]).optional(),
  is_public: z.boolean().optional(),
  visible_fields: z.union([ z.lazy(() => ProfileCreatevisible_fieldsInputSchema),z.string().array() ]).optional(),
  profile_image_url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ProfileCreateManyInputSchema;
