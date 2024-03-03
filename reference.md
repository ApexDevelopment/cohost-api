<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Classes](#classes)
  - [Class: Client](#class-client)
    - [Table of contents](#table-of-contents)
    - [Constructors](#constructors)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Class: Post](#class-post)
    - [Table of contents](#table-of-contents-1)
    - [Properties](#properties-1)
  - [Class: PostBuilder](#class-postbuilder)
    - [Table of contents](#table-of-contents-2)
    - [Constructors](#constructors-1)
    - [Methods](#methods-1)
  - [Class: Project](#class-project)
    - [Table of contents](#table-of-contents-3)
    - [Properties](#properties-2)
    - [Methods](#methods-2)
  - [Class: User](#class-user)
    - [Table of contents](#table-of-contents-4)
    - [Properties](#properties-3)
- [Enums](#enums)
  - [Enumeration: PostState](#enumeration-poststate)
    - [Table of contents](#table-of-contents-5)
    - [Enumeration Members](#enumeration-members)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Classes


<a name="classesclientmd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / Client

## Class: Client

A Cohost API client. Instantiate this class to interact with the Cohost API.

### Table of contents

#### Constructors

- [constructor](#constructor)

#### Properties

- [loggedIn](#loggedin)
- [token](#token)
- [user](#user)

#### Methods

- [login](#login)

### Constructors

#### constructor

• **new Client**(): [`Client`](#classesclientmd)

Creates a new Cohost API client. Requires no arguments.

##### Returns

[`Client`](#classesclientmd)

##### Defined in

[objects/client.ts:28](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/client.ts#L28)

### Properties

#### loggedIn

• **loggedIn**: `boolean` = `false`

Whether the client is logged in.

##### Defined in

[objects/client.ts:20](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/client.ts#L20)

___

#### token

• `Private` **token**: ``null`` \| `string` = `null`

The session token for the client.

##### Defined in

[objects/client.ts:18](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/client.ts#L18)

___

#### user

• **user**: ``null`` \| [`User`](#classesusermd) = `null`

The currently logged in user. Once logged in, can be used to access the user's information and projects.

##### Defined in

[objects/client.ts:23](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/client.ts#L23)

### Methods

#### login

▸ **login**(`email`, `password`): `Promise`\<``null`` \| [`User`](#classesusermd)\>

Logs in to Cohost, creating a new session.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `email` | `string` | The email of the User. |
| `password` | `string` | The User's password. |

##### Returns

`Promise`\<``null`` \| [`User`](#classesusermd)\>

The logged in User, or null if the login failed.

##### Defined in

[objects/client.ts:64](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/client.ts#L64)


<a name="classespostmd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / Post

## Class: Post

A class representing a post on Cohost.

This class does not contain all the data that a post can have. See the TimelinePost class for a more complete representation of a post.

This class is not used for creating posts. Instead, use the PostBuilder class to create a new post.

### Table of contents

#### Properties

- [content](#content)
- [postId](#postid)
- [projectHandle](#projecthandle)

### Properties

#### content

• **content**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `adultContent` | `boolean` |
| `blocks` | `object`[] |
| `cws` | `string`[] |
| `headline` | `string` |
| `postState` | [`PostState`](#enumspoststatemd) |
| `tags` | `string`[] |

##### Defined in

[objects/post.ts:21](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L21)

___

#### postId

• **postId**: `number`

##### Defined in

[objects/post.ts:20](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L20)

___

#### projectHandle

• **projectHandle**: `string`

##### Defined in

[objects/post.ts:19](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L19)


<a name="classespostbuildermd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / PostBuilder

## Class: PostBuilder

A class for creating Post objects.

Example usage:
```ts
let postBuilder = new PostBuilder("Hello, world!");
postBuilder.addMarkdownBlock("This is a test post from cohost-api.");
postBuilder.addTag("cohost-api");
let finishedPost = postBuilder.build();
```

### Table of contents

#### Constructors

- [constructor](#constructor)

#### Methods

- [addBlock](#addblock)
- [addCw](#addcw)
- [addMarkdownBlock](#addmarkdownblock)
- [addTag](#addtag)
- [build](#build)

### Constructors

#### constructor

• **new PostBuilder**(`headline?`, `adultContent?`): [`PostBuilder`](#classespostbuildermd)

Creates a new PostBuilder, used for easily constructing a Post object.

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `headline` | `string` | `""` | The headline for the post. Appears at the top of a post. Defaults to an empty string. |
| `adultContent` | `boolean` | `false` | Whether the post contains adult content. Defaults to false. |

##### Returns

[`PostBuilder`](#classespostbuildermd)

##### Defined in

[objects/post.ts:143](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L143)

### Methods

#### addBlock

▸ **addBlock**(`type`, `block`): [`PostBuilder`](#classespostbuildermd)

Adds a block of content to the post. Only use this if you are familiar with the types of content blocks that Cohost supports. Otherwise, use `addMarkdownBlock()`.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | The type of content block to add. |
| `block` | `object` | The content of the block. |

##### Returns

[`PostBuilder`](#classespostbuildermd)

The PostBuilder object, for chaining.

##### Defined in

[objects/post.ts:154](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L154)

___

#### addCw

▸ **addCw**(`cw`): [`PostBuilder`](#classespostbuildermd)

Adds a content warning to the post.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cw` | `string` | The content warning to add to the post. |

##### Returns

[`PostBuilder`](#classespostbuildermd)

The PostBuilder object, for chaining.

##### Defined in

[objects/post.ts:176](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L176)

___

#### addMarkdownBlock

▸ **addMarkdownBlock**(`content`): [`PostBuilder`](#classespostbuildermd)

Adds a block of markdown text to the post.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | The markdown string to add to the post. |

##### Returns

[`PostBuilder`](#classespostbuildermd)

The PostBuilder object, for chaining.

##### Defined in

[objects/post.ts:166](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L166)

___

#### addTag

▸ **addTag**(`tag`): [`PostBuilder`](#classespostbuildermd)

Adds a #tag to the post.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The #tag to add to the post. You do not need to include the # symbol. |

##### Returns

[`PostBuilder`](#classespostbuildermd)

The PostBuilder object, for chaining.

##### Defined in

[objects/post.ts:186](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L186)

___

#### build

▸ **build**(): [`Post`](#classespostmd)

Builds the Post object from the data in the PostBuilder.

##### Returns

[`Post`](#classespostmd)

The Post object.

##### Defined in

[objects/post.ts:195](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L195)


<a name="classesprojectmd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / Project

## Class: Project

A class representing a project on Cohost. A user can have multiple projects.

Do not instantiate this class directly. Projects can only be obtained from the API. cohost-api does not yet support creating new projects.

### Table of contents

#### Properties

- [avatarShape](#avatarshape)
- [avatarURL](#avatarurl)
- [dek](#dek)
- [description](#description)
- [displayName](#displayname)
- [flags](#flags)
- [handle](#handle)
- [headerPreviewURL](#headerpreviewurl)
- [headerURL](#headerurl)
- [id](#id)
- [privacy](#privacy)
- [pronouns](#pronouns)
- [url](#url)

#### Methods

- [addAttachment](#addattachment)
- [createDraft](#createdraft)
- [createPost](#createpost)
- [deletePost](#deletepost)
- [getPosts](#getposts)
- [likePost](#likepost)
- [publishDraft](#publishdraft)
- [unlikePost](#unlikepost)
- [updatePost](#updatepost)

### Properties

#### avatarShape

• **avatarShape**: `string`

##### Defined in

[objects/project.ts:28](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L28)

___

#### avatarURL

• **avatarURL**: `string`

##### Defined in

[objects/project.ts:21](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L21)

___

#### dek

• **dek**: `string`

##### Defined in

[objects/project.ts:19](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L19)

___

#### description

• **description**: `string`

##### Defined in

[objects/project.ts:20](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L20)

___

#### displayName

• **displayName**: `string`

##### Defined in

[objects/project.ts:18](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L18)

___

#### flags

• **flags**: `string`[]

##### Defined in

[objects/project.ts:27](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L27)

___

#### handle

• **handle**: `string`

##### Defined in

[objects/project.ts:17](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L17)

___

#### headerPreviewURL

• **headerPreviewURL**: `string`

##### Defined in

[objects/project.ts:23](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L23)

___

#### headerURL

• **headerURL**: `string`

##### Defined in

[objects/project.ts:22](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L22)

___

#### id

• **id**: `number`

##### Defined in

[objects/project.ts:16](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L16)

___

#### privacy

• **privacy**: `string`

##### Defined in

[objects/project.ts:24](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L24)

___

#### pronouns

• **pronouns**: `string`

##### Defined in

[objects/project.ts:26](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L26)

___

#### url

• **url**: `string`

##### Defined in

[objects/project.ts:25](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L25)

### Methods

#### addAttachment

▸ **addAttachment**(`post`, `filepath`): `Promise`\<`number`\>

Adds an attachment to a post. This must be done after the post is created. This is a limitation of the Cohost API.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | [`Post`](#classespostmd) | The post to add the attachment to. |
| `filepath` | `string` | The path to the file to upload. |

##### Returns

`Promise`\<`number`\>

The ID of the attachment.

##### Defined in

[objects/project.ts:174](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L174)

▸ **addAttachment**(`post`, `filename`, `mimeType`, `attachment`, `width`, `height`): `Promise`\<`number`\>

Adds an attachment to a post. This must be done after the post is created. This is a limitation of the Cohost API.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | [`Post`](#classespostmd) | The post to add the attachment to. |
| `filename` | `string` | The name of the file to upload. |
| `mimeType` | `string` | The MIME type of the file. |
| `attachment` | `Buffer` | A Buffer containing the file to upload. |
| `width` | `number` | The width of the image. |
| `height` | `number` | The height of the image. |

##### Returns

`Promise`\<`number`\>

The ID of the attachment.

##### Defined in

[objects/project.ts:185](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L185)

___

#### createDraft

▸ **createDraft**(`post`): `Promise`\<[`Post`](#classespostmd)\>

Creates a draft of a post in the project.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | [`Post`](#classespostmd) | The post to send to the project's drafts. |

##### Returns

`Promise`\<[`Post`](#classespostmd)\>

The post with its postId set.

##### Defined in

[objects/project.ts:100](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L100)

___

#### createPost

▸ **createPost**(`post`): `Promise`\<[`Post`](#classespostmd)\>

Publishes a post to the project.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | [`Post`](#classespostmd) | The post to publish. |

##### Returns

`Promise`\<[`Post`](#classespostmd)\>

The post with its postId set.

##### Defined in

[objects/project.ts:84](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L84)

___

#### deletePost

▸ **deletePost**(`post`): `Promise`\<`void`\>

Deletes a post from the project.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | `number` \| [`Post`](#classespostmd) | The post or ID of the post to delete. |

##### Returns

`Promise`\<`void`\>

##### Defined in

[objects/project.ts:115](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L115)

___

#### getPosts

▸ **getPosts**(`page?`, `options?`): `Promise`\<`any`\>

Gets a page of posts from the project. The Cohost API returns 20 posts per page.

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `page` | `number` | `0` | The page of posts to get. Defaults to 0. |
| `options` | `Object` | `undefined` | Options for filtering the returned posts. |
| `options.hideAsks` | `boolean` | `undefined` | - |
| `options.hideReplies` | `boolean` | `undefined` | - |
| `options.hideShares` | `boolean` | `undefined` | - |
| `options.pinnedPostsAtTop` | `boolean` | `undefined` | - |

##### Returns

`Promise`\<`any`\>

An array of TimelinePosts from the project.

##### Defined in

[objects/project.ts:323](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L323)

___

#### likePost

▸ **likePost**(`post`): `Promise`\<`void`\>

Gives a like from this project to a post.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | `number` \| [`Post`](#classespostmd) | The post to like. |

##### Returns

`Promise`\<`void`\>

##### Defined in

[objects/project.ts:289](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L289)

___

#### publishDraft

▸ **publishDraft**(`draftPost`): `Promise`\<`void`\>

Publishes a post from the project's drafts.

In the future, this function will also accept a number as the first argument, which will be the ID of the draft post to publish.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `draftPost` | [`Post`](#classespostmd) | The draft post to publish. |

##### Returns

`Promise`\<`void`\>

##### Defined in

[objects/project.ts:154](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L154)

___

#### unlikePost

▸ **unlikePost**(`post`): `Promise`\<`void`\>

Removes a like from this project to a post.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | `number` \| [`Post`](#classespostmd) | The post to unlike. |

##### Returns

`Promise`\<`void`\>

##### Defined in

[objects/project.ts:305](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L305)

___

#### updatePost

▸ **updatePost**(`postToUpdate`, `newPost`): `Promise`\<`void`\>

Updates a post in the project.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `postToUpdate` | `number` \| [`Post`](#classespostmd) | The post or ID of the post to update. |
| `newPost` | [`Post`](#classespostmd) | The new post data. |

##### Returns

`Promise`\<`void`\>

##### Defined in

[objects/project.ts:132](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/project.ts#L132)


<a name="classesusermd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / User

## Class: User

The currently logged in user. Do not instantiate this class; instead, use the `login()` method of the Client class to log in.

This class is not used for any other users because the Cohost API does not provide a way to get other users; it only provides other users' projects.

### Table of contents

#### Properties

- [email](#email)
- [id](#id)
- [projects](#projects)

### Properties

#### email

• **email**: `string`

The email address of this user.

##### Defined in

[objects/user.ts:16](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/user.ts#L16)

___

#### id

• **id**: `number`

The unique ID of this user.

##### Defined in

[objects/user.ts:14](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/user.ts#L14)

___

#### projects

• **projects**: [`Project`](#classesprojectmd)[] = `[]`

The projects that this user is able to edit.

##### Defined in

[objects/user.ts:12](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/user.ts#L12)

# Enums


<a name="enumspoststatemd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / PostState

## Enumeration: PostState

Whether a post is a draft or published.

### Table of contents

#### Enumeration Members

- [DRAFT](#draft)
- [PUBLISHED](#published)

### Enumeration Members

#### DRAFT

• **DRAFT** = ``0``

##### Defined in

[objects/post.ts:7](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L7)

___

#### PUBLISHED

• **PUBLISHED** = ``1``

##### Defined in

[objects/post.ts:8](https://github.com/ApexDevelopment/cohost-api/blob/bacdf5d/objects/post.ts#L8)
