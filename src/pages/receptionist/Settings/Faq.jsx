import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Container } from "@mui/material";


const Faq =( ) => {
  return (
    <div>
<Container maxWidth="md"  sx={{  color: "#838383" , padding: 0 , marginTop:"3rem"}}>
  <Typography variant="h6" sx={{ color: '#000', fontWeight: 600,fontSize: '17px',marginBottom:'1rem' }} gutterBottom>
  Frequently Asked Questions
          </Typography>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
              color: '#25307F',
              fontWeight: 600,
              '&:focus': {
                  outline: 'none' // Removes focus outline
              },
              '&.Mui-focusVisible': {
                  backgroundColor: 'transparent' // Optional: prevents highlight when focused via keyboard
              }
          }}
        >
          How do I schedule a new appointment?
        </AccordionSummary>
        <AccordionDetails sx={{color:'#747474'}}>
        To schedule a new appointment, click on the ‘New Appointment’ button, select the patient, type of consultation, doctor, and confirm the time.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{ color: '#25307F', fontWeight: 600,'&:focus': {
                  outline: 'none' // Removes focus outline
              },
              '&.Mui-focusVisible': {
                  backgroundColor: 'transparent' // Optional: prevents highlight when focused via keyboard
              } }}
        >
          How can I access the system's help or support resources?
        </AccordionSummary>
        <AccordionDetails sx={{color:'#747474'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ color: '#25307F', fontWeight: 600,'&:focus': {
                  outline: 'none' // Removes focus outline
              },
              '&.Mui-focusVisible': {
                  backgroundColor: 'transparent' // Optional: prevents highlight when focused via keyboard
              } }}
        >
          Can I send appointment reminders to patients?
        </AccordionSummary>
        <AccordionDetails sx={{color:'#747474'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ color: '#25307F', fontWeight: 600,'&:focus': {
                  outline: 'none' // Removes focus outline
              },
              '&.Mui-focusVisible': {
                  backgroundColor: 'transparent' // Optional: prevents highlight when focused via keyboard
              } }}
        >
          How can I check a doctor's availability for a specific date and time?
        </AccordionSummary>
        <AccordionDetails sx={{color:'#747474'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ color: '#25307F', fontWeight: 600,'&:focus': {
                  outline: 'none' // Removes focus outline
              },
              '&.Mui-focusVisible': {
                  backgroundColor: 'transparent' // Optional: prevents highlight when focused via keyboard
              } }}
        >
          What should I do if there is a discrepancy in a patient's payment?
        </AccordionSummary>
        <AccordionDetails sx={{color:'#747474'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      </Container>
    </div>
  );
}

export default Faq;
