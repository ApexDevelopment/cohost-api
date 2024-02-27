import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./app";
import crypto = require("crypto");

const COHOST_API_URL = "https://cohost.org/api/v1";
const COHOST_TRPC_URL = "https://cohost.org/api/v1/trpc";

class Project {
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

  constructor({
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
  }) {
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
}

class User {
  projects: Project[] = [];
  id: number;
  email: string;

  constructor(id: number, email: string) {
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
      this.user = new User(res.userId, email);

      let projects = (await this.trpc.projects.listEditedProjects.query())
        .projects;

      if (projects) {
        this.user.projects = projects.map((project: any) => {
          return new Project(project);
        });
      } else {
        console.error("Failed to load projects for user!");
      }
    }

    return this.user;
  }
}

export { Client };
