# Categories

These are API Specification related to the categories.

## Get All Categories

This is how user can get all categories.

### Request

- Endpoint: `/api/v1/categories`
- Request Method: `GET`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`

### Response

```json
{
  "data": [
    {
      "id": 8,
      "name": "Massage"
    },
    {
      "id": 6,
      "name": "Nail Salon"
    },
    {
      "id": 5,
      "name": "Accupresure"
    }
  ]
}
```

---

## Get A Single Categories

This is how user can get a single categories.

### Request

- Endpoint: `/api/v1/categories/{id}`
- Request Method: `GET`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`

### Response

```json
{
  "data": {
    "id": 1,
    "name": "Therapist"
  }
}
```

---

## Add A Categories

This is how user can add a category.

### Request

- Endpoint: `/api/v1/categories`
- Request Method: `POST`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`

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
      }
    ]
  }
}
```

---

## Edit A Categories

This is how user can edit a category.

### Request

- Endpoint: `/api/v1/categories/{id}?_method=PUT`
- Request Method: `POST`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`

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
      }
    ]
  }
}
```

---

## Delete A Categories

This is how user can delete a category.

### Request

- Endpoint: `/api/v1/categories/{id}`
- Request Method: `DELETE`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`

### Response

```json
{
  "message": "Category deleted successfully"
}
```
