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

## Add A Evetns

This is how user can add a events.

### Request

- Endpoint: `/api/v1/events`
- Request Method: `POST`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`

| Key         | Type | Null | Description                          |
| ----------- | ---- | ---- | ------------------------------------ |
| name        | text | ❎   | This is the name of the event.       |
| description | text | ❎   | This is the descrition of the event. |
| start-date  | date | ❎   | This is the start date of the event. |
| end-date    | date | ❎   | This is the end date of the event.   |

### Response

```json
{
  "data": {
    "id": 1,
    "name": "Test",
    "description": "test",
    "start_date": "2024-01-13",
    "end_date": "2024-01-16"
  }
}
```

---

## Edit A Events

This is how user can edit a event.

### Request

- Endpoint: `/api/v1/events/{id}?_method=PUT`
- Request Method: `POST`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`

| Key         | Type | Null | Description                          |
| ----------- | ---- | ---- | ------------------------------------ |
| name        | text | ❎   | This is the name of the event.       |
| description | text | ❎   | This is the descrition of the event. |
| start-date  | date | ❎   | This is the start date of the event. |
| end-date    | date | ❎   | This is the end date of the event.   |

### Response

```json
{
  "data": {
    "id": 1,
    "name": "Test 2",
    "description": "Tes 2",
    "start_date": "2024-01-01",
    "end_date": "2024-01-05"
  }
}
```

---

## Delete A Events

This is how user can delete a events.

### Request

- Endpoint: `/api/v1/events/{id}`
- Request Method: `DELETE`
- Headers:
  - `Accept: application/json`
  - `Authorization: Bearer {token}`

### Response

```json
{
  "message": "Events deleted successfully"
}
```
