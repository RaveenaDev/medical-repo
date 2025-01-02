import React from 'react'
import { Button, Container, Grid } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const data = [
  {
    phase: 'Post-Surgery Follow-up',
    date: 'June 27th, 2024',
    responsible: 'Dr. Mihnesh',
    progress: 'Healing progress',
    status: 'Ongoing',
  },
  {
    phase: 'Surgery',
    date: 'June 26th, 2024',
    responsible: 'Dr. Mihnesh',
    progress: 'Heart Surgery',
    status: 'Completed',
  },
  {
    phase: 'Lab Tests',
    date: 'June 25th, 2024',
    responsible: 'Dr. Arunita',
    progress: 'Blood test',
    status: 'Completed',
  },
  {
    phase: 'Initial Consultation',
    date: 'June 24th, 2024',
    responsible: 'Dr. Arunita',
    progress: '',
    status: 'Completed',
  },
];

const PatientDetails = () => {
  return (
    <div>
        
        <Container  
      maxWidth={false} 
      sx={{ height: '50vh', width: '90%', margin: '2rem auto', display: 'flex' , position:"relative"}}
    >
      <Grid container sx={{ height: '100%'}}>
        {/* Left Box */}
        <Grid 
          item 
          xs={12} sm={3} 
          sx={{ bgcolor: 'white',textAlign:"center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box>

          <Typography variant="h5" component="div" >
           Jasmine Kaur
      </Typography>

      <Typography variant="h6" component="div" >
           jasminekaur@gmail.com
      </Typography>

      <Box  sx={{display:"flex", gap:"1rem", marginTop:"1.5rem", justifyContent:"center"}}>
      <Typography variant="p" component="div" >
           8 <br /> Past visits
      </Typography>
      <Typography variant="p" component="div" >
           2 <br /> Upcoming visits
      </Typography>
      </Box>


      <Button sx={{marginTop:"2.5rem",left:"9%", position:"absolute"}}>Send Message</Button>

          </Box>
        </Grid>

        {/* Middle Box */}
        <Grid 
          item 
          xs={12} sm={6} 
          sx={{bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box>Middle Box</Box>
        </Grid>

        {/* Right Box */}
        <Grid 
          item 
          xs={12} sm={3} 
          sx={{ bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box>Right Box</Box>
        </Grid>
      </Grid>
    </Container>


    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" gutterBottom>
        Progress Tracker
      </Typography>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow >
              <TableCell>Phase</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Responsible</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    row.status === 'Ongoing' ? '#e8f5e9' : 'inherit',
                }}
              >
                <TableCell >{row.phase}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.responsible}</TableCell>
                <TableCell>{row.progress}</TableCell>
                <TableCell
                  sx={{
                    color:
                      row.status === 'Ongoing'
                        ? 'green'
                        : 'orange',
                    fontWeight: 'bold',
                  }}
                >
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>


    </div>
  )
}

export default PatientDetails




