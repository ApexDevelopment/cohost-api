import { Project } from "../objects/project.js";
import { router, t } from "./trpc.js";
import { z } from "zod";

const followedFeed = router({
  query: t.procedure
    .input(
      z.object({
        sortOrder: z.enum([
          "recently-posted",
          "alpha-asc",
          "alpha-desc",
          "followed-asc",
          "followed-desc",
        ]),
        limit: z.number(),
        beforeTimestamp: z.number(),
        cursor: z.number().optional(),
      }),
    )
    .query((): { projects: Project[] } => {
      return {
        projects: [],
      };
    }),
});

const projects = router({
  followedFeed,
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
