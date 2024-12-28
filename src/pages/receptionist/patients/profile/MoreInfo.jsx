import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Grid, Paper } from '@mui/material';
import MedicalInfo from "./MedicalInfo";

const MoreInfo = () => {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [currentMedications, setCurrentMedications] = useState([]);
    const [symptoms, setSymptoms] = useState([]); // State for symptoms
    const [socialHistory, setSocialHistory] = useState([]); // State for social history

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
                symptoms: [
                    "Fatigue",
                    "Frequent urination",
                    "Headaches",
                ],
                socialHistory: [
                    "Non-smoker",
                    "Occasional alcohol use",
                    "Regular exercise",
                ],
            };

            // Simulating an API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMedicalHistory(response.medicalHistory);
            setCurrentMedications(response.currentMedications);
            setSymptoms(response.symptoms); // Set symptoms
            setSocialHistory(response.socialHistory); // Set social history
        };

        fetchData();
    }, []);

    return (
        <>
            <Grid
                container
                spacing={2}
                style={{
                    height: '100vh', // Full viewport height
                    padding: '20px'
                }}
            >
                <Grid item xs={6}>
                    <Paper
                        elevation={3}
                        style={{
                            height: '100%', // Full height of the grid item
                            padding: '20px',
                            textAlign: 'left'
                        }}
                    >
                        <MedicalInfo
                            medicalHistory={medicalHistory}
                            currentMedications={currentMedications}
                            symptoms={symptoms}
                            history={socialHistory}
                            showButton={false} // Hide the button
                        />

                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper
                        elevation={3}
                        style={{
                            height: '100%', // Full height of the grid item
                            padding: '20px',
                            textAlign: 'center'
                        }}
                    >
                        Box 2
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default MoreInfo;