const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha2FzaC4yM2IxNTQxMjE1QGFiZXMuYWMuaW4iLCJleHAiOjE3ODA5ODc5NzUsImlhdCI6MTc4MDk4NzA3NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImUwOGVjZjcyLWM2MjYtNDI3MC1hMTFhLTA3NmRkMWEzMDZmOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFrYXNoIHJhdW5peWFyIiwic3ViIjoiNGEwYTBkZjQtODNmMS00ZTI0LWFkODgtZDMxNjYwZDRlMTRiIn0sImVtYWlsIjoiYWthc2guMjNiMTU0MTIxNUBhYmVzLmFjLmluIiwibmFtZSI6ImFrYXNoIHJhdW5peWFyIiwicm9sbE5vIjoiMjMwMDMyMTU0MDAxOSIsImFjY2Vzc0NvZGUiOiJjWHVxaHQiLCJjbGllbnRJRCI6IjRhMGEwZGY0LTgzZjEtNGUyNC1hZDg4LWQzMTY2MGQ0ZTE0YiIsImNsaWVudFNlY3JldCI6IkRWSGVwckNxVm5DS0tjclkifQ.G6DYYK2JaXz0K5OxxCbIEpPlI4rRJ7yyLU7j7PLXGTQ";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

module.exports = Log;