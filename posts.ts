import { router, t } from "./trpc";
import { z } from "zod";

const posts = router({
  isLiked: t.procedure.query(() => {}),
  update: t.procedure
    .input(
      z.object({
        projectHandle: z.string(),
        postId: z.number(),
        content: z.object({
          postState: z.number(),
          headline: z.string(),
          adultContent: z.boolean(),
          blocks: z.array(
            z.object({
              type: z.string(),
              markdown: z.optional(
                z.object({
                  content: z.string(),
                }),
              ),
            }),
          ),
        }),
        cws: z.array(z.string()),
        tags: z.array(z.string()),
      }),
    )
    .mutation(() => {}),
});

export const postsRouter = posts;
