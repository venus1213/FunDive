import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectCreateWithoutUserInputSchema } from './ProjectCreateWithoutUserInputSchema';
import { ProjectUncheckedCreateWithoutUserInputSchema } from './ProjectUncheckedCreateWithoutUserInputSchema';

export const ProjectCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ProjectCreateOrConnectWithoutUserInputSchema;
