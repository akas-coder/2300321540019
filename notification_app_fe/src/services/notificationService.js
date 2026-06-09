import axios from "axios";

export const BASE_URL = "http://4.224.186.213/evaluation-service";

// ── Store token in one place so ApiTester can update it at runtime ──
let _token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha2FzaC4yM2IxNTQxMjE1QGFiZXMuYWMuaW4iLCJleHAiOjE3ODA5ODc5NzUsImlhdCI6MTc4MDk4NzA3NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImUwOGVjZjcyLWM2MjYtNDI3MC1hMTFhLTA3NmRkMWEzMDZmOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFrYXNoIHJhdW5peWFyIiwic3ViIjoiNGEwYTBkZjQtODNmMS00ZTI0LWFkODgtZDMxNjYwZDRlMTRiIn0sImVtYWlsIjoiYWthc2guMjNiMTU0MTIxNUBhYmVzLmFjLmluIiwibmFtZSI6ImFrYXNoIHJhdW5peWFyIiwicm9sbE5vIjoiMjMwMDMyMTU0MDAxOSIsImFjY2Vzc0NvZGUiOiJjWHVxaHQiLCJjbGllbnRJRCI6IjRhMGEwZGY0LTgzZjEtNGUyNC1hZDg4LWQzMTY2MGQ0ZTE0YiIsImNsaWVudFNlY3JldCI6IkRWSGVwckNxVm5DS0tjclkifQ.G6DYYK2JaXz0K5OxxCbIEpPlI4rRJ7yyLU7j7PLXGTQ";

export const getToken = () => _token;
export const setToken = (t) => { _token = t; };

const authHeaders = () => ({
  Authorization: `Bearer ${_token}`,
  "Content-Type": "application/json",
});

// 1. GET all notifications
export const getNotifications = async () => {
  const response = await axios.get(`${BASE_URL}/notifications`, {
    headers: authHeaders(),
  });
  return response.data.notifications || [];
};

// 2. GET unread count
export const getUnreadCount = async () => {
  const response = await axios.get(`${BASE_URL}/notifications/unread-count`, {
    headers: authHeaders(),
  });
  return response.data;
};

// 3. POST create notification
export const createNotification = async (type, message) => {
  const response = await axios.post(
    `${BASE_URL}/notifications`,
    { type, message },
    { headers: authHeaders() }
  );
  return response.data;
};

// 4. PATCH mark notification as read
export const markAsRead = async (id) => {
  const response = await axios.patch(
    `${BASE_URL}/notifications/${id}/read`,
    {},
    { headers: authHeaders() }
  );
  return response.data;
};

// 5. POST register
export const register = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
