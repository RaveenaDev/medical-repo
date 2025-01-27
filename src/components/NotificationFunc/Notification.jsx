import React, { useState } from "react";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PushPinIcon from "@mui/icons-material/PushPin";
import DescriptionIcon from "@mui/icons-material/Description";

const CircularButton = styled(Button)(({ theme }) => ({
  width: "56px", 
  height: "56px",
  borderRadius: "50%",
  minWidth: "unset",
  position:"absolute",
  top:"5%",
  right:"3%",
  padding: 0,
  backgroundColor: theme.palette.grey[200], 
  boxShadow: theme.shadows[3], 
  '&:hover': {
    backgroundColor: theme.palette.grey[300], 
  },
  '&:focus': {
    outline: "none", 
    boxShadow: "none", 
  },
}));

const NotificationButton = ({ onClick }) => {
  return (
    <CircularButton onClick={onClick}>
      <NotificationsIcon style={{ color: "#003366" }} />
    </CircularButton>
  );
};

const NotificationPopup = ({ onClose }) => {
  const notifications = [
    { id: 1, icon: <PushPinIcon />, text: "You have a follow up with Karan Choudhary on Friday, 27 Sept at 10:00 AM." },
    { id: 2, icon: <DescriptionIcon />, text: "You have a follow up with Karan Choudhary on Friday, 27 Sept at 10:00 AM." },
    { id: 3, icon: <DescriptionIcon />, text: "You have a follow up with Karan Choudhary on Friday, 27 Sept at 10:00 AM." },
    { id: 4, icon: <PushPinIcon />, text: "You have a follow up with Karan Choudhary on Friday, 27 Sept at 10:00 AM." },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "450px",
        height:"1117px",
        backgroundColor: "#F1F1F1",
        boxShadow: "-2px 0px 10px rgba(0,0,0,0.1)",
        zIndex: 1200,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px",  }}>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: "8px" }}>
          Notifications
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: "18px" }}>
        {notifications.map((notification) => (
          <Paper key={notification.id} sx={{ padding: "18px", marginBottom: "1px", display: "flex", alignItems: "center", gap:"1rem" }}>
            <Box sx={{ marginRight: "8px" }}>{notification.icon}</Box>
            <Typography>{notification.text}</Typography>
          </Paper>
        ))}
      </Box>
      <Typography
        sx={{ textAlign: "center", padding: "16px", color: "gray", fontWeight: "bold" }}
      >
        {notifications.length} New Notifications
      </Typography>
    </Box>
  );
};

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && <NotificationButton onClick={handleOpen} />}
      {isOpen && <NotificationPopup onClose={handleClose} />}
    </>
  );
};

export default Notifications;
