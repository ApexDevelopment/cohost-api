import { router, t } from "./trpc.js";
import { z } from "zod";

const login = router({
  login: t.procedure
    .input(z.object({ email: z.string(), clientHash: z.string() }))
    .mutation(() => {
      return {
        state: "done",
        userId: 1,
      };
    }),
  loggedIn: t.procedure.query(() => {
    //
  }),
  getSalt: t.procedure.input(z.object({ email: z.string() })).query(() => {
    //
  }),
});

export const loginRouter = login;
