import { Project } from "./project.js";
import { Post } from "./post.js";

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

  /**
   * Switches the currently active project to the given project. This is relevant for API calls related to notifications and getting the "liked" state of posts.
   * @param project The project to switch to.
   */
  switchProject(project: Project) {
    this.trpc.projects.switchProject({ projectId: project.id });
  }

  /**
   * Checks if the current project has liked a post. Use `switchProject()` to change the current project.
   * @param post The post to check if the project has liked.
   * @returns Whether the project has liked the post.
   */
  liked(post: Post | number) {
    if (typeof post === "number") {
      return this.trpc.posts.isLiked({ postId: post });
    } else {
      return this.trpc.posts.isLiked({ postId: post.postId });
    }
  }
}

export { User };
