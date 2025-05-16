import { useEffect, useState } from "react";
import DeleteNote from "../DeleteNote/DeleteNote";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NoteDetail = ({onUpdateNote}) => 
  {
  const { noteid } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(()=>{
  const fetchNote = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/notes/${noteid}`);
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  
    fetchNote();
  }, [noteid]);

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      setConfirmDelete(true);
      
    }
  }

  const handleEditNote = () => {
    navigate(`/editnote/${noteid}`);
  };

  if (loading) return <CircularProgress />;
  if (!note) return <Typography color="error">Note not found</Typography>;

  return (
    
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "85vh", 
      
    }}
    >
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: 500,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "lightblue",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        fontFamily: "sans-serif",
        
      }}
    >         
      <IconButton
      sx={{ position: "absolute", top: 8, left: 8, color: "red",
        transition: "transform 0.15s linear, color 0.15s linear",
        "&:hover": {
          transform: "translateY(-10%) scale(1.2)",}}}
      onClick={() => {
        navigate('/notes')
      }}
    >
    <CloseIcon />
  </IconButton>
      <Typography variant="h5" textAlign="center">
        Note Details
      </Typography>

      <TextField label="Title" value={note.title} InputProps={{ readOnly: true }} fullWidth />
      <TextField
        label="Content"
        value={note.content}
        multiline
        rows={3}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField
        label="Reminder Date"
        type="date"
        value={note.reminderdate}
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField label="Category" value={note.category} InputProps={{ readOnly: true }} fullWidth />
      <Box>
        <FormLabel>Priority</FormLabel>
        <RadioGroup row value={note.priority}>
          <FormControlLabel value="low" control={<Radio />} label="Low" />
          <FormControlLabel value="medium" control={<Radio  />} label="Medium" />
          <FormControlLabel value="high" control={<Radio  />} label="High" />
        </RadioGroup>
      </Box>
      <TextField label="Status" value={note.status} InputProps={{ readOnly: true }} fullWidth />

      {/* Icon Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <IconButton onClick={handleEditNote} sx={{ color: "black", transition: "transform 0.15s linear, color 0.15s linear",
              "&:hover": {
                color: "lightseagreen",
                transform: "translateY(-10%) scale(1.2)",}}}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteClick} sx={{ color: "red", transition: "transform 0.15s linear, color 0.15s linear",
              "&:hover": {
                color: "lightseagreen",
                transform: "translateY(-10%) scale(1.2)",}}}>
          <DeleteIcon />
        </IconButton>
           {confirmDelete && (
            <DeleteNote
              noteid={noteid}
              onDeleteSuccess={() => {
                onUpdateNote();
                navigate("/notes");
              
              }}
            />
          )}
        
             
        <IconButton sx={{ color: "purple" }}>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Paper>
   </Box> 
  );
};

export default NoteDetail;
