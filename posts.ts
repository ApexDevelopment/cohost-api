import { router, t } from "./trpc";
import { z } from "zod";

const posts = router({
  isLiked: t.procedure.query(() => {}),
  profilePosts: t.procedure
    .input(
      z.object({
        projectHandle: z.string(),
        page: z.number(),
        options: z.object({
          pinnedPostsAtTop: z.boolean(),
          hideReplies: z.boolean(),
          hideShares: z.boolean(),
          hideAsks: z.boolean(),
          viewingOnProjectPage: z.boolean(),
        }),
      }),
    )
    .query(() => {
      return {
        posts: [{}],
      };
    }),
  create: t.procedure
    .input(
      z.object({
        projectHandle: z.string(),
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
    .mutation(() => {
      return {
        postId: 0,
      };
    }),
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
  delete: t.procedure
    .input(
      z.object({
        projectHandle: z.string(),
        postId: z.number(),
      }),
    )
    .mutation(() => {}),
});

export const postsRouter = posts;
