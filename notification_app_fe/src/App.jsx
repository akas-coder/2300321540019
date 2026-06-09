import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";

const navLinkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
  fontWeight: isActive ? 700 : 400,
  borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
  paddingBottom: "2px",
  transition: "all 0.2s",
});

function App() {
  return (
    <BrowserRouter>
      {/* Top Nav */}
      <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #1565c0, #0288d1)" }}>
        <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
          <NotificationsIcon />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            Campus Notification Platform
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <NavLink to="/" style={navLinkStyle} end>
              <Button
                startIcon={<NotificationsIcon />}
                sx={{ color: "inherit", textTransform: "none" }}
              >
                All
              </Button>
            </NavLink>

            <NavLink to="/priority" style={navLinkStyle}>
              <Button
                startIcon={<EmojiEventsIcon />}
                sx={{ color: "inherit", textTransform: "none" }}
              >
                Priority
              </Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityNotifications />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
