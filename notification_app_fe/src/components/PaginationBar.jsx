import { Box, Pagination, Typography } from "@mui/material";

function PaginationBar({ page, totalPages, onChange, pageSize, totalItems }) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        mt: 3,
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {start}–{end} of {totalItems}
      </Typography>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, val) => onChange(val)}
        color="primary"
        shape="rounded"
        size="medium"
      />
    </Box>
  );
}

export default PaginationBar;
