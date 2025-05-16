import { TextField } from "@mui/material";

export function PhoneNumberInput({ register, errors }) {
  return (
    <TextField
      fullWidth
      type="tel"
      label="Phone Number"
      variant="outlined"
      margin="normal"
      {...register("phone", {
        required: "Phone number is required",
        pattern: {
          value: /^[789]\d{9}$/,
          message: "Must be a 10-digit number starting with 7, 8, or 9",
        },
      })}
      error={!!errors.phone}
      helperText={errors.phone?.message}
    />
  );
}
