import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectUpdateWithoutUserInputSchema } from './ProjectUpdateWithoutUserInputSchema';
import { ProjectUncheckedUpdateWithoutUserInputSchema } from './ProjectUncheckedUpdateWithoutUserInputSchema';

export const ProjectUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ProjectUpdateWithWhereUniqueWithoutUserInputSchema;
