import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

const PriceFilter = ({ onValueChange, value, setValue }) => {
  const handleChange = (event) => {
    setValue(value === event.target.value ? "" : event.target.value);
    onValueChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel
          value="lowest"
          control={<Radio color="success" size="small" />}
          label={
            <span className="text-neutral-900 font-normal text-sm">
              Lowest price
            </span>
          }
        />
        <FormControlLabel
          value="highest"
          control={<Radio color="success" size="small" />}
          label={
            <span className="text-neutral-900 font-normal text-sm">
              Highest price
            </span>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default PriceFilter;
