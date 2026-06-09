import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Chip,
  CircularProgress,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAsRead,
  register,
  getToken,
  setToken,
  BASE_URL,
} from "../services/notificationService";

// ── Colour per HTTP method ──────────────────────────────────────────────────
const METHOD_COLORS = {
  GET: "success",
  POST: "primary",
  PATCH: "warning",
};

// ── JSON pretty-print response block ───────────────────────────────────────
function ResponseBox({ result }) {
  if (!result) return null;
  const isError = result.error;
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        bgcolor: isError ? "#fff0f0" : "#f0fff4",
        borderRadius: 2,
        border: "1px solid",
        borderColor: isError ? "error.light" : "success.light",
        fontFamily: "monospace",
        fontSize: 13,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        maxHeight: 320,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="caption"
        color={isError ? "error" : "success.dark"}
        fontWeight={700}
        display="block"
        mb={1}
      >
        {isError ? "❌ Error" : "✅ Response"}
      </Typography>
      {JSON.stringify(result.data, null, 2)}
    </Box>
  );
}

// ── Single API Card ─────────────────────────────────────────────────────────
function ApiCard({ method, endpoint, title, description, children, onCall, loading, result }) {
  return (
    <Accordion defaultExpanded sx={{ mb: 2, borderRadius: "8px !important", overflow: "hidden" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: "#fafafa" }}>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <Chip label={method} color={METHOD_COLORS[method]} size="small" sx={{ fontWeight: 700, minWidth: 56 }} />
          <Typography variant="body2" fontFamily="monospace" color="text.secondary">
            {BASE_URL}{endpoint}
          </Typography>
          <Typography variant="subtitle2" fontWeight={700}>
            {title}
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        {children}

        <Button
          variant="contained"
          endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          onClick={onCall}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Calling…" : `Call API`}
        </Button>

        <ResponseBox result={result} />
      </AccordionDetails>
    </Accordion>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
function ApiTester() {
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState({});
  const [results, setResults] = useState({});

  // Create notification inputs
  const [notifType, setNotifType] = useState("Placement");
  const [notifMsg, setNotifMsg] = useState("");

  // Mark as read input
  const [readId, setReadId] = useState("");

  // Register inputs
  const [regForm, setRegForm] = useState({
    email: "akash.23b1541215@abes.ac.in",
    name: "Akash Rauniyar",
    mobileNo: "9335528946",
    githubUsername: "akas-coder",
    rollNo: "2300321540019",
    accessCode: "cXuqht",
  });

  const call = async (key, fn) => {
    setLoading((p) => ({ ...p, [key]: true }));
    setResults((p) => ({ ...p, [key]: null }));
    try {
      const data = await fn();
      setResults((p) => ({ ...p, [key]: { data } }));
    } catch (err) {
      setResults((p) => ({
        ...p,
        [key]: { error: true, data: err.response?.data || err.message },
      }));
    } finally {
      setLoading((p) => ({ ...p, [key]: false }));
    }
  };

  const handleTokenSave = () => {
    setToken(token);
    alert("Token updated! Future API calls will use the new token.");
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h5" fontWeight={700} mb={1}>
        🔌 API Tester
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Click <strong>Call API</strong> on any card to fire the request and see the live response below it.
      </Typography>

      {/* Token Editor */}
      <Paper variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Typography variant="subtitle2" fontWeight={700} mb={1}>
          🔑 Bearer Token (shared across all calls)
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            size="small"
            fullWidth
            multiline
            maxRows={3}
            value={token}
            onChange={(e) => setTokenState(e.target.value)}
            placeholder="Paste your JWT token here"
            InputProps={{ sx: { fontFamily: "monospace", fontSize: 12 } }}
          />
          <Button variant="outlined" onClick={handleTokenSave} sx={{ minWidth: 100 }}>
            Save Token
          </Button>
        </Stack>
      </Paper>

      <Divider sx={{ mb: 3 }}>
        <Chip label="Notification APIs" />
      </Divider>

      {/* 1. GET all notifications */}
      <ApiCard
        method="GET"
        endpoint="/notifications"
        title="Get All Notifications"
        description="Fetches all notifications for the authenticated student."
        onCall={() => call("getAll", getNotifications)}
        loading={loading.getAll}
        result={results.getAll}
      />

      {/* 2. GET unread count */}
      <ApiCard
        method="GET"
        endpoint="/notifications/unread-count"
        title="Get Unread Count"
        description="Returns the total number of unread notifications."
        onCall={() => call("unread", getUnreadCount)}
        loading={loading.unread}
        result={results.unread}
      />

      {/* 3. POST create notification */}
      <ApiCard
        method="POST"
        endpoint="/notifications"
        title="Create Notification"
        description="Creates a new notification. Select type and enter a message."
        onCall={() => call("create", () => createNotification(notifType, notifMsg))}
        loading={loading.create}
        result={results.create}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={1}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Type</InputLabel>
            <Select value={notifType} label="Type" onChange={(e) => setNotifType(e.target.value)}>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            fullWidth
            label="Message"
            value={notifMsg}
            onChange={(e) => setNotifMsg(e.target.value)}
            placeholder="Enter notification message"
          />
        </Stack>
      </ApiCard>

      {/* 4. PATCH mark as read */}
      <ApiCard
        method="PATCH"
        endpoint="/notifications/{id}/read"
        title="Mark Notification as Read"
        description="Marks a specific notification as read using its ID."
        onCall={() => {
          if (!readId.trim()) return alert("Please enter a Notification ID");
          call("markRead", () => markAsRead(readId.trim()));
        }}
        loading={loading.markRead}
        result={results.markRead}
      >
        <TextField
          size="small"
          fullWidth
          label="Notification ID"
          value={readId}
          onChange={(e) => setReadId(e.target.value)}
          placeholder="e.g. 97c46c2e-2ce4-4228-9df9-ad835140ec44"
          sx={{ mb: 1 }}
        />
        <Alert severity="info" sx={{ fontSize: 12 }}>
          Tip: Copy an ID from the "Get All Notifications" response above.
        </Alert>
      </ApiCard>

      <Divider sx={{ my: 3 }}>
        <Chip label="Auth APIs" />
      </Divider>

      {/* 5. POST register */}
      <ApiCard
        method="POST"
        endpoint="/register"
        title="Register"
        description="Registers a student and returns clientID, clientSecret, and accessCode."
        onCall={() => call("register", () => register(regForm))}
        loading={loading.register}
        result={results.register}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
          mb={1}
        >
          {Object.entries(regForm).map(([key, val]) => (
            <TextField
              key={key}
              size="small"
              label={key}
              value={val}
              onChange={(e) =>
                setRegForm((p) => ({ ...p, [key]: e.target.value }))
              }
            />
          ))}
        </Box>
      </ApiCard>
    </Box>
  );
}

export default ApiTester;
