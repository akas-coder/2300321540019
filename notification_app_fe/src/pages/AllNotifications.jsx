import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getNotifications } from "../services/notificationService";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import PaginationBar from "../components/PaginationBar";

const PAGE_SIZE = 10;

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const data = await getNotifications();
    setNotifications(data);
    setLoading(false);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1);
  };

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.Type === filter);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        📋 All Notifications
      </Typography>

      <FilterBar
        filter={filter}
        onChange={handleFilterChange}
        total={filtered.length}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : paginated.length === 0 ? (
        <Alert severity="info">No notifications found.</Alert>
      ) : (
        <>
          {paginated.map((item) => (
            <NotificationCard
              key={item.ID}
              notification={item}
              onView={() => forceUpdate((n) => n + 1)}
            />
          ))}

          <PaginationBar
            page={page}
            totalPages={totalPages}
            onChange={setPage}
            pageSize={PAGE_SIZE}
            totalItems={filtered.length}
          />
        </>
      )}
    </Box>
  );
}

export default AllNotifications;
