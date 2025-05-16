import React from "react";
import { SnackbarProvider } from "notistack";
import { GlobalStyles } from "@mui/material";
import { LoginForm } from "./LoginForm";

export default function LoginPage({isLoggedIn}) {
  return (
    <>
      <GlobalStyles styles={{
        "input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px rgba(245, 225, 179, 0.79) inset !important",
          WebkitTextFillColor: "#000 !important",
          caretColor: "#000 !important",
          borderRadius: "inherit",
        }
      }} />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <LoginForm isLoggedIn={isLoggedIn} />
      </SnackbarProvider>
    </>
  );
}
