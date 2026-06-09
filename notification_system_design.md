# Stage 1 - API Design

## Overview

The Campus Notification Platform allows students to receive notifications related to placements, results, and events.

---

## 1. Get Notifications

### Endpoint

GET /api/notifications

### Purpose

Fetch all notifications for a student.

### Response

```json
{
  "notifications": [
    {
      "id": 1,
      "type": "Placement",
      "message": "TCS placement drive announced",
      "isRead": false,
      "createdAt": "2026-06-09T10:00:00Z"
    }
  ]
}
```

---

## 2. Mark Notification as Read

### Endpoint

PATCH /api/notifications/{id}/read

### Purpose

Mark a notification as read.

### Response

```json
{
  "message": "Notification marked as read"
}
```

---

## 3. Get Unread Count

### Endpoint

GET /api/notifications/unread-count

### Purpose

Get total unread notifications.

### Response

```json
{
  "count": 5
}
```

---

## 4. Create Notification

### Endpoint

POST /api/notifications

### Request

```json
{
  "type": "Placement",
  "message": "Infosys hiring drive announced"
}
```

### Response

```json
{
  "message": "Notification created successfully"
}
```

---

## Real-Time Notification Design

### Technology

WebSocket

### Flow

Admin
↓
Backend Server
↓
WebSocket Server
↓
Connected Students

### Working

1. Admin creates notification.
2. Backend stores notification.
3. WebSocket pushes notification instantly.
4. Students receive notification without refreshing the page.
