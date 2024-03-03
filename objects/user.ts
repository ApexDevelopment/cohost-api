import { Project } from "./project.js";

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

export { User };
