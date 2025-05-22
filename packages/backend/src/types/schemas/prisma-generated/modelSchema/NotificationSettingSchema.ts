import { z } from 'zod';

/////////////////////////////////////////
// NOTIFICATION SETTING SCHEMA
/////////////////////////////////////////

export const NotificationSettingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  emailEnabled: z.boolean(),
  directMessageEnabled: z.boolean(),
  projectMessageEnabled: z.boolean(),
  mentionEnabled: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type NotificationSetting = z.infer<typeof NotificationSettingSchema>

export default NotificationSettingSchema;
