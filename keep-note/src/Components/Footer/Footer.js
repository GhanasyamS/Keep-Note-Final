import { Box, Typography } from "@mui/material";
import Icon from "./Icon";

export default function Footer() {
  return (
    <Box
      component="footer"
      mt={4}
      mb={3}
      mx={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="body1" color="white">
        &copy; 2024 Keep Note. All rights reserved.
      </Typography>

      <Icon />
    </Box>
  );
}
