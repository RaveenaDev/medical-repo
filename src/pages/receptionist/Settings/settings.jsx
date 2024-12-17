import React from 'react'
import { Box, Typography } from "@mui/material";


const Settings = () => {
  return (
    <div className='settings'>
      <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Settings
      </Typography>
      
      
      <Typography variant="body1" gutterBottom>
        FAQ's
      </Typography>
      <Typography variant="body1" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1">
        Logout
      </Typography>
    </Box>
      
    </div>
  )
}

export default Settings