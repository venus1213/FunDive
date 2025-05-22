import { z } from 'zod';

/////////////////////////////////////////
// BOOKMARK SCHEMA
/////////////////////////////////////////

export const BookmarkSchema = z.object({
  id: z.string(),
  userId: z.string(),
  projectId: z.string(),
  createdAt: z.coerce.date(),
})

export type Bookmark = z.infer<typeof BookmarkSchema>

export default BookmarkSchema;
