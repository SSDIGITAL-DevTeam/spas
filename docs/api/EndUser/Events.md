# Events

These are API Specification related to the events.

## Get All Events

This is how user can get all events.

### Request

- Endpoint: `/api/v1/events`
- Request Method: `GET`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`

### Response

```json
{
  "data": [
    {
      "id": 3,
      "name": "Test",
      "description": "test",
      "start_date": "2024-01-13 00:00:00",
      "end_date": "2024-01-16 00:00:00"
    },
    {
      "id": 1,
      "name": "Therapist",
      "description": "Therapist in spas",
      "start_date": "2024-01-23 00:00:00",
      "end_date": "2024-01-27 00:00:00"
    }
  ]
}
```

---

## Get A Single Events

This is how user can get a single events.

### Request

- Endpoint: `/api/v1/events/{id}`
- Request Method: `GET`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`

### Response

```json
{
  "data": {
    "id": 1,
    "name": "Test Lagi",
    "description": "Tes 2",
    "start_date": "2024-01-01 00:00:00",
    "end_date": "2024-01-05 00:00:00"
  }
}
```

---
