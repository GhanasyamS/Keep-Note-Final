import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";



 function AddNoteForm({ onSubmitNote }) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const navigate=useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    reminderdate: "",
    category: "",
    priority: "low",
    status: "yet-to-start",
  });

  const [errors, setErrors] = useState({});
  const url = "http://localhost:3000/notes";

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim())
      newErrors.content = "Content is required and should have at least 5 characters";
    else if (formData.content.length < 5)
      newErrors.content = "Content should have at least 5 characters";
    if (!formData.reminderdate)
      newErrors.reminderdate = "Reminder Date is required";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.reminderdate);
    if (selectedDate < today)
      newErrors.reminderdate = "Reminder Date cannot be in the past";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "title" && !value.trim()) error = "Title is required";
    if (name === "content") {
      if (!value.trim()) {
        error = "Content is required and should have at least 5 characters";
      } else if (value.trim().length < 5) {
        error = "Content should have at least 5 characters";
      }
    }

    if (name === "reminderdate") {
      if (!value) {
        error = "Reminder Date is required";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        if (selectedDate < today)
          error = "Reminder Date cannot be in the past";
      }
    }
    if(name === "category")
    {
      if(!value.trim())
      {
        error = "Category is required"
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(url, formData);
      enqueueSnackbar(`${formData.title} note added successfully!`, { variant: "success" });
      setFormData({
        title: "",
        content: "",
        reminderdate: "",
        category: "",
        priority: "low",
        status: "yet-to-start",
      });
      
      onSubmitNote();
    } catch (error) {
      console.error("Error adding note", error);
      enqueueSnackbar("Failed to Add Note. Please try again.", { variant: "error" });
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh", 
      
    }}
  >
      
      {(
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            width: 500,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "lightpink",
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
                color: theme.palette.primary.main,
                transform: "translateY(-10%) scale(1.2)",}}}
            onClick={() => {
              navigate('/notes')
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" textAlign="center">
            Add Note
          </Typography>

          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />

          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.content}
            helperText={errors.content}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Reminder Date"
            type="date"
            name="reminderdate"
            value={formData.reminderdate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.reminderdate}
            helperText={errors.reminderdate}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.category}
            helperText={errors.category}
            fullWidth
          />

          <Box>
            <FormLabel>Priority</FormLabel>
            <RadioGroup
              row
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <FormControlLabel
                value="low"
                control={<Radio />}
                label="Low"
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="high"
                control={<Radio />}
                label="High"
              />
            </RadioGroup>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            disabled={!formData.title || !formData.content || !formData.category|| !Object.keys(errors).length}
          >
            Add Note
          </Button>
        </Paper>
      )}
    </Box>
  );
}
export default function AddNoteSnackBar({onSubmitNote}) 
{
  return (
    <>
    <GlobalStyles
      styles={{
        "input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px rgba(245, 225, 179, 0.79) inset !important",
          WebkitTextFillColor: "#000 !important",
          caretColor: "#000 !important",
          borderRadius: "inherit",
          transition: "background-color 5000s ease-in-out 0s",
        }
      }}
    />
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
    >
       <AddNoteForm onSubmitNote={onSubmitNote}/>
    </SnackbarProvider>
  </>
  );
}