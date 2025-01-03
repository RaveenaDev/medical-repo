
import React from 'react';
import {
    Box,
    Typography,
    Container,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link} from "react-router-dom";
import Topbar from './Components/Topbar'



const Tracking = () => {
    return (
        <div>
                  <Topbar/>

            <Container  sx={{ padding: 2 }}>
                {/* Back Arrow */}
               <Link to={"/PatientDetails"}>
               <IconButton sx={{ marginBottom: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
               </Link>

                {/* Title */}
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: '16px', lineHeight: '0' }}>
                    Healing Progress
                </Typography>

                {/* Healing Progress List */}
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Incision Healing: The incision is healing well, with minimal redness and swelling. There are no signs of infection." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Cardiac Function: The patient’s heart rate and blood pressure are within normal limits. Recent echocardiograms show improved left ventricular function." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Lung Function: The patient is breathing comfortably and has no shortness of breath. Oxygen saturation levels are consistently above 95%." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Activity Level: The patient is gradually increasing her activity level. She can walk short distances without fatigue." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Pain Management: The patient’s pain is well-controlled with pain medication. There are no significant side effects." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Wound Care: The incision is being dressed daily. There are no complications related to wound care." />
                    </ListItem>
                </List>

                {/* Goals */}
                <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
                    Goals
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Return to work within 4-6 weeks." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Resume normal activities, including exercise, within 2-3 months." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Improve overall heart health and prevent future cardiovascular events." />
                    </ListItem>
                </List>

                {/* Next Steps */}
                <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
                    Next Steps
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 1 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Follow-up appointment with the cardiologist in 2 weeks." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Cardiac rehabilitation program starting in 3 weeks." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Regular monitoring of blood pressure, blood sugar, and cholesterol levels." />
                    </ListItem>
                </List>
            </Container>
        </div>
    );
};

export default Tracking;
