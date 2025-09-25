import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { EllipsisVertical } from "lucide-react";
import EditPatient from "../modals/AddPatient/EditPatient";

const ActionMenu = ({ patient }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showForm, setShowForm] = useState(false);
  const handleEditClick = () => {
    setShowForm(true);
    handleClose();
  };
  const handleCloseForm = () => setShowForm(false);

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
        <MenuItem onClick={() => handleEditClick(patient)}>Edit Form</MenuItem>
      </Menu>

      {/* Conditionally Render Form */}
      {showForm && (
        <EditPatient onClose={handleCloseForm} patientDetails={patient} />
      )}
    </>
  );
};

export default ActionMenu;
