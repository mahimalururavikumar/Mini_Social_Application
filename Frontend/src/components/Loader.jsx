import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({ minHeight = "60vh" }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight={minHeight}>
      <CircularProgress sx={{ color: "var(--accent)" }} />
    </Box>
  );
}
