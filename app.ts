import { router } from "./trpc";
import { loginRouter } from "./login";
import { postsRouter } from "./posts";
import { projectsRouter } from "./projects";
import { relationshipsRouter } from "./relationships";

const appRouter = router({
  login: loginRouter,
  posts: postsRouter,
  projects: projectsRouter,
  relationships: relationshipsRouter,
});

export const mainRouter = appRouter;
export type AppRouter = typeof appRouter;
