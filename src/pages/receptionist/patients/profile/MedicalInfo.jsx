import React from "react";
import PropTypes from "prop-types";
import styles from "./profile.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

const MedicalInfo = ({ medicalHistory = [], currentMedications = [] }) => {
    return (
        <>
            <div>
                <h4 className={styles.title}>Medical History</h4>
                {medicalHistory.length > 0 ? (
                    <ul>
                        {medicalHistory.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No medical history available.</p>
                )}
            </div>

            <div>
                <h4 className={styles.title}>Current Medications</h4>
                {currentMedications.length > 0 ? (
                    <ul>
                        {currentMedications.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No current medications available.</p>
                )}
            </div>

            <Button
                variant="outlined"
                endIcon={<ArrowForwardIosIcon />}
                sx={{
                    margin: "16px",
                    padding: "5px 30px",
                    borderColor: "#25307F",
                    borderRadius: "20px",
                    textTransform: "none", // Prevents uppercase text
                    fontWeight: "bold",
                    backgroundColor: "#25307F",
                    fontSize: "14px",
                    color: "#ffffff",
                    "&:hover": {


                    },
                }}
            >
                More
            </Button>
        </>
    );
};

MedicalInfo.propTypes = {
    medicalHistory: PropTypes.arrayOf(PropTypes.string),
    currentMedications: PropTypes.arrayOf(PropTypes.string),
};

export default MedicalInfo;
