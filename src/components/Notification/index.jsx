import React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';

function NotificationIcon() {
  return (
    <IconButton
      sx={{
        backgroundColor: '#f5f5f5', // Background color
        borderRadius: '50%', // Circular shape
        padding: '10px', // Space around the icon
        '&:hover': {
          backgroundColor: '#e0e0e0', // Hover effect
        },
      }}
    >
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default NotificationIcon;
