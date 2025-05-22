import { z } from 'zod';
import { CategorySchema } from '../inputTypeSchemas/CategorySchema'
import { ProjectTypeSchema } from '../inputTypeSchemas/ProjectTypeSchema'
import { ProjectStatusSchema } from '../inputTypeSchemas/ProjectStatusSchema'
import { ProjectStageSchema } from '../inputTypeSchemas/ProjectStageSchema'

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  category: CategorySchema,
  projectType: ProjectTypeSchema,
  status: ProjectStatusSchema,
  projectStage: ProjectStageSchema.nullable(),
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  investmentAmount: z.number().nullable(),
  location: z.string().nullable(),
  popularityScore: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema;
