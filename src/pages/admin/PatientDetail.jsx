import React from 'react'
import { Container, Grid, Box } from '@mui/material';


const PatientDetail = () => {
  return (
    <div>
        
    <Container 
  maxWidth={false} 
  sx={{ height: '50vh', width: '80%', margin: '0 auto', display: 'flex' }}
>
  <Grid container sx={{ height: '100%' }}>
    {/* Left Box */}
    <Grid 
      item 
      xs={12} sm={3} 
      sx={{ bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box>Left Box</Box>
    </Grid>

    {/* Middle Box */}
    <Grid 
      item 
      xs={12} sm={6} 
      sx={{ bgcolor: 'secondary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box>Middle Box</Box>
    </Grid>

    {/* Right Box */}
    <Grid 
      item 
      xs={12} sm={3} 
      sx={{ bgcolor: 'primary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box>Right Box</Box>
    </Grid>
  </Grid>
</Container>


</div>

  )
}

export default PatientDetail;