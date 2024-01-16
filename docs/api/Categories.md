# Posts Categories

These are API Specification related to the post category.

## Add A Posts Categories

This is how user can add a post category.

### Request

-   Endpoint: `/api/v1/categories`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key  | Type | Null | Description                       |
| ---- | ---- | ---- | --------------------------------- |
| name | text | ❎   | This is the name of the category. |

### Response

```json
{
	"status": true,
	"data": {
		"category": [
			{
				"id": 1,
				"name": "Category 1"
			},
			{
				"id": 2,
				"name": "Category 2"
			}
		]
	}
}
```

---

## Edit A Posts Categories

This is how user can edit a posts category.

### Request

-   Endpoint: `/api/v1/categories/{id}?_method=PUT`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key  | Type | Null | Description                         |
| ---- | ---- | ---- | ----------------------------------- |
| name | text | ❎   | This is the name of the categories. |

### Response

```json
{
	"status": true,
	"data": {
		"category": [
			{
				"id": 1,
				"name": "Category 1"
			},
			{
				"id": 2,
				"name": "Category 2"
			}
		]
	}
}
```

---

## Delete A Categories

This is how user can delete a category.

### Request

-   Endpoint: `/api/v1/categories/{id}`
-   Request Method: `DELETE`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"message": "Category deleted successfully"
}
```
