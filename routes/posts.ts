import { Post } from "../objects/post.js";
import { router, t } from "./trpc.js";
import { z } from "zod";

const attachment = router({
  start: t.procedure
    .input(
      z.object({
        projectHandle: z.string(),
        postId: z.number(),
        filename: z.string(),
        contentType: z.string(),
        contentLength: z.number(),
        width: z.number(),
        height: z.number(),
      }),
    )
    .mutation(() => {
      return {
        attachmentId: "",
        url: "",
        requiredFields: {},
      };
    }),
  finish: t.procedure
    .input(
      z.object({
        projectHandle: z.string(),
        postId: z.number(),
        attachmentId: z.string(),
      }),
    )
    .mutation(() => {
      return {
        attachmentId: "",
        url: "",
      };
    }),
});

const posts = router({
  attachment,
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
    .query((): { posts: Post[] } => {
      return {
        posts: [],
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
