import React from "react";
import PropTypes from "prop-types";
import styles from "./profile.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ListSection = ({ title, items, emptyMessage }) => (
    <div>
        <h4 className={styles.title}>{title}</h4>
        {items.length > 0 ? (
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        ) : (
            <p>{emptyMessage}</p>
        )}
    </div>
);

const MedicalInfo = ({
    medicalHistory = [],
    currentMedications = [],
    symptoms = [],
    history = [],
    showSymptoms = true,
    showHistory = true,
    showButton = true, // New prop to control button visibility
}) => {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate("/more-info"); // Redirects to the MoreInfo page
    };

    return (
        <>
            <ListSection 
                title="Medical History" 
                items={medicalHistory} 
                emptyMessage="No medical history available." 
            />
            <ListSection 
                title="Current Medications" 
                items={currentMedications} 
                emptyMessage="No current medications available." 
            />
            {showSymptoms && (
                <ListSection 
                    title="Symptoms" 
                    items={symptoms} 
                    emptyMessage="No symptoms available." 
                />
            )}
            {showHistory && (
                <ListSection 
                    title="Social History" 
                    items={history} 
                    emptyMessage="No social history available." 
                />
            )}

            {showButton && ( // Conditionally render the button
                <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={handleMoreClick}
                    sx={{
                        margin: "16px",
                        padding: "5px 30px",
                        borderColor: "#25307F",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: "bold",
                        backgroundColor: "#25307F",
                        fontSize: "14px",
                        color: "#ffffff",
                        "&:hover": {
                            backgroundColor: "#1a1a1a",
                        },
                    }}
                >
                    More
                </Button>
            )}
        </>
    );
};


MedicalInfo.propTypes = {
    medicalHistory: PropTypes.arrayOf(PropTypes.string),
    currentMedications: PropTypes.arrayOf(PropTypes.string),
    symptoms: PropTypes.arrayOf(PropTypes.string),
    history: PropTypes.arrayOf(PropTypes.string),
    showSymptoms: PropTypes.bool,
    showHistory: PropTypes.bool,
};

export default MedicalInfo;
