import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./app";
import crypto = require("crypto");

const COHOST_API_URL = "https://cohost.org/api/v1";
const COHOST_TRPC_URL = "https://cohost.org/api/v1/trpc";

enum PostState {
  DRAFT = 0,
  PUBLISHED = 1,
}

class Post {
  projectHandle: string;
  postId: number;
  content: {
    postState: PostState;
    headline: string;
    adultContent: boolean;
    blocks: {
      type: string;
      markdown: {
        content: string;
      };
    }[];
    cws: string[];
    tags: string[];
  };

  constructor(
    projectHandle: string,
    postId: number,
    content: {
      postState: PostState;
      headline: string;
      adultContent: boolean;
      blocks: {
        type: string;
        markdown: {
          content: string;
        };
      }[];
      cws: string[];
      tags: string[];
    },
  ) {
    this.projectHandle = projectHandle;
    this.postId = postId;
    this.content = content;
  }
}

class PostBuilder {
  headline: string;
  adultContent: boolean;
  blocks: {
    type: string;
    markdown: {
      content: string;
    };
  }[] = [];
  cws: string[] = [];
  tags: string[] = [];

  constructor(headline: string = "", adultContent: boolean = false) {
    this.headline = headline;
    this.adultContent = adultContent;
  }

  addBlock(type: string, markdown: { content: string }) {
    this.blocks.push({ type, markdown });
    return this;
  }

  addMarkdownBlock(content: string) {
    this.blocks.push({ type: "markdown", markdown: { content } });
    return this;
  }

  addCw(cw: string) {
    this.cws.push(cw);
    return this;
  }

  addTag(tag: string) {
    this.tags.push(tag);
    return this;
  }

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

class Project {
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

  async createPost(post: Post) {
    post.projectHandle = this.handle;
    post.content.postState = PostState.PUBLISHED;
    post.postId = (await this.trpc.posts.create.mutate(post)).postId;
    return post;
  }

  async createDraft(post: Post) {
    post.projectHandle = this.handle;
    post.content.postState = PostState.DRAFT;
    post.postId = (await this.trpc.posts.create.mutate(post)).postId;
    return post;
  }
}

class User {
  private trpc: any;
  projects: Project[] = [];
  id: number;
  email: string;

  constructor(trpc: any, id: number, email: string) {
    this.trpc = trpc;
    this.id = id;
    this.email = email;
  }
}

class Client {
  private token: string | null = null;
  private trpc: any;
  private loggedIn = false;

  user: User | null = null;

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
      this.loggedIn = true;
      this.user = new User(this.trpc, res.userId, email);

      let projects = (await this.trpc.projects.listEditedProjects.query())
        .projects;

      if (projects) {
        this.user.projects = projects.map((project: any) => {
          return new Project(this.trpc, project);
        });
      } else {
        console.error("Failed to load projects for user!");
      }
    }

    return this.user;
  }
}

export { Client, PostBuilder, PostState };
