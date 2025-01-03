
import React from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link} from "react-router-dom";


const MedicalHistory = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* Left Section */}
        <Box flex={1}>
          <Link to={"/PatientDetails"}>
          <IconButton sx={{ marginBottom: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          </Link>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '16px', lineHeight: '1.3' }}>
            Medical History
          </Typography>
          <List sx={{ listStyleType: 'disc', paddingLeft: 2, fontSize: '16px', lineHeight: '1.3', marginBottom: 2 }}>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Type 2 diabetes diagnosed 5 years ago" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Hypertension diagnosed 3 years ago" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Family history of heart disease (father)" />
            </ListItem>
          </List>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '16px', lineHeight: '1.3', marginTop: 2 }}>
            Current Medications
          </Typography>
          <List sx={{ listStyleType: 'disc', paddingLeft: 2, fontSize: '16px', lineHeight: '1.3', marginBottom: 2 }}>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Metformin (for diabetes)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Lisinopril (for hypertension)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Aspirin (for heart health)" />
            </ListItem>
          </List>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '16px', lineHeight: '1.3', marginTop: 2 }}>
            Symptoms
          </Typography>
          <List sx={{ listStyleType: 'disc', paddingLeft: 2, fontSize: '16px', lineHeight: '1.3', marginBottom: 2 }}>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Fatigue" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Shortness of breath, especially with exertion" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Swelling in ankles and feet" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Occasional chest discomfort" />
            </ListItem>
          </List>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '16px', lineHeight: '1.3', marginTop: 2 }}>
            Social History
          </Typography>
          <List sx={{ listStyleType: 'disc', paddingLeft: 2, fontSize: '16px', lineHeight: '1.3', marginBottom: 2 }}>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Smoker (1 pack/day for 20 years)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Moderate alcohol consumption (1-2 drinks/week)" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: 0 }}>
              <ListItemText primary="Sedentary lifestyle" />
            </ListItem>
          </List>
        </Box>

        {/* Right Section */}
        <Box flex={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '16px', lineHeight: '1.3' }}>
              Files/ Documents
            </Typography>
            <Button variant="text" startIcon={<AddIcon />} sx={{ fontSize: '16px' }}>
              Add
            </Button>
          </Box>

          <Box sx={{ padding: 1, backgroundColor: '#E8F5E9', borderRadius: 1, marginBottom: 1 }}>
            <Typography variant="body1" color="green" fontWeight="bold" sx={{ fontSize: '16px', lineHeight: '1.3' }}>
              2 file Pending
            </Typography>
          </Box>

          {[1, 2, 3, 4].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 1,
                backgroundColor: '#F9F9F9',
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <InsertDriveFileIcon sx={{ marginRight: 1, color: '#3F51B5' }} />
              <Typography flex={1} variant="body1" sx={{ fontSize: '16px', lineHeight: '1.3' }}>
                Blood Test Reports
              </Typography>
              <CheckCircleIcon sx={{ marginRight: 1, color: 'green' }} />
              <IconButton>
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default MedicalHistory;
