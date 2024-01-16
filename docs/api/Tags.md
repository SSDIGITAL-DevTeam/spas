# Posts Tags

These are API Specification related to the posts tag.

## Add A Posts Tags

This is how user can add a posts tag.

### Request

-   Endpoint: `/api/v1/tags`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key  | Type | Null | Description                  |
| ---- | ---- | ---- | ---------------------------- |
| name | text | ❎   | This is the name of the tag. |

### Response

```json
{
	"status": true,
	"data": {
		"tags": [
			{
				"id": 1,
				"name": "Tag 1"
			},
			{
				"id": 2,
				"name": "Tag 2"
			}
		]
	}
}
```

---

## Edit A Posts Tags

This is how user can edit a post cover.

### Request

-   Endpoint: `/api/v1/tags/{id}?_method=PUT`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key  | Type | Null | Description                  |
| ---- | ---- | ---- | ---------------------------- |
| name | text | ❎   | This is the name of the tag. |

### Response

```json
{
	"status": true,
	"data": {
		"tags": [
			{
				"id": 1,
				"name": "Tag 1"
			},
			{
				"id": 2,
				"name": "Tag 2"
			}
		]
	}
}
```
