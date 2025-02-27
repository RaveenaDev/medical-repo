import React from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./departments.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";

const DepartCard = ({ department }) => {
  const navigate = useNavigate();
  const handleClick = (departmentId) => {
    // Redirect to the specific page
    navigate(`/admin/departments/departDetails`, { state: { departmentId } });
  };

  const handleClickMessage = (e) => {
    e.stopPropagation(); // Prevent navigation from firing
    // You can add further functionality here
  };

  const handleClickContact = (e) => {
    e.stopPropagation(); // Prevent navigation from firing
    // You can add further functionality here
  };

  return (
    <Box
      className={styles.cardContainer}
      onClick={() => handleClick(department.departmentId)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardHeading}>
          <div className={styles.circle}></div>
          <h2 className={styles.title}>{department.departmentName}</h2>
          <span className={styles.arrow}>
            <ArrowForwardIosIcon fontSize="small" />
          </span>
        </div>
        <div className={styles.icons}>
          <button
            className={styles.message}
            onClick={handleClickMessage}
            style={{
              outline: "none",
              boxShadow: "none",
              "&:focus": { outline: "none" },
              borderRadius: "12px",
              padding: "6px 10px",
              background: "white",
            }}
          >
            <EmailIcon />
          </button>
          <button
            className={styles.phone}
            onClick={handleClickContact}
            style={{
              outline: "none",
              boxShadow: "none",
              "&:focus": { outline: "none" },
              borderRadius: "12px",
              background: "white",
              padding: "6px 10px",
            }}
          >
            <PhoneIcon />
          </button>
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <p className={styles.name}>Department Head:</p>
          <p className={styles.value}>{department.departmentHead}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Patients Present:</p>
          <p className={styles.value}>{department.totalPatients}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Total Doctors:</p>
          <p className={styles.value}>{department.Docs}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Specialist Doctors:</p>
          <p className={styles.value}>{department.specialistDocs}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Total Nurses:</p>
          <p className={styles.value}>{department.totalNurses}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Active Services:</p>
          {
            department.activeServices.length > 0 ? <p className={styles.value}>{department.activeServices[0]}...</p> : <p className={styles.value}>No Services</p>
          }
        </div>
      </div>
    </Box>
  );
};
export default DepartCard;
