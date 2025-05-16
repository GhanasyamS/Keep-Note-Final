import { useEffect, useState } from "react";
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
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton
  
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditNote = ({ onUpdateNote }) => {
  const { noteid } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = async () => {
    if (onUpdateNote) {
      await onUpdateNote(note);
      navigate(`/notedetail/${noteid}`);
    }
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
        bgcolor: "lavender",
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
          navigate(`/notedetail/${noteid}`)
        }}
      >
      <CloseIcon />
      </IconButton>
      
      <Typography variant="h5" textAlign="center">
        Edit Note
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={note.title}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Content"
        name="content"
        value={note.content}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
      />

      <TextField
        label="Reminder Date"
        type="date"
        name="reminderdate"
        value={note.reminderdate || ""}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />

      <TextField
        label="Category"
        name="category"
        value={note.category}
        onChange={handleChange}
        fullWidth
      />

      <Box>
        <FormLabel>Priority</FormLabel>
        <RadioGroup
          row
          name="priority"
          value={note.priority || ""}
          onChange={handleChange}
        >
          <FormControlLabel value="low" control={<Radio />} label="Low" />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="high" control={<Radio />} label="High" />
        </RadioGroup>
      </Box>

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={note.status || ""}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="yet-to-start">Yet to Start</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Paper>
  </Box>
  );
};

export default EditNote;
