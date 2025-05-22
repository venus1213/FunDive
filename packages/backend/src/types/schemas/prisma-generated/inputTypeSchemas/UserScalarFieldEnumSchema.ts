import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','firebaseUid','name','role','planType','isAdmin','isVerified','verificationToken','resetPasswordToken','resetPasswordExpires','invitationExpires','invitedBy','createdAt','updatedAt','isFirstLogin']);

export default UserScalarFieldEnumSchema;
