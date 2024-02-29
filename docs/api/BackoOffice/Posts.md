# Post

These are API Specification related to the posts.

## Get All Post

This is how user can get all posts.

### Request

-   Endpoint: `/api/v1/posts`
-   Request Method: `GET`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"data": {
		"id": 5,
		"title": "Title Test 3",
		"slug": "title-test-3",
		"content": "test",
		"status": "published",
		"published_at": "2024-01-13 06:41:01",
		"cover": {
			"id": 5,
			"url-image": "post-image/pRFHzmZ8FNfBi0uAJI9GwG75L0PPibbHaFOCEsbU.png"
		},
		"categories": [
			{
				"id": 1,
				"categories": "Categories 1"
			},
			{
				"id": 2,
				"categories": "Categories 2"
			}
		],
		"tags": [
			{
				"id": 1,
				"name": "Tag 1"
			},
			{
				"id": 2,
				"name": "Tag 2"
			}
		],
		"meta": [
			{
				"id": 1,
				"key": "name",
				"value": "title",
				"content": "Example Title"
			},
			{
				"id": 2,
				"key": "name",
				"value": "description",
				"content": "This is an example description."
			}
		]
	}
}
```

---

## Get A Single Posts

This is how user can get a single posts.

### Request

-   Endpoint: `/api/v1/posts/{id}`
-   Request Method: `GET`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"data": {
		"id": 2,
		"title": "Title Test 1",
		"slug": "title-test-1",
		"content": "test",
		"status": "published",
		"published_at": "2024-01-13 06:41:01",
		"cover": {
			"id": 2,
			"url-image": "post-image/vf3zQGUP3CgNMmNOQfEXgL02bvi7rvYk7yiUzaCb.png"
		},
		"categories": [
			{
				"id": 1,
				"categories": "Categories 1"
			},
			{
				"id": 2,
				"categories": "Categories 2"
			}
		],
		"tags": [
			{
				"id": 1,
				"name": "Tag 1"
			},
			{
				"id": 2,
				"name": "Tag 2"
			}
		],
		"meta": [
			{
				"id": 1,
				"key": "name",
				"value": "title",
				"content": "Example Title"
			},
			{
				"id": 2,
				"key": "name",
				"value": "description",
				"content": "This is an example description."
			}
		]
	}
}
```

---

## Add A Post

This is how user can add a posts.

### Request

-   Endpoint: `/api/v1/posts`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key              | Type    | Null | Description                  |
| ---------------- | ------- | ---- | ---------------------------- |
| title            | string  | ❎   | The title of the posts.      |
| content          | string  | ❎   | The content of the posts.    |
| cover            | file    | ❎   | The cover of the posts.      |
| status           | integer | ❎   | The status of the posts.     |
| categories       | varchar | ❎   | The categories of the posts. |
| tag[i][name]     | string  | ❎   | The name of the tag.         |
| meta[i][key]     | string  | ❎   | The key of the meta.         |
| meta[i][value]   | string  | ❎   | The value of the meta.       |
| meta[i][content] | string  | ❎   | The content of the meta.     |

### Response

```json
{
	"data": {
		"id": 1,
		"title": "Example Title 1",
		"slug": "example-title-1",
		"content": "This is an example content.",
		"status": "Published",
		"published_at": "Wednesday, 10 January 2024",
		"model": "App\\Models\\Posts",
		"cover": {
			"id": 2,
			"url-image": "post-image/vf3zQGUP3CgNMmNOQfEXgL02bvi7rvYk7yiUzaCb.png"
		},
		"categories": [
			{
				"id": 1,
				"categories": "Categories 1"
			},
			{
				"id": 2,
				"categories": "Categories 2"
			}
		],
		"tags": [
			{
				"id": 1,
				"name": "Tag 1"
			},
			{
				"id": 2,
				"name": "Tag 2"
			}
		],
		"meta": [
			{
				"id": 1,
				"key": "name",
				"value": "title",
				"content": "Example Title"
			},
			{
				"id": 2,
				"key": "name",
				"value": "description",
				"content": "This is an example description."
			}
		]
	}
}
```

---

## Edit A posts

This is how user can edit a post.

### Request

-   Endpoint: `/api/v1/posts/{id}?_method=PUT`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key          | Type    | Null | Description                  |
| ------------ | ------- | ---- | ---------------------------- |
| title        | string  | ❎   | The title of the posts.      |
| content      | string  | ❎   | The content of the posts.    |
| cover        | file    | ✅   | The cover of the posts.      |
| status       | integer | ❎   | The status of the posts.     |
| categories   | string  | ❎   | The categories of the posts. |
| tag[i][name] | string  | ❎   | The name of the tag.         |

### Response

```json
{
	"data": {
		"id": 1,
		"title": "Example Title 1",
		"slug": "example-title-1",
		"content": "This is an example content.",
		"status": "Published",
		"published_at": "Wednesday, 10 January 2024",
		"model": "App\\Models\\News",
		"cover": {
			{
				"id": 2,
				"url-image": "post-image/vf3zQGUP3CgNMmNOQfEXgL02bvi7rvYk7yiUzaCb.png"
			}
		},
		"categories": [
			{
				"id": 1,
				"categories": "Categories 1"
			},
			{
				"id": 2,
				"categories": "Categories 2"
			}
		],
		"tags": [
			{
				"id": 1,
				"name": "Tag 1"
			},
			{
				"id": 2,
				"name": "Tag 2"
			}
		],
		"meta": [
			{
				"id": 1,
				"key": "name",
				"value": "title",
				"content": "Example Title"
			},
			{
				"id": 2,
				"key": "name",
				"value": "description",
				"content": "This is an example description."
			}
		]
	}
}
```

---

## Delete A Posts

This is how user can delete a posts.

### Request

-   Endpoint: `/api/v1/posts/{id}`
-   Request Method: `DELETE`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"message": "Post deleted successfully"
}
```
