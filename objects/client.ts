import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../routes/app.js";
import crypto = require("crypto");

import { User } from "./user.js";
import { Project } from "./project.js";

const COHOST_API_URL = "https://cohost.org/api/v1";
const COHOST_TRPC_URL = "https://cohost.org/api/v1/trpc";

/**
 * A Cohost API client. Instantiate this class to interact with the Cohost API.
 */
class Client {
  /* @hidden */
  private trpc: any;
  /* The session token for the client. */
  private token: string | null = null;
  /* Whether the client is logged in. */
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
          fetch: async (input, init) => {
            let res = await fetch(input, init);

            if (res.headers.get("set-cookie")) {
              const cookie =
                res.headers.get("set-cookie")?.split(";")[0] || null;

              if (cookie?.startsWith("connect.sid=")) {
                this.token = cookie;
              }
            }

            return res;
          },
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

    let loginResponse = await this.trpc.login.login.mutate({
      email,
      clientHash,
    });

    if (loginResponse.userId) {
      this.user = new User(this.trpc, loginResponse.userId, email);

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

export { Client };
