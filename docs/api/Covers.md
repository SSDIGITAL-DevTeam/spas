# Posts Covers

These are API Specification related to the posts cover.

## Add A Posts Covers

This is how user can add a posts cover.

### Request

-   Endpoint: `/api/v1/covers`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key     | Type    | Null | Description                      |
| ------- | ------- | ---- | -------------------------------- |
| url     | file    | ❎   | This is the url of the news url. |
| post_id | integer | ❎   | This is the news id.             |

### Response

```json
{
	"status": true,
	"data": {
		"id": 3,
		"url-image": "post-image/pRFHzmZ8FNfBi0uAJI9GwG75L0PPibbHaFOCEsbU.png"
	}
}
```

---

## Edit A Posts Covers

This is how user can edit a post cover.

### Request

-   Endpoint: `/api/v1/covers/{id}?_method=PUT`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`
    -   `Content-Type: multipart/form-data`

| Key   | Type | Null | Description                          |
| ----- | ---- | ---- | ------------------------------------ |
| cover | file | ❎   | This is the cover of the news cover. |

### Response

```json
{
	"status": true,
	"data": {
		"id": 3,
		"url-image": "post-image/pRFHzmZ8FNfBi0uAJI9GwG75L0PPibbHaFOCEsbU.png"
	}
}
```

---

## Delete A Posts Covers

This is how user can delete a post cover.

### Request

-   Endpoint: `/api/v1/covers/{id}`
-   Request Method: `DELETE`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

No content.
