import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import rav from "../styles.module.scss";
import EntityBasedTable from "../EntityBasedTable/index.jsx";

const PrivacyPolicy = (props) => {
  const [tableIndex, setTableIndex] = useState(null);

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  return (
    <div className={rav.receptionist}>
      {!props.entity ? (
        <Container
          maxWidth="md"
          disableGutters
          sx={{ color: "#838383", marginTop: "2rem", paddingBottom: "3rem" }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#000", fontWeight: 700, marginBottom: "2rem" }}
          >
            Privacy Policy
          </Typography>

          {/* Introduction Section */}
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography
              variant="h6"
              sx={{ color: "#25307F", fontWeight: 600, marginBottom: "1rem" }}
            >
              Introduction
            </Typography>
            <Typography variant="body1">
              This Privacy Policy outlines how we collect, use, disclose, and
              protect the personal information of patients and other individuals
              who interact with our services. We are committed to ensuring the
              privacy and security of your data.
            </Typography>
          </Box>

          {/* Information Collection Section */}
          <Box sx={{ marginBottom: "0.5rem" }}>
            <Typography
              variant="h6"
              sx={{ color: "#25307F", fontWeight: 600, marginBottom: "0.5rem" }}
            >
              Information Collection
            </Typography>
            <Typography variant="body1" gutterBottom>
              We may collect personal information from you when you:
            </Typography>
            <Box component="ul" sx={{ paddingLeft: "1.5rem" }}>
              <Typography component="li">Schedule an appointment</Typography>
              <Typography component="li">Visit our clinic</Typography>
              <Typography component="li">
                Contact us for inquiries or support
              </Typography>
              <Typography component="li">
                Fill out online forms or surveys
              </Typography>
              <Typography component="li">
                Use our website or mobile app
              </Typography>
            </Box>
          </Box>

          {/* Types of Information Section */}
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography variant="body1" gutterBottom>
              Types of information we collect include:
            </Typography>
            <Box component="ul" sx={{ paddingLeft: "1.5rem" }}>
              <li>Name</li>
              <li>Contact information (address, phone number, email)</li>
              <li>Date of birth</li>
              <li>Medical history</li>
              <li>Insurance information</li>
              <li>Payment information</li>
            </Box>
          </Box>

          {/* Information Use Section */}
          <Box sx={{ marginBottom: "2rem" }}>
            <Typography
              variant="h6"
              sx={{ color: "#25307F", fontWeight: 600, marginBottom: "0.5rem" }}
            >
              Information Use
            </Typography>
            <Typography variant="body1" gutterBottom>
              We use your personal information for the following purposes:
            </Typography>
            <Box component="ul" sx={{ paddingLeft: "1.5rem" }}>
              <Typography component="li">
                Providing medical care and treatment
              </Typography>
              <Typography component="li">Scheduling appointments</Typography>
              <Typography component="li">Managing your account</Typography>
              <Typography component="li">
                Communicating with you about your appointments, treatments, and
                billing
              </Typography>
              <Typography component="li">
                Improving our services and facilities
              </Typography>
              <Typography component="li">
                Complying with legal and regulatory requirements
              </Typography>
            </Box>
          </Box>
        </Container>
      ) : (
        <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
      )}
    </div>
  );
};

export default PrivacyPolicy;
