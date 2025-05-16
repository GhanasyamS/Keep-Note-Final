import React from "react";
import { useForm } from "react-hook-form";
import { Container, Box, Paper, Typography, Button, TextField, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";

export function LoginForm({isLoggedIn}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  // const url = "http://localhost:3000/users";
const url = "http://192.168.18.43:3000/users";
  const validateUser = async (data) => 
    {
        try {
        const response = await axios.get(url, {
            params: {
            email: data.email,
            password: data.password,
            },
        });

        const users = response.data;

        const matchedUser = users.find(
            user => user.email === data.email && user.password === data.password
        );

        if (matchedUser) 
        {
            enqueueSnackbar(`Welcome back, ${matchedUser.firstName}!`, { variant: "success" });
            localStorage.setItem("userId", matchedUser.id);
            isLoggedIn();
        } else {
            enqueueSnackbar("Invalid email or password.", { variant: "error" });
        }
        } catch (error) {
        console.error("Login error:", error);
        enqueueSnackbar("Login failed. Please try again.", { variant: "error" });
        }
   };

  return (
    <Box
    sx={{height:"75vh", display:"flex",alignItems:"center",justifyItems:"center"}}
    >
    <Container maxWidth="sm" sx={{ mt: 6,mb:5 }}>
      <Typography variant="h4" fontWeight={700} align="center" color="primary" gutterBottom>
        Login
      </Typography>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 2, bgcolor: "rgba(245, 225, 179, 0.79)" }}>
        <Box component="form" onSubmit={handleSubmit(validateUser)} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Email"
            fullWidth
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Stack direction="row" justifyContent="center">
            <Button type="submit" variant="contained" color="primary" sx={{ width: 150 }}>
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
}
