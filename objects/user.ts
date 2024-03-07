import { EditedProject, Project, SortOrder } from "./project.js";
import { Post } from "./post.js";
import { Client } from "./client.js";

/**
 * The currently logged in user. Do not instantiate this class; instead, use the `login()` method of the Client class to log in.
 *
 * This class is not used for any other users because the Cohost API does not provide a way to get other users; it only provides other users' projects.
 */
class User {
  /* @hidden */
  private client: Client;
  /* The projects that this user is able to edit. */
  projects: EditedProject[] = [];
  /* The unique ID of this user. */
  id: number;
  /* The email address of this user. */
  email: string;

  /* @hidden */
  constructor(client: Client, id: number, email: string) {
    this.client = client;
    this.id = id;
    this.email = email;
  }

  /**
   * Switches the currently active project to the given project. This is relevant for API calls related to notifications and getting the "liked" state of posts.
   * @param project The project to switch to.
   */
  switchProject(project: EditedProject) {
    this.client.trpc.projects.switchProject.mutate({ projectId: project.id });
  }

  /**
   * Checks if the current project has liked a post. Use `switchProject()` to change the current project.
   * @param post The post to check if the project has liked.
   * @returns Whether the project has liked the post.
   */
  liked(post: Post | number) {
    if (typeof post === "number") {
      return this.client.trpc.posts.isLiked.query({ postId: post });
    } else {
      return this.client.trpc.posts.isLiked.query({ postId: post.postId });
    }
  }

  /**
   * Gets the projects that follow the current project. Use `switchProject()` to change the current project.
   *
   * This method is paginated, and the default offset is 0 and the default limit is 10.
   * @param offset How many projects to skip.
   * @param limit The maximum number of projects to get.
   * @returns The followers of this project.
   */
  async getFollowers(
    offset: number = 0,
    limit: number = 10,
  ): Promise<Project[]> {
    let response = await this.client.fetch(
      `https://cohost.org/api/v1/projects/followers?offset=${offset}&limit=${limit}`,
    );

    let followers = (await response.json()).projects ?? [];

    return followers.map((project: any) => {
      return new Project(this.client, project);
    });
  }

  /**
   * Gets the projects that the current project follows. Use `switchProject()` to change the current project.
   *
   * @param sortOrder What order to sort the projects in.
   * @param offset How many projects to skip.
   * @param limit The maximum number of projects to get.
   * @param beforeTimestamp Not sure yet. Likely has to do with the last time the project posted.
   * @returns The projects that this project follows.
   */
  async getFollowing(
    sortOrder: SortOrder,
    offset: number = 0,
    limit: number = 10,
    beforeTimestamp: number = Date.now(),
  ): Promise<Project[]> {
    // Why is this particular API so redundant? query.query? project.project?

    let projects = await this.client.trpc.projects.followedFeed.query.query({
      sortOrder,
      cursor: offset,
      limit,
      beforeTimestamp,
    });

    return projects.projects.map((project: any) => {
      return new Project(this.client, project.project);
    });
  }
}

export { User };
