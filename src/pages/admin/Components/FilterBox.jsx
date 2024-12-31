import React from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FilterBox = ({setShowFilter}) => {
  const handleClose = () => {
    setShowFilter(false);

    console.log("Filter box closed");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        zIndex: "10",
        bgcolor:"white",
        width:"250px",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
        mt: 4,
        position: "absolute", 
        top: "10%",
        right: "3%",
      }}
    >
      {/* X Mark Icon (Close button) */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "gray", 
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Filter Heading */}
      <Box mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Filter By
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Filter: Status */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel>
              <Typography fontWeight="bold">Status</Typography>
            </FormLabel>
            <RadioGroup defaultValue="all">
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="In-Active"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Filter: Type of Visits */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel>
              <Typography fontWeight="bold">Type of Visits</Typography>
            </FormLabel>
            <RadioGroup defaultValue="all">
              <FormControlLabel
                value="walk-in"
                control={<Radio />}
                label="Walk In"
              />
              <FormControlLabel
                value="referral"
                control={<Radio />}
                label="Referral"
              />
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterBox;
