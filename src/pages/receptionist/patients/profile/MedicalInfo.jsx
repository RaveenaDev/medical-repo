// MedicalInfo.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./profile.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const humanize = (s = "") =>
    String(s)
        .replace(/[_-]+/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());

const MedicalInfo = ({
                         patient,
                         medicalHistory = [],
                         currentMedications = [],
                         patDetails,
                         symptoms = [],
                         history = [],
                         showButton = true,
                     }) => {
    const navigate = useNavigate();

    if (!patDetails?.consultations || patDetails.consultations.length === 0) {
        return <>
            <h3 style={{color:'#25307F',fontWeight:500}}>Medical Info</h3>
            <div style={{width:'100%',height:'60%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <p style={{fontStyle:'italic',color:"gray"}}>No medical record found</p>
            </div>
        </>;
    }

    // Your dynamic consultation data (may vary in shape)
    const consData = patDetails?.consultations?.[0]?.consultationData;

    if (!consData || (typeof consData === "object" && Object.keys(consData).length === 0)) {
        return <p>No data</p>;
    }

    // Build headings from top-level fields
    const headings = Array.isArray(consData)
        ? consData.map((_, i) => `Section ${i + 1}`)
        : Object.keys(consData).map(humanize);

    const handleMoreClick = () => {
        navigate("/receptionist/patients/profile/more-info", {
            // pass everything needed for the details page
            state: {
                patDetails,
                consultationData: consData,
                // keep legacy fields (if your More page expects them)
                medicalHistory,
                currentMedications,
                symptoms,
                history,
                patient,
            },
        });
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1px 15px" }}>
                    <div>
                        <h4 className={styles.title}>Medical Info</h4>
                        <ul style={{ margin: 0, paddingLeft: 18,height:'25vh',overflowY:'auto' }}>
                            {headings.map((title, idx) => (
                                <li key={idx} style={{ marginBottom: 8 }}>
                                    <strong>{title}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    {showButton && (
                        <Button
                            variant="outlined"
                            endIcon={
                                <ArrowForwardIosIcon
                                    sx={{ backgroundColor: "white", borderRadius: "50%", padding: "1px", color: "#25307F" }}
                                />
                            }
                            onClick={handleMoreClick}
                            sx={{
                                padding: "6px 15px",
                                gap: "28px",
                                borderColor: "#25307F",
                                borderRadius: "20px",
                                textTransform: "none",
                                backgroundColor: "#25307F",
                                fontSize: "12px",
                                color: "#ffffff",
                            }}
                        >
                            More
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

MedicalInfo.propTypes = {
    patient: PropTypes.object,
    medicalHistory: PropTypes.array,
    currentMedications: PropTypes.array,
    patDetails: PropTypes.object,
    symptoms: PropTypes.array,
    history: PropTypes.array,
    showButton: PropTypes.bool,
};

export default MedicalInfo;
