import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getNotifications } from "../services/notificationService";
import NotificationCard from "../components/NotificationCard";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState(10);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getNotifications();

    const sorted = [...data].sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    setNotifications(sorted);
    setLoading(false);
  };

  const displayed = notifications.slice(0, topN);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          <EmojiEventsIcon sx={{ mr: 1, verticalAlign: "middle", color: "warning.main" }} />
          Priority Notifications
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Show Top</InputLabel>
          <Select
            value={topN}
            label="Show Top"
            onChange={(e) => setTopN(e.target.value)}
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          mb: 2,
          p: 1.5,
          bgcolor: "info.50",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "info.200",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Sort order: <strong>Placement</strong> → <strong>Result</strong> → <strong>Event</strong>, then latest timestamp first
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : displayed.length === 0 ? (
        <Alert severity="info">No notifications found.</Alert>
      ) : (
        displayed.map((item) => (
          <NotificationCard
            key={item.ID}
            notification={item}
            onView={() => forceUpdate((n) => n + 1)}
          />
        ))
      )}
    </Box>
  );
}

export default PriorityNotifications;
