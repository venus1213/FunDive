import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProjectWhereUniqueInputSchema } from './ProjectWhereUniqueInputSchema';
import { ProjectUpdateWithoutUserInputSchema } from './ProjectUpdateWithoutUserInputSchema';
import { ProjectUncheckedUpdateWithoutUserInputSchema } from './ProjectUncheckedUpdateWithoutUserInputSchema';
import { ProjectCreateWithoutUserInputSchema } from './ProjectCreateWithoutUserInputSchema';
import { ProjectUncheckedCreateWithoutUserInputSchema } from './ProjectUncheckedCreateWithoutUserInputSchema';

export const ProjectUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ProjectUpsertWithWhereUniqueWithoutUserInputSchema;
