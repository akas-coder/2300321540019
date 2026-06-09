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
# Stage 2 - Database Design

## Database Choice

PostgreSQL

### Reason

- Structured data
- Fast querying
- Supports indexing
- Easy relationship management

---

## Student Table

| Column | Type |
|----------|----------|
| id | BIGINT |
| name | VARCHAR |
| email | VARCHAR |

---

## Notification Table

| Column | Type |
|----------|----------|
| id | BIGINT |
| student_id | BIGINT |
| type | VARCHAR |
| message | TEXT |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

---

## Relationship

One Student → Many Notifications

student_id is a foreign key referencing Student table.

---

## Indexes

### Index 1

(student_id)

Purpose:
Quickly find notifications for a student.

### Index 2

(student_id, is_read)

Purpose:
Quickly find unread notifications.

### Index 3

(created_at)

Purpose:
Sort notifications by date.

---

## Scaling Challenges

As the system grows:

- Millions of notifications will be stored.
- Query speed may decrease.
- Database load will increase.

---

## Solutions

### Database Partitioning

Split notification data into smaller partitions.

### Read Replicas

Use replica databases for read operations.

### Caching

Use Redis to reduce database hits.

### Archiving

Move old notifications to archive storage.
# Stage 3 - Query Optimization

## Given Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

## Problems

1. SELECT * fetches unnecessary columns.
2. No composite index.
3. Sorting is expensive on large datasets.

## Optimized Query

```sql
SELECT id, type, message, created_at
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at DESC;
```

## Recommended Index

```sql
CREATE INDEX idx_notifications
ON notifications(student_id, is_read, created_at);
```

## Computational Cost

Without Index:
O(N)

With Index:
Approximately O(log N)

## Should Every Column Be Indexed?

No.

Reasons:

- Increased storage usage.
- Slower insert/update operations.
- Higher maintenance cost.

## Additional Query

Students receiving Placement notifications in last 7 days:

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```
# Stage 5 - Massive Notification Delivery

## Problem Statement

When HR clicks "Notify All", notifications must be sent to 50,000 students.

Current Implementation:

```javascript
for(student){
   sendEmail();
   saveToDatabase();
   pushToApp();
}
```

### Problems

- Sequential processing
- Slow execution
- High server load
- Failure handling is poor
- One failure may interrupt the process

Example:

If email sending fails for 200 students, the system becomes inconsistent.

---

## Proposed Solution

Use Message Queue Architecture.

Technologies:

- RabbitMQ
- Apache Kafka

---

## Architecture

HR
↓
Notification Service
↓
Message Queue
↓
Workers

Workers:

1. Email Worker
2. Database Worker
3. Push Notification Worker

---

## Working

### Step 1

HR creates notification.

### Step 2

Notification Service places messages in queue.

### Step 3

Workers consume messages independently.

### Step 4

Each worker performs its own task.

- Email Worker sends emails.
- Database Worker stores notifications.
- Push Worker sends real-time notifications.

---

## Retry Mechanism

If a task fails:

1. Retry automatically.
2. Retry up to 3 times.
3. Log failure details.

---

## Dead Letter Queue (DLQ)

If retries fail:

Message
↓
Dead Letter Queue

Benefits:

- Failed messages are preserved.
- Easy debugging.
- No data loss.

---

## Improved Pseudocode

```javascript
createNotification(notification){

   queue.publish(notification);

}

emailWorker(){

   while(true){

      notification = queue.consume();

      sendEmail(notification);

   }

}

databaseWorker(){

   while(true){

      notification = queue.consume();

      saveToDatabase(notification);

   }

}

pushWorker(){

   while(true){

      notification = queue.consume();

      sendPushNotification(notification);

   }

}
```

---

## Benefits

- High scalability
- Faster execution
- Fault tolerance
- Retry support
- Easy monitoring
- Handles 50,000+ students efficiently