import { router, t } from "./trpc.js";
import { z } from "zod";

const projects = router({
  listEditedProjects: t.procedure.query(() => {
    return {
      projects: [
        {
          projectId: 0,
          handle: "",
          displayName: "",
          dek: "",
          description: "",
          avatarURL: "",
          headerURL: "",
          headerPreviewURL: "",
          privacy: "",
          url: "",
          pronouns: "",
          flags: [],
          avatarShape: "",
        },
      ],
    };
  }),
});

export const projectsRouter = projects;
