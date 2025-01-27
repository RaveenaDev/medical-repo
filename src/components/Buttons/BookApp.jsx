import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#003366",
  color: "#fff",
  boxShadow: theme.shadows[1],
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize:"14px",
  "&:hover": {
    backgroundColor: "#002244",
  },

  "&:focus": {
    outline: "none", 
  },
}));

const BookAppointmentButton = () => {
  return (
    <StyledButton startIcon={<AddIcon />}>
      Book Appointment
    </StyledButton>
  );
};

export default BookAppointmentButton;
