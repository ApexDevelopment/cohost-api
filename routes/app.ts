import { router } from "./trpc.js";
import { loginRouter } from "./login.js";
import { postsRouter } from "./posts.js";
import { projectsRouter } from "./projects.js";
import { relationshipsRouter } from "./relationships.js";

const appRouter = router({
  login: loginRouter,
  posts: postsRouter,
  projects: projectsRouter,
  relationships: relationshipsRouter,
});

export const mainRouter = appRouter;
export type AppRouter = typeof appRouter;
