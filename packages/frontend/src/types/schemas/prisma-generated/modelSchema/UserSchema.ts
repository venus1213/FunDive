import { z } from 'zod';
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'
import { PlanTypeSchema } from '../inputTypeSchemas/PlanTypeSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  planType: PlanTypeSchema,
  id: z.string().uuid(),
  email: z.string(),
  firebaseUid: z.string().nullable(),
  name: z.string().nullable(),
  isAdmin: z.boolean(),
  isVerified: z.boolean(),
  verificationToken: z.string().nullable(),
  resetPasswordToken: z.string().nullable(),
  resetPasswordExpires: z.coerce.date().nullable(),
  invitationExpires: z.coerce.date().nullable(),
  invitedBy: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isFirstLogin: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
