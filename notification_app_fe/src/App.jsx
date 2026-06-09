import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ApiIcon from "@mui/icons-material/Api";

import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";
import ApiTester from "./pages/ApiTester";

// ── Custom MUI Theme ─────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:   { main: "#a78bfa" },   // soft violet
    secondary: { main: "#34d399" },   // emerald green
    warning:   { main: "#fbbf24" },
    success:   { main: "#34d399" },
    error:     { main: "#f87171" },
    background: {
      default: "transparent",
      paper:   "rgba(255,255,255,0.06)",
    },
    text: {
      primary:   "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(12px)",
          backgroundImage: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.10)",
          "&:before": { display: "none" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { background: "transparent" },
      },
    },
  },
});

// ── Active nav-link style ────────────────────────────────────────────────────
const navLinkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#a78bfa" : "rgba(255,255,255,0.65)",
  fontWeight: isActive ? 700 : 400,
  borderBottom: isActive ? "2px solid #a78bfa" : "2px solid transparent",
  paddingBottom: "2px",
  transition: "all 0.2s",
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── Full-page gradient background ── */}
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1040 35%, #0d2137 65%, #0a3d2e 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <BrowserRouter>
          {/* ── AppBar ── */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              background: "rgba(15, 12, 41, 0.75)",
              backdropFilter: "blur(18px)",
              borderBottom: "1px solid rgba(167,139,250,0.20)",
            }}
          >
            <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
              <NotificationsIcon sx={{ color: "#a78bfa" }} />
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  flexGrow: 1,
                  background: "linear-gradient(90deg, #a78bfa, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                Campus Notification Platform
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <NavLink to="/" style={navLinkStyle} end>
                  <Button startIcon={<NotificationsIcon />} sx={{ color: "inherit", textTransform: "none" }}>
                    All
                  </Button>
                </NavLink>
                <NavLink to="/priority" style={navLinkStyle}>
                  <Button startIcon={<EmojiEventsIcon />} sx={{ color: "inherit", textTransform: "none" }}>
                    Priority
                  </Button>
                </NavLink>
                <NavLink to="/api-tester" style={navLinkStyle}>
                  <Button startIcon={<ApiIcon />} sx={{ color: "inherit", textTransform: "none" }}>
                    API Tester
                  </Button>
                </NavLink>
              </Box>
            </Toolbar>
          </AppBar>

          {/* ── Page content ── */}
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Routes>
              <Route path="/"           element={<AllNotifications />} />
              <Route path="/priority"   element={<PriorityNotifications />} />
              <Route path="/api-tester" element={<ApiTester />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}
