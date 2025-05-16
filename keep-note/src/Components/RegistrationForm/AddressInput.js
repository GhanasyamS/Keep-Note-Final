import { Box, Typography } from "@mui/material";
import { RequiredInput } from './RequiredInput';

export function AddressInput({ register, errors }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>

      <RequiredInput
        label="Street"
        name="address.street"
        register={register}
        errors={errors}
        required
      />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <RequiredInput
          label="City"
          name="address.city"
          register={register}
          errors={errors}
          required
        />
        <RequiredInput
          label="State"
          name="address.state"
          register={register}
          errors={errors}
          required
        />
      </Box>
    </Box>
  );
}
