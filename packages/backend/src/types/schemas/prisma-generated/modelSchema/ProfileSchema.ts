import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().nullable(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  company: z.string().nullable(),
  position: z.string().nullable(),
  location: z.string().nullable(),
  website: z.string().nullable(),
  social_links: JsonValueSchema.nullable(),
  skills: z.string().array(),
  interests: z.string().array(),
  is_public: z.boolean(),
  visible_fields: z.string().array(),
  profile_image_url: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

export default ProfileSchema;
