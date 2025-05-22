import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProjectWhereInputSchema } from '../inputTypeSchemas/ProjectWhereInputSchema'

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
}).strict() ;

export default ProjectDeleteManyArgsSchema;
