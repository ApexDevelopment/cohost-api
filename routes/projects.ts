import { Project } from "../objects/project.js";
import { router, t } from "./trpc.js";

const projects = router({
  listEditedProjects: t.procedure.query((): { projects: Project[] } => {
    return {
      projects: [],
    };
  }),
});

export const projectsRouter = projects;
