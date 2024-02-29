# Pages

These are the API Specification related to the pages.

## Get All Pages

This is how user can get all pages.

### Request

-   Endpoint: `/api/v1/pages`
-   Request Method: `GET`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"data": [
		{
			"id": 1,
			"name": "Home",
			"url": "http://localhost:3000/"
		},
		{
			"id": 2,
			"name": "Membership",
			"url": "http://localhost:3000/membership"
		},
		{
			"id": 3,
			"name": "Therapist",
			"url": "http://localhost:3000/therapist"
		},
		{
			"id": 4,
			"name": "Event & Media",
			"url": "http://localhost:3000/event-media"
		},
		{
			"id": 5,
			"name": "About Us",
			"url": "http://localhost:3000/about-Us"
		},
		{
			"id": 8,
			"name": "Contact Us",
			"url": "http://localhost:3000/contact-us"
		}
	]
}
```

---

## Get A Single Page

This is how user can get a single page.

### Request

-   Endpoint: `/api/v1/pages/{id}`
-   Request Method: `GET`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"data": {
		"id": 1,
		"name": "Home",
		"url": "http://localhost:3000/",
		"model": "App\\Models\\Page",
		"meta": [
			{
				"id": 3,
				"key": "name",
				"value": "title",
				"content": "This is a title"
			},
			{
				"id": 4,
				"key": "name",
				"value": "description",
				"content": "This is a description"
			}
		]
	}
}
```

---

## Delete A Pages

This is how user can delete a page.

### Request

-   Endpoint: `/api/v1/pages/{id}`
-   Request Method: `DELETE`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"message": "Page deleted successfully"
}
```
