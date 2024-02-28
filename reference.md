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

[index.ts:401](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L401)

### Properties

#### loggedIn

• **loggedIn**: `boolean` = `false`

Whether the client is logged in.

##### Defined in

[index.ts:393](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L393)

___

#### token

• `Private` **token**: ``null`` \| `string` = `null`

The session token for the client.

##### Defined in

[index.ts:391](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L391)

___

#### user

• **user**: ``null`` \| [`User`](#classesusermd) = `null`

The currently logged in user. Once logged in, can be used to access the user's information and projects.

##### Defined in

[index.ts:396](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L396)

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

[index.ts:423](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L423)


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

[index.ts:26](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L26)

___

#### postId

• **postId**: `number`

##### Defined in

[index.ts:25](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L25)

___

#### projectHandle

• **projectHandle**: `string`

##### Defined in

[index.ts:24](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L24)


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

[index.ts:148](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L148)

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

[index.ts:159](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L159)

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

[index.ts:181](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L181)

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

[index.ts:171](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L171)

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

[index.ts:191](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L191)

___

#### build

▸ **build**(): [`Post`](#classespostmd)

Builds the Post object from the data in the PostBuilder.

##### Returns

[`Post`](#classespostmd)

The Post object.

##### Defined in

[index.ts:200](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L200)


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

- [createDraft](#createdraft)
- [createPost](#createpost)
- [deletePost](#deletepost)
- [likePost](#likepost)
- [unlikePost](#unlikepost)
- [updatePost](#updatepost)

### Properties

#### avatarShape

• **avatarShape**: `string`

##### Defined in

[index.ts:232](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L232)

___

#### avatarURL

• **avatarURL**: `string`

##### Defined in

[index.ts:225](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L225)

___

#### dek

• **dek**: `string`

##### Defined in

[index.ts:223](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L223)

___

#### description

• **description**: `string`

##### Defined in

[index.ts:224](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L224)

___

#### displayName

• **displayName**: `string`

##### Defined in

[index.ts:222](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L222)

___

#### flags

• **flags**: `string`[]

##### Defined in

[index.ts:231](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L231)

___

#### handle

• **handle**: `string`

##### Defined in

[index.ts:221](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L221)

___

#### headerPreviewURL

• **headerPreviewURL**: `string`

##### Defined in

[index.ts:227](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L227)

___

#### headerURL

• **headerURL**: `string`

##### Defined in

[index.ts:226](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L226)

___

#### id

• **id**: `number`

##### Defined in

[index.ts:220](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L220)

___

#### privacy

• **privacy**: `string`

##### Defined in

[index.ts:228](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L228)

___

#### pronouns

• **pronouns**: `string`

##### Defined in

[index.ts:230](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L230)

___

#### url

• **url**: `string`

##### Defined in

[index.ts:229](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L229)

### Methods

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

[index.ts:300](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L300)

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

[index.ts:288](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L288)

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

[index.ts:311](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L311)

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

[index.ts:340](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L340)

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

[index.ts:352](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L352)

___

#### updatePost

▸ **updatePost**(`postToUpdate`, `newPost`): `Promise`\<`any`\>

Updates a post in the project.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `postToUpdate` | `number` \| [`Post`](#classespostmd) | The post or ID of the post to update. |
| `newPost` | [`Post`](#classespostmd) | The new post data. |

##### Returns

`Promise`\<`any`\>

##### Defined in

[index.ts:324](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L324)


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

[index.ts:374](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L374)

___

#### id

• **id**: `number`

The unique ID of this user.

##### Defined in

[index.ts:372](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L372)

___

#### projects

• **projects**: [`Project`](#classesprojectmd)[] = `[]`

The projects that this user is able to edit.

##### Defined in

[index.ts:370](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L370)

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

[index.ts:12](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L12)

___

#### PUBLISHED

• **PUBLISHED** = ``1``

##### Defined in

[index.ts:13](https://github.com/ApexDevelopment/cohost-api/blob/f4cad2e/index.ts#L13)
