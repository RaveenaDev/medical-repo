import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { EllipsisVertical } from "lucide-react";

const ActionMenu = ({ patient }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openInsuranceDialog, setOpenInsuranceDialog] = useState(false);
  const [insuranceDetails, setInsuranceDetails] = useState({
    insuranceId: "",
    employeeCode: "",
    policyNo: "",
    startDate: "",
    expiryDate: "",
    company: "",
  });

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddInsurance = () => {
    setOpenInsuranceDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenInsuranceDialog(false);
    setInsuranceDetails({
      insuranceId: "",
      employeeCode: "",
      policyNo: "",
      startDate: "",
      expiryDate: "",
      company: "",
    });
  };

  const handleSaveInsurance = () => {
    console.log("Saving insurance for:", patient);
    console.log("Insurance details:", insuranceDetails);

    // Call API here with insuranceDetails
    handleDialogClose();
  };

  return (
    <>
      {/* Action Menu Icon */}
      <IconButton onClick={handleClick} size="small" sx={{ color: "#25307F" }}>
        <EllipsisVertical size={20} />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleAddInsurance}>Add Insurance</MenuItem>
        <MenuItem onClick={() => console.log("View Details:", patient)}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => console.log("Discharge:", patient)}>
          Discharge
        </MenuItem>
      </Menu>

      {/* Insurance Modal */}
      <Dialog open={openInsuranceDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Add Insurance Details</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Insurance ID"
            fullWidth
            value={insuranceDetails.insuranceId}
            onChange={(e) =>
              setInsuranceDetails({
                ...insuranceDetails,
                insuranceId: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Employee Code"
            fullWidth
            value={insuranceDetails.employeeCode}
            onChange={(e) =>
              setInsuranceDetails({
                ...insuranceDetails,
                employeeCode: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Policy No."
            fullWidth
            value={insuranceDetails.policyNo}
            onChange={(e) =>
              setInsuranceDetails({
                ...insuranceDetails,
                policyNo: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={insuranceDetails.startDate}
            onChange={(e) =>
              setInsuranceDetails({
                ...insuranceDetails,
                startDate: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Expiry Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={insuranceDetails.expiryDate}
            onChange={(e) =>
              setInsuranceDetails({
                ...insuranceDetails,
                expiryDate: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Company"
            fullWidth
            value={insuranceDetails.company}
            onChange={(e) =>
              setInsuranceDetails({
                ...insuranceDetails,
                company: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveInsurance}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionMenu;
