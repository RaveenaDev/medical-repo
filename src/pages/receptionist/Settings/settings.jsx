import React from 'react'
import { Box, Typography } from "@mui/material";
import PrivacyPolicy from './PrivacyPolicy';
import Faq from './Faq'
import styles from './Settings.module.scss'


const Settings = () => {
  return (
    <div className= {styles.settings}>
      <div className=  {styles.side_panel}>

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
    <div className={styles.component_panel}>
      <PrivacyPolicy/>


    </div>
      
    </div>
  )
}

export default Settings