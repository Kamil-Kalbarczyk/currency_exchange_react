import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

export const Footer = () => {
  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Divider />
      <Typography variant="subtitle2" align="center" mt={"10px"}>
        Stopka
      </Typography>
    </Box>
  );
};
