import { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@mui/material/styles";

export default function SearchNote({ onSearchNote, onClearNote }) {
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        maxWidth: 180,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "lightblue",
          borderRadius: "7px",
          border: "1px solid lightseagreen",
          px: 1,
          height: 50,
        }}
      >
        <SearchIcon sx={{ color: "gray", mr: 1 }} />
        <InputBase
          placeholder="Search Notes"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            onSearchNote(event.target.value);
          }}
          sx={{
            flex: 1,
            fontSize: 18,
          }}
        />
      </Box>

      {searchText.length > 0 && (
        <IconButton
          onClick={() => {
            setSearchText("");
            onClearNote();
          }}
          sx={{
            position: "absolute",
            right: -3,
            top: "50%",
            transform: "translateY(-50%)",
            p: 0.5,
            color: "red",
            transition: "transform 0.15s linear, color 0.15s linear",
            "&:hover": {
              color: theme.palette.primary.main,
              transform: "translateY(-50%) scale(1.2)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}
