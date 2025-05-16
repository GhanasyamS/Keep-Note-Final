import { SnackbarProvider } from "notistack";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { RequiredInput } from "./RequiredInput";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput.js";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { PhoneNumberInput } from "../RegistrationForm/PhoneNumberInput.js";
import { ZipCodeInput } from "./ZipCodeInput";
import { GenderInput } from "./GenderInput.js";
import { AddressInput } from "./AddressInput.js";
import React, { useState } from "react";
import { GlobalStyles } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";


export function RegistrationForm() {
  const [formKey, setFormKey] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ 
    mode: "onBlur",
    defaultValues: {
    gender: "",}
});

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/users", data);
      enqueueSnackbar(`${data.firstName} registered successfully!`, { variant: "success" });
      reset();
      setFormKey(prev => prev + 1);
      setTimeout(() => {
        navigate('/');
        
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Failed to submit form. Please try again.", { variant: "error" });
     
    }
  };

  return (
    
    <Container maxWidth="sm" sx={{ mt:2,mb:5 }} >
      <Typography variant="h4" fontWeight={700} align="center" color="primary" gutterBottom>
          Registration Form
        </Typography>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: "rgba(245, 225, 179, 0.79)",
          boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.81)",
        }}
      >
        

        <Box
           key={formKey}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Stack direction="row" spacing={2}>
            <RequiredInput
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
              required
            />
            <RequiredInput
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
              required
            />
          </Stack>

          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <ConfirmPasswordInput register={register} watch={watch} errors={errors} />
          <GenderInput register={register} errors={errors} watch={watch} />

          <Stack direction="row" spacing={2}>
          <Box sx={{ width: "30%" }}>
            <RequiredInput
              label="Age"
              name="age"
              register={register}
              errors={errors}
              required
              min={18}
            />
          </Box>
            <PhoneNumberInput register={register} errors={errors} />
          </Stack>

          <AddressInput register={register} errors={errors} clearErrors={clearErrors} />
          <ZipCodeInput register={register} errors={errors} />

          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                reset();
                reset({ gender: "" });
                clearErrors();
                setFormKey(prev => prev + 1);
              }}
              sx={{ width: 150 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: 150 }}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default function RegistrationPage() 
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
      <RegistrationForm />
    </SnackbarProvider>
  </>
  );
}