import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Paper } from '@mui/material';
import Grid from "@mui/material/Grid2";
import MedicalInfo from "./MedicalInfo";
import rav from "../../styles.module.scss";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./profile.module.scss";
import Button from "@mui/material/Button";
import PersonalInfo from "./PersonalInfo.jsx";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import FileDocuments from "./FileDocuments";
import {useLocation} from "react-router-dom";




const MoreInfo = (props) => {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [currentMedications, setCurrentMedications] = useState([]);
    const [symptoms, setSymptoms] = useState([]); // State for symptoms
    const [socialHistory, setSocialHistory] = useState([]); // State for social history

    const [tableIndex, setTableIndex] = useState(null);
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const location = useLocation();
    const patient = location.state?.patient

    console.log("BANKAI",patient)

    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchData = async () => {
            // backend response structure
            const response = {
                // medicalHistory: [
                //     "Type 2 diabetes diagnosed 5 years ago",
                //     "Hypertension diagnosed 3 years ago",
                //     "Family history of heart disease (father)",
                // ],
                medicalHistory: patient.medicalHistory,
                // currentMedications: [
                //     "Metformin (for diabetes)",
                //     "Lisinopril (for hypertension)",
                //     "Aspirin (for heart health)",
                // ],
                currentMedications: patient.currentMedication,
                // symptoms: [
                //     "Fatigue",
                //     "Frequent urination",
                //     "Headaches",
                // ],
                symptoms: patient.symptoms,
                // socialHistory: [
                //     "Non-smoker",
                //     "Occasional alcohol use",
                //     "Regular exercise",
                // ],
                socialHistory: patient.socialHistory
            };

            // // Simulating an API call delay
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            setMedicalHistory(response.medicalHistory);
            setCurrentMedications(response.currentMedications);
            setSymptoms(response.symptoms); // Set symptoms
            setSocialHistory(response.socialHistory); // Set social history
        };

        fetchData();
    }, []);

    return (
        <>
            <div className={rav.receptionist}>
                {!props.entity ?
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
                                    <FileDocuments />
                                </Paper>
                            </Grid>
                        </Grid>
                    </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />}
            </div>
        </>
    );
};

export default MoreInfo;