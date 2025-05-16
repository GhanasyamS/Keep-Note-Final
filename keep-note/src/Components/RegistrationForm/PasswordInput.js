import { TextField } from "@mui/material";

export function PasswordInput({ register, errors }) {
  return (
    <TextField
      fullWidth
      type="password"
      label="Password"
      variant="outlined"
      margin="normal"
      {...register("password", {
        required: "Password is required",
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol",
        },
      })}
      error={!!errors.password}
      helperText={errors.password?.message}
    />
  );
}
