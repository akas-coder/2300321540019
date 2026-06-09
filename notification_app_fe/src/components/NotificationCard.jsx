import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";

const typeConfig = {
  Placement: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", label: "📌 Placement" },
  Result:    { color: "#34d399", bg: "rgba(52,211,153,0.12)",  label: "🎓 Result" },
  Event:     { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  label: "🗓️ Event" },
};

function NotificationCard({ notification, onView }) {
  const viewed =
    localStorage.getItem(String(notification.ID)) === "viewed";

  const handleClick = () => {
    localStorage.setItem(String(notification.ID), "viewed");
    if (onView) onView(notification.ID);
  };

  const cfg = typeConfig[notification.Type] || {
    color: "#94a3b8", bg: "rgba(148,163,184,0.08)", label: notification.Type,
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        cursor: "pointer",
        background: viewed
          ? "rgba(255,255,255,0.03)"
          : cfg.bg,
        border: "1px solid",
        borderColor: viewed
          ? "rgba(255,255,255,0.07)"
          : `${cfg.color}55`,
        borderLeft: "4px solid",
        borderLeftColor: viewed ? "rgba(255,255,255,0.15)" : cfg.color,
        backdropFilter: "blur(14px)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 8px 32px ${cfg.color}22`,
          borderColor: cfg.color,
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
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Chip
            label={cfg.label}
            size="small"
            sx={{
              bgcolor: viewed ? "rgba(255,255,255,0.06)" : `${cfg.color}22`,
              color: viewed ? "text.secondary" : cfg.color,
              fontWeight: 600,
              border: `1px solid ${cfg.color}44`,
              fontSize: 12,
            }}
          />
          {!viewed && (
            <Chip
              label="NEW"
              size="small"
              sx={{
                bgcolor: "rgba(248,113,113,0.15)",
                color: "#f87171",
                fontWeight: 700,
                fontSize: 10,
                border: "1px solid rgba(248,113,113,0.3)",
              }}
            />
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: viewed ? "text.secondary" : "text.primary",
            mb: 0.5,
            lineHeight: 1.5,
          }}
        >
          {notification.Message}
        </Typography>

        <Typography variant="caption" sx={{ color: cfg.color, opacity: 0.7 }}>
          {notification.Timestamp
            ? new Date(notification.Timestamp).toLocaleString()
            : "—"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
