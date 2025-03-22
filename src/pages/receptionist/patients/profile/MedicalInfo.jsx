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
  patient,
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
    navigate("/receptionist/patients/profile/more-info", {
      state: {medicalHistory,currentMedications,symptoms,history,patient },
    }); // Redirects to the MoreInfo page
  };

  return (
    <>
      <div style={{display:"flex",flexDirection:'column',justifyContent:"space-between",height: "100%"}}>
          <div>
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
          </div>

          <div>
              {showButton && ( // Conditionally render the button
                  <Button
                      variant="outlined"
                      endIcon={<ArrowForwardIosIcon sx={{backgroundColor:'white',borderRadius:'50%',padding:'1px',color:'#25307F'}}/>}
                      onClick={handleMoreClick}
                      sx={{
                          margin: "16px",
                          padding: "5px 30px",
                          gap:"28px",
                          borderColor: "#25307F",
                          borderRadius: "20px",
                          textTransform: "none",
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
          </div>
      </div>
    </>
  );
};

export default MedicalInfo;
