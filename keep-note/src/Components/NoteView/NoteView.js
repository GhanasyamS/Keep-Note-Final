import { Box, Typography,TextField } from "@mui/material";
import NoteList from "../NoteList/NoteList";
import { useNavigate } from "react-router-dom";



export default function NoteView({ taskList, onSubmitNote }) {
  const navigate = useNavigate();
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 3,
      }}
    >
      

      <Typography
        variant="h5"
        component="h2"
        align="center"
        sx={{ color:"white", fontWeight: 500, fontStyle: "italic", }}
      >
        Checklist Chronicles: Conquering Tasks One Tick at a Time
      </Typography>

      <TextField
                variant="outlined"
                placeholder="Add a Note..."
                onClick={() => navigate('/addnote')}
                sx={{ backgroundColor: "grey", borderRadius: "7px" }}
              />
      <NoteList taskList={taskList} />
    </Box>
  );
}
