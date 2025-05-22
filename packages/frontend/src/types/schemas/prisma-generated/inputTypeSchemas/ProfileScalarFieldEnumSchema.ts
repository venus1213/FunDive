import { z } from 'zod';

export const ProfileScalarFieldEnumSchema = z.enum(['id','userId','name','displayName','bio','company','position','location','website','social_links','skills','interests','is_public','visible_fields','profile_image_url','createdAt','updatedAt']);

export default ProfileScalarFieldEnumSchema;
