import { TextField } from "@mui/material";

export function EmailInput({ register, errors }) {
  const isError = !!errors.email;

  return (
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      fullWidth
      error={isError}
      helperText={isError ? errors.email.message : ""}
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Invalid email format",
        },
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
