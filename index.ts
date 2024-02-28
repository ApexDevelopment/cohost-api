import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./app";
import crypto = require("crypto");

const COHOST_API_URL = "https://cohost.org/api/v1";
const COHOST_TRPC_URL = "https://cohost.org/api/v1/trpc";

/**
 * Whether a post is a draft or published.
 */
enum PostState {
  DRAFT = 0,
  PUBLISHED = 1,
}

/**
 * A class representing a post on Cohost.
 *
 * This class does not contain all the data that a post can have. See the {@link TimelinePost} class for a more complete representation of a post.
 *
 * This class is not used for creating posts. Instead, use the PostBuilder class to create a new post.
 */
class Post {
  projectHandle: string;
  postId: number;
  content: {
    postState: PostState;
    headline: string;
    adultContent: boolean;
    blocks: object[];
    cws: string[];
    tags: string[];
  };

  /* @hidden */
  constructor(
    projectHandle: string,
    postId: number,
    content: {
      postState: PostState;
      headline: string;
      adultContent: boolean;
      blocks: object[];
      cws: string[];
      tags: string[];
    },
  ) {
    this.projectHandle = projectHandle;
    this.postId = postId;
    this.content = content;
  }
}

/**
 * A class representing a post on Cohost, with all the data that a post can have.
 *
 * This class is used when retrieving posts from the Cohost API, rather than the base {@link Post} class.
 */
class TimelinePost extends Post {
  publishedAt: string;
  filename: string;
  numComments: number;
  pinned: boolean;
  commentsLocked: boolean;
  sharesLocked: boolean;
  plainTextBody: string;
  postingProject: Project;
  singlePostPageUrl: string;
  isLiked: boolean;
  responseToAskId: number | null;
  hasCohostPlus: boolean;

  /* @hidden */
  constructor(
    projectHandle: string,
    postId: number,
    state: PostState,
    headline: string,
    effectiveAdultContent: boolean,
    blocks: object[],
    cws: string[],
    tags: string[],
    publishedAt: string,
    filename: string,
    numComments: number,
    pinned: boolean,
    commentsLocked: boolean,
    sharesLocked: boolean,
    plainTextBody: string,
    postingProject: Project,
    singlePostPageUrl: string,
    isLiked: boolean,
    responseToAskId: number | null,
    hasCohostPlus: boolean,
  ) {
    super(projectHandle, postId, {
      postState: state,
      headline,
      adultContent: effectiveAdultContent,
      blocks,
      cws,
      tags,
    });

    this.publishedAt = publishedAt;
    this.filename = filename;
    this.numComments = numComments;
    this.pinned = pinned;
    this.commentsLocked = commentsLocked;
    this.sharesLocked = sharesLocked;
    this.plainTextBody = plainTextBody;
    this.postingProject = postingProject;
    this.singlePostPageUrl = singlePostPageUrl;
    this.isLiked = isLiked;
    this.responseToAskId = responseToAskId;
    this.hasCohostPlus = hasCohostPlus;
  }
}

/**
 * A class for creating Post objects.
 *
 * Example usage:
 * ```ts
 * let postBuilder = new PostBuilder("Hello, world!");
 * postBuilder.addMarkdownBlock("This is a test post from cohost-api.");
 * postBuilder.addTag("cohost-api");
 * let finishedPost = postBuilder.build();
 * ```
 */
class PostBuilder {
  /* @hidden */
  private headline: string;
  /* @hidden */
  private adultContent: boolean;
  /* @hidden */
  private blocks: object[] = [];
  /* @hidden */
  private cws: string[] = [];
  /* @hidden */
  private tags: string[] = [];

  /**
   * Creates a new PostBuilder, used for easily constructing a Post object.
   * @param headline The headline for the post. Appears at the top of a post. Defaults to an empty string.
   * @param adultContent Whether the post contains adult content. Defaults to false.
   */
  constructor(headline: string = "", adultContent: boolean = false) {
    this.headline = headline;
    this.adultContent = adultContent;
  }

  /**
   * Adds a block of content to the post. Only use this if you are familiar with the types of content blocks that Cohost supports. Otherwise, use `addMarkdownBlock()`.
   * @param type The type of content block to add.
   * @param block The content of the block.
   * @returns The PostBuilder object, for chaining.
   */
  addBlock(type: string, block: object) {
    let finalBlock: any = { type };
    finalBlock[type] = block;
    this.blocks.push(finalBlock);
    return this;
  }

  /**
   * Adds a block of markdown text to the post.
   * @param content The markdown string to add to the post.
   * @returns The PostBuilder object, for chaining.
   */
  addMarkdownBlock(content: string) {
    this.blocks.push({ type: "markdown", markdown: { content } });
    return this;
  }

  /**
   * Adds a content warning to the post.
   * @param cw The content warning to add to the post.
   * @returns The PostBuilder object, for chaining.
   */
  addCw(cw: string) {
    this.cws.push(cw);
    return this;
  }

  /**
   * Adds a #tag to the post.
   * @param tag The #tag to add to the post. You do not need to include the # symbol.
   * @returns The PostBuilder object, for chaining.
   */
  addTag(tag: string) {
    this.tags.push(tag);
    return this;
  }

  /**
   * Builds the Post object from the data in the PostBuilder.
   * @returns The Post object.
   */
  build() {
    return new Post("", 0, {
      postState: PostState.DRAFT,
      headline: this.headline,
      adultContent: this.adultContent,
      blocks: this.blocks,
      cws: this.cws,
      tags: this.tags,
    });
  }
}

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
    let postId =
      postToUpdate instanceof Post ? postToUpdate.postId : postToUpdate;
    return this.trpc.posts.update.mutate({
      projectHandle: this.handle,
      postId,
      content: newPost.content,
      cws: newPost.content.cws,
      tags: newPost.content.tags,
    });
  }

  /**
   * Gives a like from this project to a post.
   * @param post The post to like.
   */
  async likePost(post: Post | number) {
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
    let postId = post instanceof Post ? post.postId : post;
    await this.trpc.relationships.unlike.mutate({
      fromProjectId: this.id,
      toPostId: postId,
    });
  }
}

/**
 * The currently logged in user. Do not instantiate this class; instead, use the `login()` method of the Client class to log in.
 *
 * This class is not used for any other users because the Cohost API does not provide a way to get other users; it only provides other users' projects.
 */
class User {
  /* @hidden */
  private trpc: any;
  /* The projects that this user is able to edit. */
  projects: Project[] = [];
  /* The unique ID of this user. */
  id: number;
  /* The email address of this user. */
  email: string;

  /* @hidden */
  constructor(trpc: any, id: number, email: string) {
    this.trpc = trpc;
    this.id = id;
    this.email = email;
  }
}

/**
 * A Cohost API client. Instantiate this class to interact with the Cohost API.
 */
class Client {
  /* @hidden */
  private trpc: any;
  /* The session token for the client. */
  private token: string | null = null;
  /* Whether the client is logged in.. */
  loggedIn = false;

  /* The currently logged in user. Once logged in, can be used to access the user's information and projects. */
  user: User | null = null;

  /**
   * Creates a new Cohost API client. Requires no arguments.
   */
  constructor() {
    this.trpc = createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: COHOST_TRPC_URL,
          headers: () => {
            if (!this.token) return {};
            return {
              Cookie: this.token,
            };
          },
        }),
      ],
    });
  }

  /**
   * Logs in to Cohost, creating a new session.
   * @param email The email of the User.
   * @param password The User's password.
   * @returns The logged in User, or null if the login failed.
   */
  async login(email: string, password: string) {
    const { salt } = await this.trpc.login.getSalt.query({ email });
    const hash = crypto.pbkdf2Sync(
      Buffer.from(password, "utf8"),
      Buffer.from(salt, "base64"),
      200000,
      128,
      "sha384",
    );

    const clientHash = Buffer.from(hash).toString("base64");

    let req = await fetch(COHOST_API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, clientHash }),
    });

    let resJSON = await req.text();
    let res = JSON.parse(resJSON);

    this.token = req?.headers?.get("set-cookie")?.split(";")[0] || null;

    if (res?.userId) {
      this.user = new User(this.trpc, res.userId, email);

      let projects = (await this.trpc.projects.listEditedProjects.query())
        .projects;

      if (projects) {
        this.user.projects = projects.map((project: any) => {
          return new Project(this.trpc, project);
        });

        this.loggedIn = true;
      } else {
        console.error("Failed to load projects for user!");
      }
    }

    return this.user;
  }
}

export { Client, User, Post, Project, PostBuilder, PostState };
