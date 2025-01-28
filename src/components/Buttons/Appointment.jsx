import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: "5px",
  color: theme.palette.text.primary,
  padding: "8px 16px",
  // color: "#878787",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  "&:focus": {
    outline: "none", 
  },
}));

const AppointmentRequestsButton = () => {
  return (
    <StyledButton startIcon={<AccountCircleIcon style={{ color: "#25307F" }} />}>
      Appointment Requests
    </StyledButton>
  );
};

export default AppointmentRequestsButton;
