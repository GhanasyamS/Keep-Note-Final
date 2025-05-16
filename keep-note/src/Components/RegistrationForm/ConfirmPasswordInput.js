import { TextField } from "@mui/material";

export function ConfirmPasswordInput({ register, watch, errors }) {
  const isError = !!errors.confirmPassword;

  return (
    <TextField
      label="Confirm Password"
      type="password"
      variant="outlined"
      fullWidth
      error={isError}
      helperText={isError ? errors.confirmPassword.message : ""}
      {...register("confirmPassword", {
        required: "Confirm Password is required",
        validate: (value) =>
          value === watch("password") || "Passwords must match",
      })}
      sx={{
        input: {
          color: "black",
          fontSize: 16,
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: isError ? "red" : "blue",
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: isError ? "red" : "lightgreen",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: isError ? "red" : "lightgreen",
        },
      }}
    />
  );
}
