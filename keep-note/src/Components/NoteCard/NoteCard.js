import { Box, Typography, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

export default function NoteCard({ taskData }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const isCompleted = taskData.status.toLowerCase() === "completed";

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 2,
    mx: 4,
    my: 1,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 2,
    border: "2px solid lightblue",
    boxShadow: "2px 2px 2px lightblue",
    backgroundColor: isCompleted
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    color: "black",
    cursor: "pointer", // make it feel clickable
    transition: "transform 0.1s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  };

  const handleCardClick = () => {
    navigate(`/notedetail/${taskData.id}`);
  };

 

  return (
    <Box sx={cardStyle} data-testid="note-card" onClick={handleCardClick}>
      <Typography variant="h6" gutterBottom>
        {taskData.title}
      </Typography>
      <Typography variant="body1">{taskData.content}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 1.5,
        }}
        
      >
        <IconButton sx={{ color: "black" }}>
          <EditIcon />
        </IconButton>
        <IconButton sx={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{ color: "purple" }}>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
