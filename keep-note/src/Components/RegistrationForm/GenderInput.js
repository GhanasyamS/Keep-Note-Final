import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export function GenderInput({ register, errors,watch }) {
  return (
    <FormControl component="fieldset" error={!!errors.gender}>
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row value={watch("gender")||""} >
        <FormControlLabel 
          value="male"
          control={<Radio sx={{color:"blue"}} {...register("gender", { required: "Gender is required" })} />}
          label="Male"
        />
        <FormControlLabel
          value="female"
          control={<Radio sx={{color:"red"}} {...register("gender", { required: "Gender is required" })} />}
          label="Female"
        />
        <FormControlLabel
          value="non-binary"
          control={<Radio sx={{color:"green"}} {...register("gender", { required: "Gender is required" })} />}
          label="Non-Binary"
        />
      </RadioGroup>
      {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
    </FormControl>
  );
}
