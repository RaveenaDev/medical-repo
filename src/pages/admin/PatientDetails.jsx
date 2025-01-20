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
  List,
  ListItem,
  Avatar
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  useNavigate , Link} from "react-router-dom";
import Topbar from './Components/Topbar'
import ProfileImg from '../../assets/image.png'




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
  const navigate = useNavigate();

  return (
    <div>

      <Topbar/>
        
        <Container  
      maxWidth={false} 
      sx={{ height: '50vh', width: '100%', margin: '2rem auto', display: 'flex' , position:"relative", }}
    >
      <Grid container sx={{ height: '100%', width:"100%"}}>
        {/* Left Box */}
        <Grid 
          item 
          xs={12} sm={3} 
          sx={{ bgcolor: 'white',textAlign:"center", display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight:"5px solid #F1F1F1" }}
        >
          <Box>

         <Link to={"/"}>
         <Box sx={{ position: 'absolute', top: '1.5rem', left: '3rem' }}>
            <ArrowBackIcon />
          </Box>
         </Link>

         <Avatar
        alt="Jasmine Kaur"
        src= {ProfileImg} 
        sx={{
          width: 100,
          height: 100,
          position:"absolute",
          top:"10%",
          left:"10%",
          marginBottom: '1rem', 
        }}
      />

          <Typography variant="h5" component="div" sx={{marginTop:"3rem"}} >
           Jasmine Kaur
      </Typography>

      <Typography variant="h6" component="div" >
           jasminekaur@gmail.com
      </Typography>

      <Box  sx={{display:"flex", gap:"1rem", marginTop:"1rem", justifyContent:"center"}}>
      <Typography variant="p" component="div" >
           8 <br /> Past visits
      </Typography>
      <Typography variant="p" component="div" >
           2 <br /> Upcoming visits
      </Typography>
      </Box>


      <Button sx={{marginTop:"1.5rem",left:"9%", position:"absolute", color: "#25307F", border:"2px solid #25307F", outline:"none"}}>Send Message</Button>

          </Box>
        </Grid>

        {/* Middle Box */}
        <Grid 
          item 
          xs={12} sm={6} 
          sx={{bgcolor: 'white', display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'center',borderRight:"5px solid #F1F1F1" ,borderLeft:"5px solid #F1F1F1"   }}
        >
          <Box sx={{display:"flex", textAlign:"left", justifyContent: 'space-between' ,width:"90%", margin:"1rem", borderBottom:"1px solid grey"}}>
          <Typography sx={{fontSize:"16px"}} gutterBottom>
              Gender <br /> Female
      </Typography>
      <Typography sx={{fontSize:"16px"}} gutterBottom>
      Birthday <br /> Feb 24th, 1997
      </Typography>
      <Typography sx={{fontSize:"16px"}} gutterBottom>
      Phone Number <br /> +91 79327728
      </Typography>

          </Box>


          <Box sx={{display:"flex", textAlign:"left", justifyContent: 'space-between' ,width:"90%", margin:"1rem",borderBottom:"1px solid grey" }}>
          <Typography sx={{fontSize:"16px"}} gutterBottom>
          Adress <br /> XXXXXXX
      </Typography>
      <Typography sx={{fontSize:"16px"}} gutterBottom>
      Case Id <br /> XXXXXXX
      </Typography>
      <Typography sx={{fontSize:"16px"}} gutterBottom>
      Assessed by <br /> Dr. XXXXXXX
      </Typography>

          </Box>



          <Box sx={{display:"flex", textAlign:"left", justifyContent: 'space-between' ,width:"90%", margin:"1rem", }}>
          <Typography sx={{fontSize:"16px"}} gutterBottom>
          Member status <br /> Active Member
      </Typography>
      <Typography sx={{fontSize:"16px"}} gutterBottom>
      Registered Date <br /> June 24th, 2024
      </Typography>
      {/* <Typography sx={{fontSize:"16px"}} gutterBottom>
      Phone Number <br /> +91 79327728
      </Typography> */}

          </Box>


        </Grid>

        {/* Right Box */}
        <Grid 
          item 
          xs={12} sm={3} 
          sx={{ bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',borderLeft:"5px solid #F1F1F1" , paddingLeft:"1.2rem" }}
        >
          <Box>

          <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Medical History
          </Typography>
          <List disablePadding sx={{ listStyleType: 'disc', pl: 2 }}>
            <ListItem sx={{ py: 0, pl: 0, fontSize: '0.875rem', display: 'list-item' }}>
              Type 2 diabetes diagnosed 5 years ago
            </ListItem>
            <ListItem sx={{ py: 0, pl: 0, fontSize: '0.875rem', display: 'list-item' }}>
              Hypertension diagnosed 3 years ago
            </ListItem>
            <ListItem sx={{ py: 0, pl: 0, fontSize: '0.875rem', display: 'list-item' }}>
              Family history of heart disease (father)
            </ListItem>
          </List>
        </Grid>

        <Grid item>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Current Medications
          </Typography>
          <List disablePadding sx={{ listStyleType: 'disc', pl: 2 }}>
            <ListItem sx={{ py: 0, pl: 0, fontSize: '0.875rem', display: 'list-item' }}>
              Metformin (for diabetes)
            </ListItem>
            <ListItem sx={{ py: 0, pl: 0, fontSize: '0.875rem', display: 'list-item' }}>
              Lisinopril (for hypertension)
            </ListItem>
            <ListItem sx={{ py: 0, pl: 0, fontSize: '0.875rem', display: 'list-item' }}>
              Aspirin (for heart health)
            </ListItem>
          </List>
        </Grid>

        <Grid item>
          <Link to={"/admin/reception/patients/History"}>
          <Box textAlign="center">
          <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 6, textTransform: 'none', width:"150px",marginTop:"2rem" }}
            >
              More
            </Button>
          </Box>
          </Link>
        </Grid>
      </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>


    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" gutterBottom>
        Progress Tracker
      </Typography>
      <TableContainer component={Paper} >
      <Link to={"/Tracking"}> 

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
            </Link>
      </TableContainer>
    </Box>


    </div>
  )
}

export default PatientDetails




