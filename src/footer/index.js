import Link from "@mui/material/Link";
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
  const year = new Date().getFullYear();

  return (
    <Box sx={{ width: "100%", m: "20px auto 10px" }}>
      <Divider />
      <AuthorBox>
        <Typography variant="subtitle2" align="center" mt={"10px"}>
          Made with
        </Typography>
        <FavoriteBorderIcon color="error" sx={{ m: "0 2px" }} />
        <Typography variant="subtitle2" align="center" mt={"10px"}>
          by{" "}
          <Link href="https://github.com/Kamil-Kalbarczyk" target="_blank">
            Kamil Kalbarczyk
          </Link>{" "}
          {year} &#169;
        </Typography>
      </AuthorBox>
    </Box>
  );
};
