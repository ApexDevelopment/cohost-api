import { router } from "./trpc";
import { loginRouter } from "./login";
import { postsRouter } from "./posts";
import { projectsRouter } from "./projects";

const appRouter = router({
  login: loginRouter,
  posts: postsRouter,
  projects: projectsRouter,
});

export const mainRouter = appRouter;
export type AppRouter = typeof appRouter;
