import { Select, MenuItem, InputBase, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 1. Create filtered InputBase component
const FilteredInputBase = ({ notched, ...props }) => <InputBase {...props} />;

const CustomSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "hasLeftIcon",
})(({ theme, hasLeftIcon }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "18px",
    backgroundColor: "#F3F4F6",
    padding: hasLeftIcon ? "9px 16px 9px 35px" : "9px 16px",
    border: "1px solid transparent",
    "&:hover": {
      borderColor: theme.palette.grey[300],
    },
    "&:focus": {
      backgroundColor: "#fff",
      borderRadius: "18px",
      borderColor: "transparent",
      boxShadow: `0 0 0 2px ${theme.palette.grey[200]}`,
    },
  },
  "& .MuiSelect-icon": {
    color: theme.palette.grey[500],
    right: 12,
  },
}));

const PassengerSelect = ({
  label,
  placeholder = "Select",
  options = [],
  leftIcon = null,
  value = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-neutral-800 font-bold">{label}</label>
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-[10px] text-neutral-500 z-10">
            {leftIcon}
          </span>
        )}

        <CustomSelect
          hasLeftIcon={!!leftIcon}
          displayEmpty
          value={value}
          input={<FilteredInputBase className="w-full" />}
          IconComponent={ExpandMoreIcon}
          renderValue={(selected) => {
            if (!selected) {
              return <span className="text-neutral-500">{placeholder}</span>;
            }
            return options.find((opt) => opt.value === selected)?.label;
          }}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderRadius: "18px",
            },
          }}
          {...props}
        >
          <MenuItem disabled value="">
            <span className="text-neutral-500">{placeholder}</span>
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="text-neutral-700 hover:bg-gray-100"
            >
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
      </div>
    </div>
  );
};

export default PassengerSelect;
