import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo";
import MedicalInfo from "./MedicalInfo";
import styles from "./profile.module.scss";
import rav from "../../styles.module.scss";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import ProgressTracker from "./ProgressTracker";
import { Typography } from "@mui/material";
import {useLocation} from "react-router-dom";



const Profile = (props) => {
    

    const { state: patient } = useLocation(); // Retrieve the patient data passed from PatientList
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [currentMedications, setCurrentMedications] = useState([]);

    const [tableIndex, setTableIndex] = useState(null);
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchData = async () => {
            // backend response structure
            const response = {
                medicalHistory: [
                    "Type 2 diabetes diagnosed 5 years ago",
                    "Hypertension diagnosed 3 years ago",
                    "Family history of heart disease (father)",
                ],
                currentMedications: [
                    "Metformin (for diabetes)",
                    "Lisinopril (for hypertension)",
                    "Aspirin (for heart health)",
                ],
            };

            // Simulating an API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMedicalHistory(response.medicalHistory);
            setCurrentMedications(response.currentMedications);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className={rav.receptionist}>
                {!props.entity ?
                    <>
                        <Grid container spacing={2}>
                            {/* Box 1 */}
                            <Grid item xs={3}>
                                <Box
                                    sx={{
                                        backgroundColor: "#FFFFFF",
                                        height: "300px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            src="https://via.placeholder.com/150"
                                            alt="Profile Image"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%",
                                                marginBottom: "8px",
                                            }}
                                        />
                                        <h4 className={styles.name}>Jasmine Kaur</h4>
                                        <p className={styles.email}>Jaisminekaur@gmail.com</p>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                width: "100%",
                                            }}
                                        >
                                            <div className={styles.styling}>
                                                <div>
                                                    <h5>8</h5>
                                                    <p>Past Visits</p>
                                                </div>
                                                <div>
                                                    <h5>2</h5>
                                                    <p>Upcoming</p>
                                                </div>
                                            </div>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                margin: "16px",
                                                padding: "12px 24px",
                                                width: "100%",
                                                borderColor: "#25307F",
                                                color: "#25307F",
                                                height: "40px",
                                                "&:hover": {
                                                    backgroundColor: "#25307F",
                                                    color: "#ffffff",
                                                },
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            {/* Box 2 */}
                            <Grid item xs={5}>
                                <Box
                                    sx={{
                                        backgroundColor: "#ffffff",
                                        padding: "8px",
                                    }}
                                >
                                    <PersonalInfo />
                                </Box>
                            </Grid>
                            {/* Box 3 */}
                            <Grid item xs={4}>
                                <Box
                                    sx={{
                                        backgroundColor: "#ffffff",
                                        height: "283px",
                                        padding: "10px 8px",
                                    }}
                                >
                                    <MedicalInfo
                                        medicalHistory={medicalHistory}
                                        currentMedications={currentMedications}
                                        showSymptoms={false} // Hide Symptoms section
                                        showHistory={false}   // Hide Social History section
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        backgroundColor: "#FFFFFF", // Set the background color to white
                                        padding: "16px", // Optional padding for content spacing
                                        borderRadius: "8px", // Optional rounded corners
                                    }}
                                >
                                    <Typography variant="h3" sx={{ color: "#4A4A4A", fontSize: "20px" }}>
                                        Progress Tracker
                                    </Typography>

                                    <Box
                                        sx={{
                                            height: "1px",
                                            backgroundColor: "#8787877A",
                                            my: 2, // Adds top and bottom margin (equivalent to padding)
                                        }}
                                    />

                                    <ProgressTracker />
                                </Box>
                            </Grid>


                        </Grid>

                    </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />}
            </div>
        </>
    );
};

export default Profile;