import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectScalarWhereInputSchema } from './ProjectScalarWhereInputSchema';
import { ProjectUpdateManyMutationInputSchema } from './ProjectUpdateManyMutationInputSchema';
import { ProjectUncheckedUpdateManyWithoutUserInputSchema } from './ProjectUncheckedUpdateManyWithoutUserInputSchema';

export const ProjectUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateManyMutationInputSchema),z.lazy(() => ProjectUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default ProjectUpdateManyWithWhereWithoutUserInputSchema;
