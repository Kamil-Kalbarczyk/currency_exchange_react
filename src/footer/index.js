import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";

const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = () => {
  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Divider />
      <AuthorBox>
        <Typography variant="subtitle2" align="center" mt={"10px"}>
          Made with
        </Typography>
        <FavoriteBorderIcon color="error" sx={{ m: "0 2px" }} />
        <Typography variant="subtitle2" align="center" mt={"10px"}>
          by Kamil Kalbarczyk
        </Typography>
      </AuthorBox>
    </Box>
  );
};
