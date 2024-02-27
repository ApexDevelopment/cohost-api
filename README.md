# cohost-api

An unofficial API wrapper for cohost.org that uses tRPC.

cohost-api is in very early development!

## Usage

```js
import { Client, PostBuilder } from "cohost-api";

const client = new Client();

async function demo() {
  // Log in to Cohost
  let user = await client.login("EMAIL_ADDRESS", "YOUR_PASSWORD");

  // Create new post
  let post = new PostBuilder();
  post.addMarkdownBlock("hello from cohost-api!");

  // Send to Cohost
  user?.projects[0].createDraft(post.build()); // or use .createPost() to publish it immediately
}
```

## Reasons not to use this (yet)

- The Cohost tRPC API is undocumented and not meant for public use.
- The Cohost tRPC API can change at any time and break this package.
- This package is in flux and breaking changes will happen all the time until it is stable.
