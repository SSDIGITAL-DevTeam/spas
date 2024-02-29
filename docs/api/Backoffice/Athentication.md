# Authentication

These are API Specification related to the authentication.

## Sign In

This is how user can sign in to the application.

### Request

-   Endpoint: `/api/v1/auth/sign-in`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Content-Type: application/x-www-form-urlencoded`

| Key      | Type   | Null | Description        |
| -------- | ------ | ---- | ------------------ |
| email    | string | ❎   | The user email.    |
| password | string | ❎   | The user password. |

### Response

```json
{
	"status": "Request was successful",
	"message": null,
	"data": {
		"user": {
			"id": 1,
			"name": "Testing",
			"email": "testing@gmail.com"
		},
		"token": "{token}"
	}
}
```

---

## Sign Out

This is how user can sign out from the application.

### Request

-   Endpoint: `/api/v1/auth/sign-out`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"status": "Request was successful",
	"message": null,
	"data": {
		"message": "You have successfully been logged out and your token has been deleted"
	}
}
```

---

## Validate Token

This is how users can validate their tokens.

### Request

-   Endpoint: `/api/v1/auth/validate-token`
-   Request Method: `POST`
-   Headers:
    -   `Accept: application/json`
    -   `Authorization: Bearer {token}`

### Response

```json
{
	"status": true
}
```
