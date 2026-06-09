import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";

const typeConfig = {
  Placement: { color: "primary", icon: <PlaceIcon fontSize="small" /> },
  Result: { color: "success", icon: <SchoolIcon fontSize="small" /> },
  Event: { color: "warning", icon: <EventIcon fontSize="small" /> },
};

function NotificationCard({ notification, onView }) {
  const viewed =
    localStorage.getItem(String(notification.ID)) === "viewed";

  const handleClick = () => {
    localStorage.setItem(String(notification.ID), "viewed");
    if (onView) onView(notification.ID);
  };

  const config = typeConfig[notification.Type] || { color: "default", icon: null };

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        cursor: "pointer",
        borderLeft: "4px solid",
        borderColor: viewed ? "grey.400" : "primary.main",
        backgroundColor: viewed ? "#f9f9f9" : "#fff",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            icon={config.icon}
            label={notification.Type}
            color={config.color}
            size="small"
            variant={viewed ? "outlined" : "filled"}
          />
          {!viewed && (
            <Chip label="New" color="error" size="small" sx={{ ml: 1 }} />
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{ color: viewed ? "text.secondary" : "text.primary", mb: 0.5 }}
        >
          {notification.Message}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {notification.Timestamp
            ? new Date(notification.Timestamp).toLocaleString()
            : "—"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
