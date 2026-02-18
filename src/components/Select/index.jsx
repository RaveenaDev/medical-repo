import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme, useMediaQuery } from "@mui/material";

export default function BasicSelect(props) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%", // Full width on mobile
          sm: 250, // Fixed width on tablet+
        },
      }}
    >
      <FormControl
        fullWidth
        size={isMobile ? "small" : props?.size || "medium"}
      >
        <Select
          value={selectedValue || "All Branches"}
          onChange={handleChange}
          sx={{
            color: props?.color || "black",
            backgroundColor: "transparent",
            fontSize: {
              xs: "14px",
              sm: "16px",
            },
            "& .MuiSelect-icon": {
              color: props?.color || "black",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: isMobile ? 250 : 300,
              },
            },
          }}
        >
          <MenuItem value="All Branches">All Branches</MenuItem>

          {props?.list?.map((item, index) => (
            <MenuItem
              value={item.departmentId}
              key={index}
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                },
              }}
            >
              {item.departmentName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
