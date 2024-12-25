import React, { useState } from 'react'
import { Box, Typography } from "@mui/material";
import PrivacyPolicy from './PrivacyPolicy';
import Faq from './Faq'
import styles from './Settings.module.scss'
import Logout from './Logout'
import Help from './Help';


const Settings = () => {

  const [isLogout , setIsLogout] = useState(false);



  const handlelogout = () => {
    setIsLogout((prev) => (!prev))
  }


  return (
    <div>
       {/*className= {styles.settings}*/}
      {/* <div className=  {styles.side_panel}>

      <Box sx={{ padding: 3}}>
      <Typography variant="h6" gutterBottom>
        Settings
      </Typography>
      
      
      <Typography variant="body1" gutterBottom sx={{cursor:"pointer"}}>
        FAQ's
      </Typography>
      <Typography variant="body1" gutterBottom sx={{cursor:"pointer"}}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" gutterBottom sx={{cursor:"pointer"}}>
        Help & Support 
      </Typography>
      <Typography variant="body1" onClick={handlelogout} sx={{cursor:"pointer"}}>
        Logout
      </Typography>
    </Box>
    </div> */}
    <div className={styles.component_panel}>
      <Faq/>



    </div>
     {isLogout && <Logout isLogout={isLogout} setIsLogout={setIsLogout}/>}
      
    </div>
  )
}

export default Settings