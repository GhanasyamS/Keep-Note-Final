import { TextField } from "@mui/material";

export function ZipCodeInput({ register, errors }) {
  return (
    <TextField
      fullWidth
      type="text"
      label="Zip Code"
      variant="outlined"
      margin="normal"
      {...register("address.zipCode", {
        required: "Zip Code is required",
        pattern: {
          value: /^\d{6}$/,
          message: "Zip Code must be 6 digits",
        },
      })}
      error={!!errors.address?.zipCode}
      helperText={errors.address?.zipCode?.message}
    />
  );
}
