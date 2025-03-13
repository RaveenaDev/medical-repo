import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import arrowBack from "../../assets/arrow_back.svg"; // Import the SVG as a React component
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PushPinIcon from "@mui/icons-material/PushPin";
import DescriptionIcon from "@mui/icons-material/Description";
import Badge from "@mui/material/Badge";

const CircularButton = styled(Button)(({ theme }) => ({
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  minWidth: "unset",
  padding: "10px",
  backgroundColor: 'white',
  // boxShadow: theme.shadows[3],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
}));

const NotificationButton = ({ onClick, badgeContent }) => {
  return (
    <CircularButton onClick={onClick}>
      <Badge badgeContent={badgeContent} color="error">
        <NotificationsIcon style={{ color: "#003366" }} />
      </Badge>
    </CircularButton>
  );
};

const NotificationPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const notifications = [
    {
      id: 1,
      icon: <PushPinIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
    {
      id: 2,
      icon: <DescriptionIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
    {
      id: 3,
      icon: <DescriptionIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
    {
      id: 4,
      icon: <PushPinIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
  ];

  return (
    <Box
      ref={popupRef}
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "450px",
        height: "100vh",
        backgroundColor: "#F1F1F1",
        boxShadow: "-2px 0px 10px rgba(0,0,0,0.1)",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
        <IconButton onClick={onClose}>
          <img src={arrowBack} alt="Back" />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: "8px", color: "#000" }}>
          Notifications
        </Typography>
      </Box>
      <Divider />
      {/* Notification List - Takes up remaining space */}
      <Box sx={{ flex: 1, overflowY: "auto", padding: "18px" }}>
        {notifications.map((notification) => (
          <Paper
            key={notification.id}
            sx={{
              padding: "18px",
              marginBottom: "1px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box sx={{ marginRight: "8px" }}>{notification.icon}</Box>
            <Typography>{notification.text}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Footer - Sticks to the bottom */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          padding: "20px",
          color: "gray",
          fontWeight: "bold",
        }}
      >
        {notifications.length} New Notifications
      </Typography>
    </Box>
  );
};

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    {
      id: 1,
      icon: <PushPinIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
    {
      id: 2,
      icon: <DescriptionIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
    {
      id: 3,
      icon: <DescriptionIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
    {
      id: 4,
      icon: <PushPinIcon />,
      text: "You have a follow-up with Karan Choudhary on Friday, 27 Sept at 10:00 AM.",
    },
  ];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <NotificationButton
          onClick={handleOpen}
          badgeContent={notifications.length}
        />
      )}
      {isOpen && <NotificationPopup onClose={handleClose} />}
    </>
  );
};

export default Notifications;
