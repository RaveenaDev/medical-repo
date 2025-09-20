import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 🔹 helper: format key names
const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // split camelCase
    .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
};

const BillingDialog = ({ open, onClose, details }) => {
  if (!details) return null;

  // 🔹 calculate rate as sum of room charges
  const totalRoomRate = details.roomDetails
    ? Object.values(details.roomDetails).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Service Extra Details</DialogTitle>
      <Divider />

      <DialogContent dividers>
        {/* Bed Info */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">Bed Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  <b>Bed Number:</b> {details.bedNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Bed Type:</b> {details.bedType}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Days Occupied:</b> {details.daysOccupied}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>Rate:</b> ₹{totalRoomRate}
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Features */}
        {details.features && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">Features</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {Object.entries(details.features).map(([key, value]) => (
                  <Grid item key={key}>
                    <Chip
                      label={formatKey(key)}
                      color={value ? "success" : "default"}
                      variant={value ? "filled" : "outlined"}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Room Details */}
        {details.roomDetails && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">Room Charges</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.entries(details.roomDetails).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography>
                      <b>{formatKey(key)}:</b> ₹{value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Totals */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" align="right">
          Total Charge: <b>₹{details.totalCharge}</b>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillingDialog;
