import React from "react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RecordsDrawer = ({
  open,
  onClose,
  filters,
  handleFilterChange,
  handleSearchResults,
}) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      "& .MuiDrawer-paper": {
        height: "48vh",
        top: "20vh",
        borderRadius: "10px 0 0 10px",
      },
    }}
  >
    <Box sx={{ width: 220, p: 2, pl: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6" sx={{ color: "#0B0B0B" }}>
          Filter By
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "black" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <FormControl sx={{ mb: 4, mt: 2, width: "100%" }}>
        <FormLabel sx={{ mb: 1, color: "#000" }}>Category</FormLabel>
        <RadioGroup
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          {["patient", "company", "pharmacy", "researchCollaboration"].map(
            (val) => (
              <FormControlLabel
                key={val}
                value={val}
                control={
                  <Radio
                    sx={{
                      color: "#878787",
                      "&.Mui-checked": { color: "#25307F" },
                    }}
                  />
                }
                label={val.charAt(0).toUpperCase() + val.slice(1)}
                sx={{ color: "#878787" }}
              />
            )
          )}
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#25307F",
          borderRadius: "16px",
          px: 4,
          ml: "1.5rem",
        }}
        onClick={handleSearchResults}
      >
        Search Results
      </Button>
    </Box>
  </Drawer>
);

export default RecordsDrawer;
