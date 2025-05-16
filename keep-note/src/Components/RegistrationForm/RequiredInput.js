import { TextField } from "@mui/material";

export function RequiredInput({ label, name, register, required, min, errors }) {
  const isError = !!errors[name];

  return (
    <TextField
      label={`${label}`}
      variant="outlined"
      fullWidth
      error={isError}
      helperText={isError ? errors[name]?.message : ""}
      {...register(name, {
        required: required ? `${label} is required` : false,
        min: min ? { value: min, message: `${label} must be at least ${min}` } : false,
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
