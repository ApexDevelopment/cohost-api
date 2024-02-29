# cohost-api

An unofficial API wrapper for cohost.org that uses tRPC.

cohost-api is in very early development!

## Usage

`npm install cohost-api`

```js
import { Client, PostBuilder } from "cohost-api";

const client = new Client();

async function demo() {
  // Log in to Cohost
  let user = await client.login("EMAIL_ADDRESS", "YOUR_PASSWORD");

  // Create new post
  let post = new PostBuilder();
    .addMarkdownBlock("hello from cohost-api!")
    .build();

  // Send to Cohost
  user?.projects[0].createDraft(); // or use .createPost() to publish it immediately

  // Attach a file
  // This must be done after the post is created/drafted due to how the Cohost API works
  user?.projects[0].addAttachment(post, "file.png");
}

demo(); // Check your Cohost page!
```

## API Reference

The API reference can be found in [this document](reference.md).

## What works, and what doesn't

### Working

- Getting your projects' profile information
- Creating posts & post drafts
- Uploading attachments
- Editing existing posts & post drafts
- Liking and unliking posts
- Getting a list of a project's posts

### Not working

- Editing a project's profile information
- Sharing other users' posts to your project (i.e. reblogging)
- Getting the list of followers for a project
- Getting the list of projects followed by your project
- Getting a project's notifications
- Anything else not explicitly mentioned

## Glossary

| Term    | Definition                                                                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Project | A page viewable as a Cohost profile with an @handle.                                                                                          |
| User    | A Cohost account with an email address and password. Users can have multiple projects, the same way a Tumblr account can have multiple blogs. |
| Draft   | A post which has not been published, but still belongs to a project, and can be viewed via a direct link.                                     |

## Reasons not to use this (yet)

- The Cohost tRPC API is undocumented and not meant for public use.
- The Cohost tRPC API can change at any time and break this package.
- This package is in flux and breaking changes will happen all the time until it is stable.
- The documentation for this package is incomplete, so using it might be confusing.
