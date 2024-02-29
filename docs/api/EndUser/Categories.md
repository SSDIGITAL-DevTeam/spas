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
