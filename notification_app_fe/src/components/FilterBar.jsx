import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function FilterBar({ filter, onChange, total }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      <FilterListIcon color="action" />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={filter}
          label="Filter by Type"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="body2" color="text.secondary">
        {total} notification{total !== 1 ? "s" : ""}
      </Typography>
    </Box>
  );
}

export default FilterBar;
