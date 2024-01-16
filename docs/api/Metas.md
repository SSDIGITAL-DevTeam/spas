# Meta

These are API Specification related to the meta.

## Add A Meta

This is how user can add a meta.

### Request

-   Endpoint: `/api/v1/metas`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: application/x-www-form-urlencoded`

| Key           | Type   | Null | Description              |
| ------------- | ------ | ---- | ------------------------ |
| key           | string | ❎   | The key of the meta.     |
| value         | string | ❎   | The value of the meta.   |
| content       | string | ❎   | The content of the meta. |
| metaable_id   | string | ❎   | The id of the model.     |
| metaable_type | string | ❎   | The type of the model.   |

### Response

```json
{
	"status": true,
	"data": {
		"id": 1,
		"key": "name",
		"value": "title",
		"content": "This is a title"
	}
}
```

---

## Edit A Meta

This is how user can edit a meta.

### Request

-   Endpoint: `/api/v1/meta/{id}`
-   Request Method: `PUT`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: application/x-www-form-urlencoded`

| Key     | Type   | Null | Description              |
| ------- | ------ | ---- | ------------------------ |
| key     | string | ❎   | The key of the meta.     |
| value   | string | ❎   | The value of the meta.   |
| content | string | ❎   | The content of the meta. |

### Response

```json
{
	"status": true,
	"data": {
		"id": 1,
		"key": "name",
		"value": "title",
		"content": "This is a title"
	}
}
```

---

## Delete A Meta

This is how user can delete a meta.

### Request

-   Endpoint: `/api/v1/meta/{id}`
-   Request Method: `DELETE`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
