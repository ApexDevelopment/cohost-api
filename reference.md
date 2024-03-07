<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Classes](#classes)
  - [Class: Client](#class-client)
    - [Table of contents](#table-of-contents)
    - [Constructors](#constructors)
    - [Properties](#properties)
    - [Methods](#methods)
  - [Class: EditedProject](#class-editedproject)
    - [Hierarchy](#hierarchy)
    - [Table of contents](#table-of-contents-1)
    - [Properties](#properties-1)
    - [Methods](#methods-1)
  - [Class: Post](#class-post)
    - [Table of contents](#table-of-contents-2)
    - [Properties](#properties-2)
  - [Class: PostBuilder](#class-postbuilder)
    - [Table of contents](#table-of-contents-3)
    - [Constructors](#constructors-1)
    - [Methods](#methods-2)
  - [Class: Project](#class-project)
    - [Hierarchy](#hierarchy-1)
    - [Table of contents](#table-of-contents-4)
    - [Properties](#properties-3)
    - [Methods](#methods-3)
  - [Class: User](#class-user)
    - [Table of contents](#table-of-contents-5)
    - [Properties](#properties-4)
    - [Methods](#methods-4)
- [Enums](#enums)
  - [Enumeration: PostState](#enumeration-poststate)
    - [Table of contents](#table-of-contents-6)
    - [Enumeration Members](#enumeration-members)
  - [Enumeration: Privacy](#enumeration-privacy)
    - [Table of contents](#table-of-contents-7)
    - [Enumeration Members](#enumeration-members-1)
  - [Enumeration: SortOrder](#enumeration-sortorder)
    - [Table of contents](#table-of-contents-8)
    - [Enumeration Members](#enumeration-members-2)

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

[objects/client.ts:57](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/client.ts#L57)

### Properties

#### loggedIn

• **loggedIn**: `boolean` = `false`

Whether the client is logged in.

##### Defined in

[objects/client.ts:49](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/client.ts#L49)

___

#### user

• **user**: ``null`` \| [`User`](#classesusermd) = `null`

The currently logged in user. Once logged in, can be used to access the user's information and projects.

##### Defined in

[objects/client.ts:52](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/client.ts#L52)

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

[objects/client.ts:77](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/client.ts#L77)


<a name="classeseditedprojectmd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / EditedProject

## Class: EditedProject

A class representing a project on Cohost that the user has editing privileges for.

### Hierarchy

- [`Project`](#classesprojectmd)

  ↳ **`EditedProject`**

### Table of contents

#### Properties

- [atomFeedURL](#atomfeedurl)
- [avatarShape](#avatarshape)
- [avatarURL](#avatarurl)
- [dek](#dek)
- [description](#description)
- [displayName](#displayname)
- [flags](#flags)
- [frequentlyUsedTags](#frequentlyusedtags)
- [handle](#handle)
- [headerPreviewURL](#headerpreviewurl)
- [headerURL](#headerurl)
- [id](#id)
- [loggedOutPostVisibility](#loggedoutpostvisibility)
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

#### atomFeedURL

• **atomFeedURL**: `string`

##### Inherited from

[Project](#classesprojectmd).[atomFeedURL](#atomfeedurl)

##### Defined in

[objects/project.ts:50](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L50)

___

#### avatarShape

• **avatarShape**: `string`

##### Inherited from

[Project](#classesprojectmd).[avatarShape](#avatarshape)

##### Defined in

[objects/project.ts:47](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L47)

___

#### avatarURL

• **avatarURL**: `string`

##### Inherited from

[Project](#classesprojectmd).[avatarURL](#avatarurl)

##### Defined in

[objects/project.ts:40](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L40)

___

#### dek

• **dek**: `string`

The project subheading.

##### Inherited from

[Project](#classesprojectmd).[dek](#dek)

##### Defined in

[objects/project.ts:37](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L37)

___

#### description

• **description**: `string`

The description/bio of the project.

##### Inherited from

[Project](#classesprojectmd).[description](#description)

##### Defined in

[objects/project.ts:39](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L39)

___

#### displayName

• **displayName**: `string`

The display name, which shows up on the timeline.

##### Inherited from

[Project](#classesprojectmd).[displayName](#displayname)

##### Defined in

[objects/project.ts:35](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L35)

___

#### flags

• **flags**: `string`[]

##### Inherited from

[Project](#classesprojectmd).[flags](#flags)

##### Defined in

[objects/project.ts:46](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L46)

___

#### frequentlyUsedTags

• **frequentlyUsedTags**: `string`[]

##### Inherited from

[Project](#classesprojectmd).[frequentlyUsedTags](#frequentlyusedtags)

##### Defined in

[objects/project.ts:49](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L49)

___

#### handle

• **handle**: `string`

The handle of the project, without the @.

##### Inherited from

[Project](#classesprojectmd).[handle](#handle)

##### Defined in

[objects/project.ts:33](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L33)

___

#### headerPreviewURL

• **headerPreviewURL**: `string`

##### Inherited from

[Project](#classesprojectmd).[headerPreviewURL](#headerpreviewurl)

##### Defined in

[objects/project.ts:42](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L42)

___

#### headerURL

• **headerURL**: `string`

##### Inherited from

[Project](#classesprojectmd).[headerURL](#headerurl)

##### Defined in

[objects/project.ts:41](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L41)

___

#### id

• **id**: `number`

The unique ID of the project.

##### Inherited from

[Project](#classesprojectmd).[id](#id)

##### Defined in

[objects/project.ts:31](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L31)

___

#### loggedOutPostVisibility

• **loggedOutPostVisibility**: [`Privacy`](#enumsprivacymd)

##### Inherited from

[Project](#classesprojectmd).[loggedOutPostVisibility](#loggedoutpostvisibility)

##### Defined in

[objects/project.ts:48](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L48)

___

#### privacy

• **privacy**: [`Privacy`](#enumsprivacymd)

##### Inherited from

[Project](#classesprojectmd).[privacy](#privacy)

##### Defined in

[objects/project.ts:43](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L43)

___

#### pronouns

• **pronouns**: `string`

##### Inherited from

[Project](#classesprojectmd).[pronouns](#pronouns)

##### Defined in

[objects/project.ts:45](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L45)

___

#### url

• **url**: `string`

##### Inherited from

[Project](#classesprojectmd).[url](#url)

##### Defined in

[objects/project.ts:44](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L44)

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

[objects/project.ts:240](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L240)

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

[objects/project.ts:251](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L251)

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

[objects/project.ts:182](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L182)

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

[objects/project.ts:170](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L170)

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

[objects/project.ts:193](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L193)

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

##### Inherited from

[Project](#classesprojectmd).[getPosts](#getposts)

##### Defined in

[objects/project.ts:114](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L114)

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

[objects/project.ts:351](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L351)

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

[objects/project.ts:224](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L224)

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

[objects/project.ts:363](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L363)

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

[objects/project.ts:206](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L206)


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

[objects/post.ts:21](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L21)

___

#### postId

• **postId**: `number`

##### Defined in

[objects/post.ts:20](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L20)

___

#### projectHandle

• **projectHandle**: `string`

##### Defined in

[objects/post.ts:19](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L19)


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

[objects/post.ts:143](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L143)

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

[objects/post.ts:154](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L154)

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

[objects/post.ts:176](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L176)

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

[objects/post.ts:166](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L166)

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

[objects/post.ts:186](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L186)

___

#### build

▸ **build**(): [`Post`](#classespostmd)

Builds the Post object from the data in the PostBuilder.

##### Returns

[`Post`](#classespostmd)

The Post object.

##### Defined in

[objects/post.ts:195](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L195)


<a name="classesprojectmd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / Project

## Class: Project

A class representing a project on Cohost. A user can have multiple projects.

Do not instantiate this class directly. Projects can only be obtained from the API. cohost-api does not yet support creating new projects.

### Hierarchy

- **`Project`**

  ↳ [`EditedProject`](#classeseditedprojectmd)

### Table of contents

#### Properties

- [atomFeedURL](#atomfeedurl)
- [avatarShape](#avatarshape)
- [avatarURL](#avatarurl)
- [dek](#dek)
- [description](#description)
- [displayName](#displayname)
- [flags](#flags)
- [frequentlyUsedTags](#frequentlyusedtags)
- [handle](#handle)
- [headerPreviewURL](#headerpreviewurl)
- [headerURL](#headerurl)
- [id](#id)
- [loggedOutPostVisibility](#loggedoutpostvisibility)
- [privacy](#privacy)
- [pronouns](#pronouns)
- [url](#url)

#### Methods

- [getPosts](#getposts)

### Properties

#### atomFeedURL

• **atomFeedURL**: `string`

##### Defined in

[objects/project.ts:50](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L50)

___

#### avatarShape

• **avatarShape**: `string`

##### Defined in

[objects/project.ts:47](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L47)

___

#### avatarURL

• **avatarURL**: `string`

##### Defined in

[objects/project.ts:40](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L40)

___

#### dek

• **dek**: `string`

The project subheading.

##### Defined in

[objects/project.ts:37](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L37)

___

#### description

• **description**: `string`

The description/bio of the project.

##### Defined in

[objects/project.ts:39](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L39)

___

#### displayName

• **displayName**: `string`

The display name, which shows up on the timeline.

##### Defined in

[objects/project.ts:35](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L35)

___

#### flags

• **flags**: `string`[]

##### Defined in

[objects/project.ts:46](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L46)

___

#### frequentlyUsedTags

• **frequentlyUsedTags**: `string`[]

##### Defined in

[objects/project.ts:49](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L49)

___

#### handle

• **handle**: `string`

The handle of the project, without the @.

##### Defined in

[objects/project.ts:33](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L33)

___

#### headerPreviewURL

• **headerPreviewURL**: `string`

##### Defined in

[objects/project.ts:42](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L42)

___

#### headerURL

• **headerURL**: `string`

##### Defined in

[objects/project.ts:41](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L41)

___

#### id

• **id**: `number`

The unique ID of the project.

##### Defined in

[objects/project.ts:31](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L31)

___

#### loggedOutPostVisibility

• **loggedOutPostVisibility**: [`Privacy`](#enumsprivacymd)

##### Defined in

[objects/project.ts:48](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L48)

___

#### privacy

• **privacy**: [`Privacy`](#enumsprivacymd)

##### Defined in

[objects/project.ts:43](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L43)

___

#### pronouns

• **pronouns**: `string`

##### Defined in

[objects/project.ts:45](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L45)

___

#### url

• **url**: `string`

##### Defined in

[objects/project.ts:44](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L44)

### Methods

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

[objects/project.ts:114](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L114)


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

#### Methods

- [getFollowers](#getfollowers)
- [getFollowing](#getfollowing)
- [liked](#liked)
- [switchProject](#switchproject)

### Properties

#### email

• **email**: `string`

The email address of this user.

##### Defined in

[objects/user.ts:18](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L18)

___

#### id

• **id**: `number`

The unique ID of this user.

##### Defined in

[objects/user.ts:16](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L16)

___

#### projects

• **projects**: [`EditedProject`](#classeseditedprojectmd)[] = `[]`

The projects that this user is able to edit.

##### Defined in

[objects/user.ts:14](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L14)

### Methods

#### getFollowers

▸ **getFollowers**(`offset?`, `limit?`): `Promise`\<[`Project`](#classesprojectmd)[]\>

Gets the projects that follow the current project. Use `switchProject()` to change the current project.

This method is paginated, and the default offset is 0 and the default limit is 10.

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `offset` | `number` | `0` | How many projects to skip. |
| `limit` | `number` | `10` | The maximum number of projects to get. |

##### Returns

`Promise`\<[`Project`](#classesprojectmd)[]\>

The followers of this project.

##### Defined in

[objects/user.ts:56](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L56)

___

#### getFollowing

▸ **getFollowing**(`sortOrder`, `offset?`, `limit?`, `beforeTimestamp?`): `Promise`\<[`Project`](#classesprojectmd)[]\>

Gets the projects that the current project follows. Use `switchProject()` to change the current project.

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `sortOrder` | [`SortOrder`](#enumssortordermd) | `undefined` | What order to sort the projects in. |
| `offset` | `number` | `0` | How many projects to skip. |
| `limit` | `number` | `10` | The maximum number of projects to get. |
| `beforeTimestamp` | `number` | `undefined` | Not sure yet. Likely has to do with the last time the project posted. |

##### Returns

`Promise`\<[`Project`](#classesprojectmd)[]\>

The projects that this project follows.

##### Defined in

[objects/user.ts:80](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L80)

___

#### liked

▸ **liked**(`post`): `any`

Checks if the current project has liked a post. Use `switchProject()` to change the current project.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | `number` \| [`Post`](#classespostmd) | The post to check if the project has liked. |

##### Returns

`any`

Whether the project has liked the post.

##### Defined in

[objects/user.ts:40](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L40)

___

#### switchProject

▸ **switchProject**(`project`): `void`

Switches the currently active project to the given project. This is relevant for API calls related to notifications and getting the "liked" state of posts.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `project` | [`EditedProject`](#classeseditedprojectmd) | The project to switch to. |

##### Returns

`void`

##### Defined in

[objects/user.ts:31](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/user.ts#L31)

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

[objects/post.ts:7](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L7)

___

#### PUBLISHED

• **PUBLISHED** = ``1``

##### Defined in

[objects/post.ts:8](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/post.ts#L8)


<a name="enumsprivacymd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / Privacy

## Enumeration: Privacy

### Table of contents

#### Enumeration Members

- [PRIVATE](#private)
- [PUBLIC](#public)

### Enumeration Members

#### PRIVATE

• **PRIVATE** = ``"private"``

##### Defined in

[objects/project.ts:11](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L11)

___

#### PUBLIC

• **PUBLIC** = ``"public"``

##### Defined in

[objects/project.ts:10](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L10)


<a name="enumssortordermd"></a>

[cohost-api](../README.md) / [Exports](../modules.md) / SortOrder

## Enumeration: SortOrder

### Table of contents

#### Enumeration Members

- [ALPHA\_ASC](#alpha_asc)
- [ALPHA\_DESC](#alpha_desc)
- [FOLLOWED\_ASC](#followed_asc)
- [FOLLOWED\_DESC](#followed_desc)
- [RECENTLY\_POSTED](#recently_posted)

### Enumeration Members

#### ALPHA\_ASC

• **ALPHA\_ASC** = ``"alpha-asc"``

##### Defined in

[objects/project.ts:18](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L18)

___

#### ALPHA\_DESC

• **ALPHA\_DESC** = ``"alpha-desc"``

##### Defined in

[objects/project.ts:19](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L19)

___

#### FOLLOWED\_ASC

• **FOLLOWED\_ASC** = ``"followed-asc"``

##### Defined in

[objects/project.ts:16](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L16)

___

#### FOLLOWED\_DESC

• **FOLLOWED\_DESC** = ``"followed-desc"``

##### Defined in

[objects/project.ts:17](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L17)

___

#### RECENTLY\_POSTED

• **RECENTLY\_POSTED** = ``"recently-posted"``

##### Defined in

[objects/project.ts:15](https://github.com/ApexDevelopment/cohost-api/blob/001b75d/objects/project.ts#L15)
