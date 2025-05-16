import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";

export default function AccountDetails() {
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userid}`);
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUser();
  }, [userid]);

  if (!user) return <Typography align="center">Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 5, position: 'relative' }}>
      <IconButton
        onClick={() => navigate(`/notes`)}
        sx={{
          position: 'absolute',
          top: 16,
          left: 40,
          backgroundColor: 'lightseagreen',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'red'
          }
        }}
      >
        <CloseIcon />
      </IconButton>

      <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom align="center">
          Account Details
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <Typography><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Age:</strong> {user.age}</Typography>
          <Typography><strong>Gender:</strong> {user.gender}</Typography>
          <Typography><strong>Phone:</strong> {user.phone}</Typography>
          <Typography><strong>Address</strong></Typography>
          <Typography><strong>Street:</strong> {user.address.street}</Typography>
          <Typography><strong>City:</strong> {user.address.city}</Typography>
          <Typography><strong>State:</strong> {user.address.state}</Typography>
          <Typography><strong>Zip Code:</strong> {user.address.zipCode}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
