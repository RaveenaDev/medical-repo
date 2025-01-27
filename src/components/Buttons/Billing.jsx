import React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import ReceiptIcon from "@mui/icons-material/Receipt";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: "8px",
  padding: "8px 16px",
  color: "#878787",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  "&:focus": {
    outline: "none", 
  },
}));

const BillingButton = () => {
  const theme = useTheme(); 

  return (
    <StyledButton startIcon={<ReceiptIcon style={{ color: theme.palette.text.secondary }} />}>
      Billing
      <br />
    </StyledButton>
  );
};

export default BillingButton;
