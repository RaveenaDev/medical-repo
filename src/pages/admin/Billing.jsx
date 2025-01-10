import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FaTimes } from 'react-icons/fa';
import styles from './Billing.module.scss';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link} from "react-router-dom";



const Billing = () => {

  const handleClose = () => {
    // Logic to close the billing container, you can modify this based on your app's state
    console.log('Billing container closed');
  };

  return (
    <Box 
      sx={{
        padding: 2,
        position: "absolute",
        top: "10%",
        left: "30%",
        width: "900px",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "auto",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >

<div className={styles.billingContainer}>
      
      <div className={styles.billingHeader}>
        <span className={styles.paymentText}>Payment Details</span>
        
      </div>

        <div className={styles.buttonGroup}>
          <Button component={Paper} className={styles.refundButton} sx={{color:"#25307F",}}>Refund</Button>
          <Button component={Paper} className={styles.addPaymentButton } sx={{color:"#25307F"}}>Add Advance Payment</Button>
        </div>
        <Link to={"/PatientDetails"}>
        <FaTimes className={styles.closeIcon} onClick={handleClose} />
        </Link>
  </div>



      {/* Header Section */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              backgroundColor: "#F9FAFB",
              padding: 2,
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Total Bill Amount
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#111827" }}>
              ₹ 500
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              backgroundColor: "#F9FAFB",
              padding: 2,
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Paid
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#111827" }}>
              ₹ 500
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              backgroundColor: "#F9FAFB",
              padding: 2,
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Due
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#111827" }}>
              ₹ 0
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              backgroundColor: "#F9FAFB",
              padding: 2,
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Remaining Credits
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#111827" }}>
              0
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 2 , gap: "1rem"}}>
        <Button
          variant="outlined"
          sx={{
            color: "#25307F",
            borderColor: "#25307F",
            textTransform: "none",
            fontWeight: "500",
          }}
        >
          Referral
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#25307F",
            borderColor: "#25307F",
            textTransform: "none",
            fontWeight: "500",
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add New Bill
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ marginBottom: 2, boxShadow: "none" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
            <TableRow>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Invoice Number</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Patient Name</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>XXXXXXXXXXXX</TableCell>
              <TableCell>25th June 2024</TableCell>
              <TableCell>Jasimine Kaur</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: "#D1FAE5",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    color: "#059669",
                    display: "inline-block",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                  }}
                >
                  Paid
                </Box>
              </TableCell>
              <TableCell>
                <ArrowForwardIosIcon sx={{ color: "#9CA3AF", fontSize: "16px" }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Refund Details Section */}
      <Typography
        variant="h6"
        sx={{ marginBottom: 2,marginTop: 7, color: "#111827", fontWeight: "bold" }}
      >
        Refund Detail
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
            <TableRow>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Refund Amount</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Invoice Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ color: "#6B7280" }}>
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Billing;







