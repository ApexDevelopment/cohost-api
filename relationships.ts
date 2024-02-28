import { router, t } from "./trpc";
import { z } from "zod";

const relationships = router({
  like: t.procedure
    .input(
      z.object({
        fromProjectId: z.number(),
        toPostId: z.number(),
      }),
    )
    .mutation(() => {}),
  unlike: t.procedure
    .input(
      z.object({
        fromProjectId: z.number(),
        toPostId: z.number(),
      }),
    )
    .mutation(() => {}),
});

export const relationshipsRouter = relationships;
