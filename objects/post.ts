import { Project } from "./project.js";

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

export { Post, TimelinePost, PostBuilder, PostState };
