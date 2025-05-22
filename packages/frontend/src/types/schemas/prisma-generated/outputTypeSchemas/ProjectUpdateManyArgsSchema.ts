import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProjectUpdateManyMutationInputSchema } from '../inputTypeSchemas/ProjectUpdateManyMutationInputSchema'
import { ProjectUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ProjectUncheckedUpdateManyInputSchema'
import { ProjectWhereInputSchema } from '../inputTypeSchemas/ProjectWhereInputSchema'

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ProjectUpdateManyArgsSchema;
