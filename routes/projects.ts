import { Project } from "../objects/project.js";
import { router, t } from "./trpc.js";
import { z } from "zod";

const projects = router({
  listEditedProjects: t.procedure.query((): { projects: Project[] } => {
    return {
      projects: [],
    };
  }),
  switchProject: t.procedure
    .input(
      z.object({
        projectId: z.number(),
      }),
    )
    .mutation(() => {}),
});

export const projectsRouter = projects;
