import mime from "mime";
import imageSize = require("image-size");
import fs = require("fs");
import path = require("path");

import { Post, TimelinePost, PostState } from "./post.js";

/**
 * A class representing a project on Cohost. A user can have multiple projects.
 *
 * Do not instantiate this class directly. Projects can only be obtained from the API. cohost-api does not yet support creating new projects.
 */
class Project {
  /* @hidden */
  private trpc: any;
  id: number;
  handle: string;
  displayName: string;
  dek: string;
  description: string;
  avatarURL: string;
  headerURL: string;
  headerPreviewURL: string;
  privacy: string;
  url: string;
  pronouns: string;
  flags: string[];
  avatarShape: string;

  /* @hidden */
  constructor(
    trpc: any,
    {
      projectId,
      handle,
      displayName,
      dek,
      description,
      avatarURL,
      headerURL,
      headerPreviewURL,
      privacy,
      url,
      pronouns,
      flags,
      avatarShape,
    }: {
      projectId: number;
      handle: string;
      displayName: string;
      dek: string;
      description: string;
      avatarURL: string;
      headerURL: string;
      headerPreviewURL: string;
      privacy: string;
      url: string;
      pronouns: string;
      flags: string[];
      avatarShape: string;
    },
  ) {
    this.trpc = trpc;
    this.id = projectId;
    this.handle = handle;
    this.displayName = displayName;
    this.dek = dek;
    this.description = description;
    this.avatarURL = avatarURL;
    this.headerURL = headerURL;
    this.headerPreviewURL = headerPreviewURL;
    this.privacy = privacy;
    this.url = url;
    this.pronouns = pronouns;
    this.flags = flags;
    this.avatarShape = avatarShape;
  }

  /**
   * Publishes a post to the project.
   * @param post The post to publish.
   * @returns The post with its postId set.
   */
  async createPost(post: Post) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    post.projectHandle = this.handle;
    post.content.postState = PostState.PUBLISHED;
    post.postId = (await this.trpc.posts.create.mutate(post)).postId;
    return post;
  }

  /**
   * Creates a draft of a post in the project.
   * @param post The post to send to the project's drafts.
   * @returns The post with its postId set.
   */
  async createDraft(post: Post) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    post.projectHandle = this.handle;
    post.content.postState = PostState.DRAFT;
    post.postId = (await this.trpc.posts.create.mutate(post)).postId;
    return post;
  }

  /**
   * Deletes a post from the project.
   * @param post The post or ID of the post to delete.
   */
  async deletePost(post: Post | number) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    let postId = post instanceof Post ? post.postId : post;
    await this.trpc.posts.delete.mutate({
      projectHandle: this.handle,
      postId,
    });
  }

  /**
   * Updates a post in the project.
   * @param postToUpdate The post or ID of the post to update.
   * @param newPost The new post data.
   */
  async updatePost(postToUpdate: Post | number, newPost: Post) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    let postId =
      postToUpdate instanceof Post ? postToUpdate.postId : postToUpdate;
    await this.trpc.posts.update.mutate({
      projectHandle: this.handle,
      postId,
      content: newPost.content,
      cws: newPost.content.cws,
      tags: newPost.content.tags,
    });
  }

  /**
   * Publishes a post from the project's drafts.
   *
   * In the future, this function will also accept a number as the first argument, which will be the ID of the draft post to publish.
   * @param draftPost The draft post to publish.
   */
  async publishDraft(draftPost: Post) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    await this.trpc.posts.update.mutate({
      projectHandle: this.handle,
      postId: draftPost.postId,
      content: draftPost.content,
      cws: draftPost.content.cws,
      tags: draftPost.content.tags,
    });
  }

  /**
   * Adds an attachment to a post. This must be done after the post is created. This is a limitation of the Cohost API.
   * @param post The post to add the attachment to.
   * @param filepath The path to the file to upload.
   * @returns The ID of the attachment.
   */
  async addAttachment(post: Post, filepath: string): Promise<number>;
  /**
   * Adds an attachment to a post. This must be done after the post is created. This is a limitation of the Cohost API.
   * @param post The post to add the attachment to.
   * @param filename The name of the file to upload.
   * @param mimeType The MIME type of the file.
   * @param attachment A Buffer containing the file to upload.
   * @param width The width of the image.
   * @param height The height of the image.
   * @returns The ID of the attachment.
   */
  async addAttachment(
    post: Post,
    filename: string,
    mimeType: string,
    attachment: Buffer,
    width: number,
    height: number,
  ): Promise<number>;
  async addAttachment(
    post: Post,
    filepathOrName: string,
    mimeType?: string,
    attachment?: Buffer,
    width?: number,
    height?: number,
  ): Promise<number> {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    if (!post.postId) {
      throw new Error(
        "Post must first be published or drafted before an attachment can be added.",
      );
    }

    if (!mimeType || !attachment || !width || !height) {
      attachment = fs.readFileSync(filepathOrName);
      let type = mimeType || mime.getType(filepathOrName);

      if (!type) {
        throw new Error("Could not determine MIME type of file.");
      }

      mimeType = type;
      filepathOrName = path.basename(filepathOrName);

      let dimensions = imageSize.imageSize(attachment);
      width = dimensions.width;
      height = dimensions.height;
    }

    let response = await this.trpc.posts.attachment.start.mutate({
      projectHandle: this.handle,
      postId: post.postId,
      filename: filepathOrName,
      contentType: mimeType,
      contentLength: attachment.length,
      width,
      height,
    });

    // Upload to S3 bucket
    const formData = new FormData();

    for (let key in response.requiredFields) {
      formData.append(key, response.requiredFields[key]);
    }

    formData.append("file", new Blob([attachment]), filepathOrName);

    await fetch(response.url, {
      method: "POST",
      body: formData,
    });

    let finishResponse = await this.trpc.posts.attachment.finish.mutate({
      projectHandle: this.handle,
      postId: post.postId,
      attachmentId: response.attachmentId,
    });

    await this.trpc.posts.update.mutate({
      projectHandle: this.handle,
      postId: post.postId,
      content: {
        ...post.content,
        blocks: [
          ...post.content.blocks,
          {
            type: "attachment",
            attachment: {
              attachmentId: finishResponse.attachmentId,
              altText: "",
              previewURL: finishResponse.url,
              fileURL: finishResponse.url,
              kind: "image",
              width,
              height,
            },
          },
        ],
      },
      cws: post.content.cws,
      tags: post.content.tags,
    });

    return response.attachmentId;
  }

  /**
   * Gives a like from this project to a post.
   * @param post The post to like.
   */
  async likePost(post: Post | number) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    let postId = post instanceof Post ? post.postId : post;
    await this.trpc.relationships.like.mutate({
      fromProjectId: this.id,
      toPostId: postId,
    });
  }

  /**
   * Removes a like from this project to a post.
   * @param post The post to unlike.
   */
  async unlikePost(post: Post | number) {
    if (!this.trpc) {
      throw new Error("User does not have ownership of this project.");
    }

    let postId = post instanceof Post ? post.postId : post;
    await this.trpc.relationships.unlike.mutate({
      fromProjectId: this.id,
      toPostId: postId,
    });
  }

  /**
   * Gets a page of posts from the project. The Cohost API returns 20 posts per page.
   * @param page The page of posts to get. Defaults to 0.
   * @param options Options for filtering the returned posts.
   * @returns An array of TimelinePosts from the project.
   */
  async getPosts(
    page: number = 0,
    options: {
      pinnedPostsAtTop: boolean;
      hideReplies: boolean;
      hideShares: boolean;
      hideAsks: boolean;
    } = {
      pinnedPostsAtTop: true,
      hideReplies: false,
      hideShares: false,
      hideAsks: false,
    },
  ) {
    let response = await this.trpc.posts.profilePosts.query({
      projectHandle: this.handle,
      page,
      options,
    });

    return response.posts.map((post: any) => {
      return new TimelinePost(
        this.handle,
        post.postId,
        post.postState,
        post.headline,
        post.effectiveAdultContent,
        post.blocks,
        post.cws,
        post.tags,
        post.publishedAt,
        post.filename,
        post.numComments,
        post.pinned,
        post.commentsLocked,
        post.sharesLocked,
        post.plainTextBody,
        this,
        post.singlePostPageUrl,
        post.isLiked,
        post.responseToAskId,
        post.hasCohostPlus,
      );
    });
  }
}

export { Project };
