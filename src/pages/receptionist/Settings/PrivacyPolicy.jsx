import React from 'react'
import { Box, Typography, Container } from "@mui/material";


const PrivacyPolicy = () => {
  return (
    <div>
      

<Container maxWidth="md" sx={{ color: "#838383",marginTop:"2rem" }}>
      <Typography variant="h6" sx={{ color: '#000', fontWeight: 600 }} gutterBottom>
          Privacy Policy
        </Typography>
       
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#25307F', fontWeight: 600 }} gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1">
          This Privacy Policy outlines how we collect, use, disclose, and
          protect the personal information of patients and other individuals who
          interact with our services. We are committed to ensuring the privacy
          and security of your data.
        </Typography>
      </Box>

      {/* Information Collection */}
      
        <Typography variant="h6" sx={{ color: '#25307F', fontWeight: 600 }} gutterBottom>
          Information Collection
        </Typography>
        <Typography variant="body1" gutterBottom>
          We may collect personal information from you when you:
        </Typography>
        <ul>
          <Typography component="li">Schedule an appointment</Typography>
          <Typography component="li">Visit our clinic</Typography>
          <Typography component="li">Contact us for inquiries or support</Typography>
          <Typography component="li">Fill out online forms or surveys</Typography>
          <Typography component="li">Use our website or mobile app</Typography>
        </ul>
      

      {/* Types of Information */}
      
      <Typography variant="body1" gutterBottom>
          Types of information we collect include:
        </Typography>
        <Typography component="div">
          <ul>
            <li>Name</li>
            <li>Contact information (address, phone number, email)</li>
            <li>Date of birth</li>
            <li>Medical history</li>
            <li>Insurance information</li>
            <li>Payment information</li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: "#25307F", fontWeight: 600 }} gutterBottom>
          Information Use
        </Typography>
        <Typography variant="body1" gutterBottom>
          We use your personal information for following purpose:
        </Typography>
        <ul>
          <Typography component="li">Providing medical care and treatment</Typography>
          <Typography component="li">Scheduling appointments</Typography>
          <Typography component="li">Managing your account</Typography>
          <Typography component="li">Communicating with you about your appointments, treatments, and billing</Typography>
          <Typography component="li">Improving our services and facilities</Typography>
          <Typography component="li">Complying with legal and regulatory requirements</Typography>

        </ul>
      
    </Container>
      

    </div>
  )
}

export default PrivacyPolicy